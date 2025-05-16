from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import os

app = Flask(__name__)
CORS(app)

@app.route('/run', methods=['POST'])
def run_code():
    data = request.get_json()
    code = data.get('code', '')
    user_input = data.get('input', '')

    # Save code to a temporary Python file
    with open("user_code.py", "w") as f:
        f.write(code)

    try:
        # Run the code and capture output
        result = subprocess.run(
            ["python3", "user_code.py"],
            input=user_input.encode('utf-8'),
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            timeout=5
        )
        return jsonify({
            "output": result.stdout.decode('utf-8'),
            "error": result.stderr.decode('utf-8')
        })
    except subprocess.TimeoutExpired:
        return jsonify({"error": "Execution timed out"}), 400

if __name__ == '__main__':
    # Use Render-assigned port or default to 5000
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
