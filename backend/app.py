from flask import Flask, request, jsonify
from routes.comments import comments_bp


COMMENTS_FILE = "comments.json"

app = Flask(__name__)

@app.get("/api/hello")
def hello():
    return jsonify({"message": "hello from backend flask"})

@app.get("/api/karen")
def karen():
    return jsonify({"message": "karen zhao website"})

app.register_blueprint(comments_bp)

if __name__ == "__main__":
    app.run(debug=True, port=5000)