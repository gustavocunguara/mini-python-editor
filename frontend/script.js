const BACKEND_URL = "https://mini-python-editor.onrender.com"; // Replace with actual backend URL

window.onload = () => {
  const saved = localStorage.getItem("userCode");
  if (saved) document.getElementById("code").value = saved;
};

document.getElementById("code").addEventListener("input", (e) => {
  localStorage.setItem("userCode", e.target.value);
});

function runCode() {
  const code = document.getElementById("code").value;
  const input = document.getElementById("input").value;

  fetch(BACKEND_URL + "/run", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, input }),
  })
    .then((res) => res.json())
    .then((data) => {
      const output = document.getElementById("output");
      if (data.error) {
        output.textContent = "Error:\n" + data.error;
      } else {
        output.textContent = data.output + "\n\nExecution Time: " + data.exec_time;
      }
    })
    .catch(err => {
      document.getElementById("output").textContent = "Server error: " + err.message;
    });
}

function downloadCode() {
  const code = document.getElementById("code").value;
  const blob = new Blob([code], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = "my_code.py";
  a.click();
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

function loadSnippet() {
  const snippets = {
    hello: "print('Hello World')",
    input: "name = input('Name: ')\nprint('Hello', name)",
    loop: "for i in range(5):\n    print(i)",
    func: "def greet():\n    print('Hi')\ngreet()"
  };

  const selected = document.getElementById("snippets").value;
  if (selected && snippets[selected]) {
    document.getElementById("code").value = snippets[selected];
    localStorage.setItem("userCode", snippets[selected]);
  }
}
