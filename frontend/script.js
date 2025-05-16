function runCode() {
    const code = document.getElementById("code").value;
    const input = document.getElementById("input").value;

    fetch('http://localhost:5000/run', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: code, input: input })
    })
    .then(res => res.json())
    .then(data => {
        const output = document.getElementById("output");
        output.textContent = data.error ? data.error : data.output;
    })
    .catch(err => {
        document.getElementById("output").textContent = "Error connecting to server.";
        console.error(err);
    });
}
