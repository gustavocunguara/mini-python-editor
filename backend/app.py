from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import os
import time

app = Flask(__name__)
CORS(app)

@app.route('/run', methods=['POST'])
def run_code():
    data = request.get_json()
    code = data.get('code', '')
    user_input = data.get('input', '')

    with open("user_code.py", "w") as f:
        f.write(code)

    try:
        start = time.time()
        result = subprocess.run(
            ["python3", "user_code.py"],
            input=user_input.encode('utf-8'),
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            timeout=5
        )
        end = time.time()
        return jsonify({
            "output": result.stdout.decode('utf-8'),
            "error": result.stderr.decode('utf-8'),
            "exec_time": f"{end - start:.2f} seconds"
        })
    except subprocess.TimeoutExpired:
        return jsonify({"error": "Execution timed out"}), 400

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
