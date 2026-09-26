from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/api/hello")
def hello():
    return jsonify({"message": "hello from backend flask"})

@app.route("/api/karen")
def karen():
    return jsonify({"message": "karen zhao website"})

if __name__ == "__main__":
    app.run(debug=True, port=5000)