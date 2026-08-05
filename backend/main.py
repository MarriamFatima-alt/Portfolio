import json
import os
import smtplib
import ssl
from datetime import datetime, timezone
from email.message import EmailMessage
from pathlib import Path
 
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
 
from data import PROFILE
from models import ContactMessage, ContactResponse
 
load_dotenv()  # lets GMAIL_USER / GMAIL_APP_PASSWORD load from a local .env file when testing on your machine
 
app = FastAPI(title="Maryam Fatima Portfolio API", version="1.0.0")
 
# Allow the deployed frontend (and local dev) to call this API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://marriamfatima.vercel.app",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
 
GMAIL_USER = os.environ.get("GMAIL_USER")
GMAIL_APP_PASSWORD = os.environ.get("GMAIL_APP_PASSWORD")
CONTACT_TO_EMAIL = os.environ.get("CONTACT_TO_EMAIL", GMAIL_USER)
 
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
 
 
def _send_email(payload: ContactMessage) -> None:
    if not GMAIL_USER or not GMAIL_APP_PASSWORD:
        raise RuntimeError("GMAIL_USER / GMAIL_APP_PASSWORD are not set.")
 
    msg = EmailMessage()
    msg["Subject"] = f"Portfolio contact form: {payload.name}"
    msg["From"] = GMAIL_USER
    msg["To"] = CONTACT_TO_EMAIL
    msg["Reply-To"] = payload.email  # so hitting "reply" in Gmail goes straight to them
    msg.set_content(f"From: {payload.name} <{payload.email}>\n\n{payload.message}")
 
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
        server.login(GMAIL_USER, GMAIL_APP_PASSWORD)
        server.send_message(msg)
 
 
@app.post("/api/contact", response_model=ContactResponse)
def post_contact(payload: ContactMessage):
    """Receives a contact-form submission, emails it to me, and keeps a local backup log."""
    # Best-effort backup log — if this fails, we still want the email to go out.
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
    except OSError:
        pass
 
    try:
        _send_email(payload)
    except Exception as exc:
        raise HTTPException(status_code=500, detail="Could not send message. Please try again or email me directly.") from exc
 
    return ContactResponse(ok=True, detail="Thanks for reaching out! I'll get back to you soon.")
