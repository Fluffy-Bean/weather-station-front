const addressRegex = new RegExp('^(https?:\\/\\/)(localhost|(?:[a-zA-Z0-9-]+\\.)*[a-zA-Z0-9-]+\\.[a-z]{2,}|(?:[0-9]{1,3}\\.){3}[0-9]{1,3})(?::[0-9]{1,5})?$');

let ServerAddress = localStorage.getItem('serverAddress') || "http://localhost:8080";
let ServerSyncInterval = localStorage.getItem('serverSyncInterval') || 60;
function setAddress() {
    setServerAddress();
    setServerSyncInterval();
}

function setServerAddress() {
    let url = document.getElementById('server-url').value

    if (!addressRegex.test(url)) {
        addToast("Invalid Server Address!", "error");
        return;
    }

    if (url === ServerAddress) {
        return;
    }

    localStorage.setItem('ServerAddress', url);
    ServerAddress = url;

    addToast("Server Address updated!");
}

function setServerSyncInterval() {
    let sync = document.getElementById('server-sync-interval').value

    if (isNaN(sync)) {
        addToast("Invalid Sync Interval!");
        return;
    }

    if (sync === ServerSyncInterval) {
        return;
    }

    localStorage.setItem('ServerSyncInterval', sync);
    ServerSyncInterval = sync;

    addToast("Server Sync Interval updated!");
}

function refreshSettings() {
    document.getElementById('server-url').value = ServerAddress;
    document.getElementById('server-sync-interval').value = ServerSyncInterval;
}
