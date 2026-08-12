from __future__ import annotations

import sys
from pathlib import Path

import fitz
from PySide6.QtCore import QPoint, QRect, Qt, Signal
from PySide6.QtGui import QAction, QColor, QImage, QPainter, QPen, QPixmap
from PySide6.QtWidgets import (QApplication, QFileDialog, QHBoxLayout, QLabel, QMainWindow,
                               QMessageBox, QPushButton, QSplitter, QTableWidget,
                               QTableWidgetItem, QToolBar, QVBoxLayout, QWidget)

from .engine import StatementDocument
from .models import Confidence, Proposal, Status


class PageCanvas(QLabel):
    rectangle_drawn = Signal(tuple)

    def __init__(self) -> None:
        super().__init__()
        self.setAlignment(Qt.AlignmentFlag.AlignCenter)
        self.setMinimumSize(500, 650)
        self._base: QPixmap | None = None
        self._proposals: list[Proposal] = []
        self._page = 0
        self._scale = 1.0
        self._drawing = False
        self._start: QPoint | None = None
        self._end: QPoint | None = None

    def show_page(self, page: fitz.Page, proposals: list[Proposal], scale: float) -> None:
        self._page, self._proposals, self._scale = page.number, proposals, scale
        pix = page.get_pixmap(matrix=fitz.Matrix(scale, scale), alpha=False)
        image = QImage(pix.samples, pix.width, pix.height, pix.stride, QImage.Format.Format_RGB888).copy()
        self._base = QPixmap.fromImage(image)
        self._paint_overlays()

    def _paint_overlays(self) -> None:
        if not self._base:
            return
        canvas = self._base.copy()
        painter = QPainter(canvas)
        colors = {Status.PENDING: QColor(255, 165, 0, 95), Status.APPROVED: QColor(210, 0, 0, 125),
                  Status.REJECTED: QColor(100, 100, 100, 55)}
        for proposal in self._proposals:
            x0, y0, x1, y1 = proposal.rect
            rect = QRect(int(x0 * self._scale), int(y0 * self._scale),
                         int((x1 - x0) * self._scale), int((y1 - y0) * self._scale))
            painter.fillRect(rect, colors[proposal.status])
            painter.setPen(QPen(colors[proposal.status].darker(), 2))
            painter.drawRect(rect)
        if self._start and self._end:
            painter.setPen(QPen(Qt.GlobalColor.red, 2, Qt.PenStyle.DashLine))
            painter.drawRect(QRect(self._start, self._end).normalized())
        painter.end()
        self.setPixmap(canvas)
        self.resize(canvas.size())

    def set_manual_mode(self, active: bool) -> None:
        self._drawing = active
        self.setCursor(Qt.CursorShape.CrossCursor if active else Qt.CursorShape.ArrowCursor)

    def mousePressEvent(self, event) -> None:  # noqa: N802
        if self._drawing and event.button() == Qt.MouseButton.LeftButton:
            self._start = self._end = event.position().toPoint()
            self._paint_overlays()

    def mouseMoveEvent(self, event) -> None:  # noqa: N802
        if self._drawing and self._start:
            self._end = event.position().toPoint()
            self._paint_overlays()

    def mouseReleaseEvent(self, event) -> None:  # noqa: N802
        if self._drawing and self._start and self._end:
            rect = QRect(self._start, self._end).normalized()
            if rect.width() > 5 and rect.height() > 5:
                self.rectangle_drawn.emit((rect.left() / self._scale, rect.top() / self._scale,
                                           rect.right() / self._scale, rect.bottom() / self._scale))
            self._start = self._end = None
            self._paint_overlays()


