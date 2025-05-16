from flask import Flask, request, jsonify
import subprocess
import tempfile
import os

app = Flask(__name__)

@app.route('/run', methods=['POST'])
def run_code():
    data = request.get_json()
    code = data.get('code', '')
    user_input = data.get('input', '')

    with tempfile.NamedTemporaryFile(mode='w+', suffix='.py', delete=False) as temp_code_file:
        temp_code_file.write(code)
        temp_code_file.flush()
        temp_code_file_name = temp_code_file.name

    try:
        result = subprocess.run(
            ['python3', temp_code_file_name],
            input=user_input.encode('utf-8'),
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            timeout=10
        )
        output = result.stdout.decode('utf-8')
        error = result.stderr.decode('utf-8')
        os.remove(temp_code_file_name)

        return jsonify({'output': output, 'error': error})

    except subprocess.TimeoutExpired:
        return jsonify({'output': '', 'error': 'Execution timed out.'})

if __name__ == '__main__':
    app.run(debug=True)
