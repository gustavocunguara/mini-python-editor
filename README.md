
# Mini Python Coding Editor with Terminal

This project is a lightweight web-based Python coding editor combined with an interactive terminal interface. It allows users—especially young coders learning Python—to write, run, and interact with Python programs directly in the browser with input and output handled in a terminal-like experience.

---

## Features

- **Code Editor:** Simple text area to write Python code.
- **Interactive Terminal:** Displays program output and allows user input dynamically during execution.
- **Input Prompting:** When the Python code requests input (`input()`), users can type responses in the terminal.
- **Clear Terminal Button:** Quickly clear the terminal output for a fresh start.
- **Run Button:** Execute Python code and interact with it in real-time.

---

## Project Structure

```
mini-python-editor/
├── backend/
│   ├── app.py         # Backend server to execute Python code
│   └── requirements.txt
└── frontend/
    ├── index.html     # Frontend HTML with editor and terminal UI
    └── script.js      # Frontend JavaScript for interactivity and backend communication
```

---

## Setup and Usage

### Prerequisites

- Python 3.8 or higher
- Node.js and npm (optional, if you want to run frontend with a local server)
- Flask (or any Python web framework used in backend)

### Backend Setup

1. Navigate to the `backend` folder:

   ```bash
   cd backend
   ```

2. Create a virtual environment and activate it:

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install required packages:

   ```bash
   pip install -r requirements.txt
   ```

4. Run the backend server:

   ```bash
   python app.py
   ```

### Frontend Setup

You can open `frontend/index.html` directly in a modern browser.

For a better experience, run a local HTTP server in the `frontend` folder:

```bash
cd frontend
python3 -m http.server 8000
```

Then navigate to `http://localhost:8000` in your browser.

---

## How It Works

- Write Python code in the editor.
- Click **Run Code** to send the code to the backend.
- The backend executes the Python code.
- The frontend terminal displays output and prompts for user input as necessary.
- User input is typed in the input line and sent back to the backend.
- Interaction continues until the program completes.

---

## Future Improvements

- Support for multiple languages (JavaScript, C++, etc.).
- Persistent user sessions with code saving.
- Syntax highlighting and code linting.
- Real-time collaborative editing.
- Enhanced security and sandboxing for code execution.

---

## License

This project is provided under the MIT License.

---

## Contact

For questions or feedback, please contact:

**Your Name**  
Email: gustavocunguara@hotmail.com 
LinkedIn: https://www.linkedin.com/in/gustavocunguara/

---

Thank you for using the Mini Python Coding Editor with Terminal!

