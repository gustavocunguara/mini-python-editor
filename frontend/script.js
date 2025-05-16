const BACKEND_URL = "https://mini-python-editor.onrender.com"; 


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
  const snippet = document.getElementById("snippets").value;
  if (snippet) {
    document.getElementById("code").value = snippet;
    localStorage.setItem("userCode", snippet);
  }
}
