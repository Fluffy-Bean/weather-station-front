let ServerSyncInterval = localStorage.getItem('serverSyncInterval') || 60;
function setAddress() {
    setServerSyncInterval();
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
    document.getElementById('server-sync-interval').value = ServerSyncInterval;
}


function setWebsiteSettings() {
    if (localStorage.getItem('WebsiteDarkmode') === 'yuh') {
        document.body.classList.add('darkmode');
    } else {
        document.body.classList.remove('darkmode');
    }

    if (localStorage.getItem('WebsiteAnimations') === 'yuh') {
        document.body.classList.add('animations');
    } else {
        document.body.classList.remove('animations');
    }
}

function toggleWebsiteDarkMode() {
    let darkmode = document.getElementById('website-darkmode').checked;

    if (darkmode) {
        localStorage.setItem('WebsiteDarkmode', 'yuh');
    } else {
        localStorage.removeItem('WebsiteDarkmode');  // nuh
    }

    setWebsiteSettings();
}

function toggleWebsiteAnimations() {
    let animations = document.getElementById('website-animations').checked;

    if (animations) {
        localStorage.setItem('WebsiteAnimations', 'yuh');
    } else {
        localStorage.removeItem('WebsiteAnimations');  // nuh
    }

    setWebsiteSettings();
}

function refreshWebsiteSettings() {
    let darkmode = localStorage.getItem('WebsiteDarkmode');
    let animations = localStorage.getItem('WebsiteAnimations');

    document.getElementById('website-darkmode').checked = darkmode === 'yuh';
    document.getElementById('website-animations').checked = animations === 'yuh';
}