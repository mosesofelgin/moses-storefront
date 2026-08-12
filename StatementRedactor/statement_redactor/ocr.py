from __future__ import annotations

import importlib.util
from dataclasses import dataclass

import fitz

from .detection import Word


class OcrUnavailable(RuntimeError):
    pass


@dataclass(slots=True)
class OcrResult:
    words: list[Word]
    engine: str = "local-tesseract"


def tesseract_available() -> bool:
    if importlib.util.find_spec("pytesseract") is None:
        return False
    import pytesseract
    return bool(pytesseract.pytesseract.tesseract_cmd)


def extract_words(page: fitz.Page, dpi: int = 300) -> OcrResult:
    """Run only the locally installed Tesseract executable, preserving PDF coordinates."""
    if importlib.util.find_spec("pytesseract") is None:
        raise OcrUnavailable("pytesseract is not installed")
    import pytesseract
    from PIL import Image

    scale = dpi / 72
    pix = page.get_pixmap(matrix=fitz.Matrix(scale, scale), alpha=False)
    image = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    data = pytesseract.image_to_data(image, output_type=pytesseract.Output.DICT)
    words: list[Word] = []
    for i, raw in enumerate(data["text"]):
        value = raw.strip()
        if not value or float(data["conf"][i]) < 20:
            continue
        x, y = data["left"][i] / scale, data["top"][i] / scale
        w, h = data["width"][i] / scale, data["height"][i] / scale
        words.append(Word(x, y, x + w, y + h, value))
    return OcrResult(words)


def detect_qr_codes(page: fitz.Page, dpi: int = 180) -> list[tuple[float, float, float, float]]:
    """Find QR codes locally when OpenCV is installed; decoded values are discarded."""
    if importlib.util.find_spec("cv2") is None:
        return []
    import cv2
    import numpy as np

    scale = dpi / 72
    pix = page.get_pixmap(matrix=fitz.Matrix(scale, scale), colorspace=fitz.csRGB, alpha=False)
    image = np.frombuffer(pix.samples, dtype=np.uint8).reshape(pix.height, pix.width, 3)
    detector = cv2.QRCodeDetector()
    ok, _decoded, points, _ = detector.detectAndDecodeMulti(image)
    if not ok or points is None:
        return []
    rectangles = []
    for polygon in points:
        xs, ys = polygon[:, 0], polygon[:, 1]
        rectangles.append((float(xs.min() / scale), float(ys.min() / scale),
                           float(xs.max() / scale), float(ys.max() / scale)))
    return rectangles
