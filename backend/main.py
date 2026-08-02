import json
from datetime import datetime, timezone
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from data import PROFILE
from models import ContactMessage, ContactResponse

app = FastAPI(title="Maryam Fatima Portfolio API", version="1.0.0")

# Allow the Next.js dev server (and any origin you deploy the frontend to) to call this API.
# For production, replace "*" with your actual frontend domain.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://portfolio-s85c.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MESSAGES_FILE = Path(__file__).parent / "messages.json"


def _read_messages() -> list:
    if not MESSAGES_FILE.exists():
        return []
    try:
        return json.loads(MESSAGES_FILE.read_text())
    except json.JSONDecodeError:
        return []


def _write_messages(messages: list) -> None:
    MESSAGES_FILE.write_text(json.dumps(messages, indent=2))


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/profile")
def get_profile():
    """Returns the full structured resume/profile data that powers the site."""
    return PROFILE


@app.post("/api/contact", response_model=ContactResponse)
def post_contact(payload: ContactMessage):
    """Receives a contact-form submission and stores it locally (messages.json).

    Swap the storage logic here for an email send (e.g. via SMTP or an email API)
    or a database insert when you're ready to go to production.
    """
    try:
        messages = _read_messages()
        messages.append(
            {
                "name": payload.name,
                "email": payload.email,
                "message": payload.message,
                "received_at": datetime.now(timezone.utc).isoformat(),
            }
        )
        _write_messages(messages)
    except OSError as exc:
        raise HTTPException(status_code=500, detail="Could not save message.") from exc

    return ContactResponse(ok=True, detail="Thanks for reaching out! I'll get back to you soon.")