class MainWindow(QMainWindow):
    def __init__(self) -> None:
        super().__init__()
        self.setWindowTitle("Offline Statement Redactor")
        self.resize(1280, 850)
        self.statement: StatementDocument | None = None
        self.page_number = 0
        self.zoom = 1.25
        self._build_ui()

    def _build_ui(self) -> None:
        toolbar = QToolBar("Statement tools")
        self.addToolBar(toolbar)
        for title, callback in [("Open PDF", self.open_pdf), ("Open Folder", self.open_folder),
                                ("Previous", self.previous), ("Next", self.next),
                                ("Zoom +", lambda: self.set_zoom(self.zoom * 1.2)),
                                ("Zoom -", lambda: self.set_zoom(self.zoom / 1.2)),
                                ("Fit Page", lambda: self.set_zoom(.9)),
                                ("Fit Width", lambda: self.set_zoom(1.35)),
                                ("Automatic Scan", self.scan), ("Finalize & Save", self.finalize)]:
            action = QAction(title, self)
            action.triggered.connect(callback)
            toolbar.addAction(action)

        self.canvas = PageCanvas()
        self.canvas.rectangle_drawn.connect(self.add_manual)
        self.table = QTableWidget(0, 4)
        self.table.setHorizontalHeaderLabels(["Page", "Category", "Confidence", "Status"])
        self.table.setSelectionBehavior(QTableWidget.SelectionBehavior.SelectRows)
        self.table.itemSelectionChanged.connect(self.jump_to_selected)
        controls = QWidget()
        layout = QVBoxLayout(controls)
        layout.addWidget(QLabel("Review every proposal before finalizing."))
        layout.addWidget(self.table)
        for title, callback in [("Approve", lambda: self.set_selected(Status.APPROVED)),
                                ("Reject", lambda: self.set_selected(Status.REJECTED)),
                                ("Approve all HIGH", self.approve_high),
                                ("Redact all occurrences", self.approve_same),
                                ("Delete / Undo proposal", self.delete_selected)]:
            button = QPushButton(title)
            button.clicked.connect(callback)
            layout.addWidget(button)
        self.manual = QPushButton("Manual rectangle tool")
        self.manual.setCheckable(True)
        self.manual.toggled.connect(self.canvas.set_manual_mode)
        layout.addWidget(self.manual)
        self.status = QLabel("Open a synthetic or personal statement. Processing stays on this computer.")
        layout.addWidget(self.status)
        splitter = QSplitter()
        splitter.addWidget(self.canvas)
        splitter.addWidget(controls)
        splitter.setSizes([900, 380])
        self.setCentralWidget(splitter)

    def open_pdf(self) -> None:
        paths, _ = QFileDialog.getOpenFileNames(self, "Open statement(s)", "", "PDF files (*.pdf)")
        if paths:
            self.load(paths[0])

    def open_folder(self) -> None:
        folder = QFileDialog.getExistingDirectory(self, "Open folder of statements")
        pdfs = sorted(Path(folder).glob("*.pdf")) if folder else []
        if pdfs:
            self.load(str(pdfs[0]))
            self.status.setText(f"Opened first of {len(pdfs)} PDFs. Use Open PDF to select another.")

    def load(self, path: str) -> None:
        if self.statement:
            self.statement.close()
        try:
            self.statement = StatementDocument(path)
            self.page_number = 0
            self.refresh()
            self.status.setText(f"Opened {Path(path).name} — run Automatic Scan.")
        except Exception as error:
            QMessageBox.critical(self, "Could not open PDF", str(error))

    def refresh(self) -> None:
        if not self.statement:
            return
        proposals = [p for p in self.statement.proposals if p.page == self.page_number]
        self.canvas.show_page(self.statement.document[self.page_number], proposals, self.zoom)
        self.table.setRowCount(len(self.statement.proposals))
        for row, proposal in enumerate(self.statement.proposals):
            for column, value in enumerate((proposal.page + 1, proposal.category,
                                            proposal.confidence.value, proposal.status.value)):
                self.table.setItem(row, column, QTableWidgetItem(str(value)))

    def scan(self) -> None:
        if not self.statement: return
        result = self.statement.scan()
        self.refresh()
        detail = f"Found {len(result.proposals)} review proposals. Nothing has been redacted yet."
        if result.warnings: detail += " " + " ".join(result.warnings)
        self.status.setText(detail)

    def selected(self) -> Proposal | None:
        rows = self.table.selectionModel().selectedRows()
        return self.statement.proposals[rows[0].row()] if self.statement and rows else None

    def set_selected(self, status: Status) -> None:
        proposal = self.selected()
        if proposal: proposal.status = status; self.refresh()

    def approve_high(self) -> None:
        if self.statement:
            for proposal in self.statement.proposals:
                if proposal.confidence == Confidence.HIGH: proposal.status = Status.APPROVED
            self.refresh()

    def approve_same(self) -> None:
        proposal = self.selected()
        if proposal and self.statement: self.statement.approve_same_value(proposal); self.refresh()

    def delete_selected(self) -> None:
        proposal = self.selected()
        if proposal and self.statement: self.statement.proposals.remove(proposal); self.refresh()

    def jump_to_selected(self) -> None:
        proposal = self.selected()
        if proposal: self.page_number = proposal.page; self.refresh()

    def add_manual(self, rect: tuple) -> None:
        if self.statement: self.statement.add_manual(self.page_number, rect); self.refresh()

    def previous(self) -> None:
        if self.statement: self.page_number = max(0, self.page_number - 1); self.refresh()

    def next(self) -> None:
        if self.statement: self.page_number = min(len(self.statement.document) - 1, self.page_number + 1); self.refresh()

    def set_zoom(self, zoom: float) -> None:
        self.zoom = min(4, max(.4, zoom)); self.refresh()

    def finalize(self) -> None:
        if not self.statement: return
        default = self.statement.source.with_name(f"{self.statement.source.stem}_REDACTED.pdf")
        path, _ = QFileDialog.getSaveFileName(self, "Save sanitized copy", str(default), "PDF files (*.pdf)")
        if not path: return
        try:
            result = self.statement.finalize(path)
            title = "Verification PASS" if result.passed else "Verification WARNING"
            QMessageBox.information(self, title, f"Saved sanitized copy.\nReport: {result.report_path}\n\n" +
                                    "\n".join(f"{k}: {v}" for k, v in result.checks.items()))
        except Exception as error:
            QMessageBox.critical(self, "Redaction not saved", str(error))


def main() -> int:
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    return app.exec()
