let ServerAddress = localStorage.getItem('serverAddress') || "http://localhost:8080";
let ServerSyncInterval = localStorage.getItem('serverSyncInterval') || 60;
function setAddress() {
    let url = document.getElementById('server-url').value
    let sync = document.getElementById('server-sync-interval').value

    localStorage.setItem('ServerAddress', url);
    localStorage.setItem('ServerSyncInterval', sync);

    ServerAddress = url;
    ServerSyncInterval = sync;

    addToast("Server Address saved!");
}

function refreshSettings() {
    document.getElementById('server-url').value = ServerAddress;
    document.getElementById('server-sync-interval').value = ServerSyncInterval;
}
