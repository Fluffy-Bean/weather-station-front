let ServerAddress = localStorage.getItem('serverAddress') || "http://localhost:8080";
function setAddress() {
    let url = document.getElementById('server-url').value
    localStorage.setItem('ServerAddress', url);
    ServerAddress = url;
    addToast("Server Address saved!");
}

function refreshSettings() {
    document.getElementById('server-url').value = ServerAddress;
}