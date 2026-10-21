import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_root_endpoint():
    """Verify that root endpoint responds with status 200 and valid links."""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert data["health"] == "/health"
    assert data["docs"] == "/docs"


def test_health_check_endpoint():
    """Verify that service health endpoint reports status ok."""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["service"] == "diploma-matching-api"
