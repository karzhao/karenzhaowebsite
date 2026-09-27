import json
from datetime import datetime, timezone
from pathlib import Path

from flask import Blueprint, jsonify, request


comments_bp = Blueprint("comments", __name__)

COMMENTS_FILE = Path(__file__).parent.parent / "data" / "comments.json"


@comments_bp.get("/api/comments")
def get_comments():
    try:
        with open(COMMENTS_FILE, "r") as f:
            comments = json.load(f)
    except FileNotFoundError:
        comments = []

    return jsonify(comments)


@comments_bp.post("/api/comments")
def add_comment():
    data = request.get_json()

    message = data.get("message")

    if not message:
        return jsonify({"error": "message is required"}), 400

    new_comment = {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "message": message
    }

    try:
        with open(COMMENTS_FILE, "r") as f:
            comments = json.load(f)
    except FileNotFoundError:
        comments = []

    comments.append(new_comment)

    with open(COMMENTS_FILE, "w") as f:
        json.dump(comments, f, indent=2)

    return jsonify(new_comment), 201