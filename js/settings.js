let ServerAddress = localStorage.getItem('serverAddress') || '';
function setAddress() {
    let url = document.getElementById('server-url').value
    localStorage.setItem('ServerAddress', url);
    ServerAddress = url;
}
