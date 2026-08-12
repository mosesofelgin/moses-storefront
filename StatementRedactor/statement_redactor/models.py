from __future__ import annotations

from dataclasses import dataclass, field
from enum import Enum


class Confidence(str, Enum):
    HIGH = "HIGH"
    MEDIUM = "MEDIUM"
    LOW = "LOW"


class Status(str, Enum):
    PENDING = "PENDING"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"


@dataclass(slots=True)
class Proposal:
    page: int
    rect: tuple[float, float, float, float]
    category: str
    confidence: Confidence
    status: Status = Status.PENDING
    value_key: str = ""
    source: str = "native"
    id: int = field(default=0)

    def approved(self) -> bool:
        return self.status == Status.APPROVED
