import json
from datetime import datetime, timezone
from pathlib import Path
from uuid import uuid4

from flask import Blueprint, jsonify, request


comments_bp = Blueprint("comments", __name__)

COMMENTS_FILE = Path(__file__).parent.parent / "data" / "comments.json"

def read_comments():
    try:
        with open(COMMENTS_FILE, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return []
    
def write_comments(comments):
    with open(COMMENTS_FILE, "w") as f:
        json.dump(comments, f, indent=2)    
    
@comments_bp.get("/api/comments")
def get_comments():
    comments = read_comments()
    return jsonify(comments)


@comments_bp.post("/api/comments")
def add_comment():
    data = request.get_json()

    message = data.get("message")

    if not message:
        return jsonify({"error": "message is required"}), 400

    new_comment = {
        "id": str(uuid4()),
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "message": message,
        "likes": 0
    }

    comments = read_comments()
    comments.append(new_comment)
    write_comments(comments)

    return jsonify(new_comment), 201

@comments_bp.post("/api/comments/<comment_id>/likes")
def like_commant(comment_id):
    comments = read_comments()

    for comment in comments:
        if comment["id"] == comment_id:
            comment["likes"] += 1
            write_comments(comments)
            return jsonify(comment)

    return jsonify({"error": "comment not found"}), 404