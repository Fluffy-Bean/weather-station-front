// Website Settings
function toggleWebsiteDarkMode() {
    let darkmode = document.getElementById('website-darkmode');

    if (darkmode.checked) {
        document.body.classList.add('darkmode');
        localStorage.setItem('website-darkmode', 'yuh');
    } else {
        document.body.classList.remove('darkmode');
        localStorage.removeItem('website-darkmode');  // nuh
    }
}
function toggleWebsiteAnimations() {
    let animations = document.getElementById('website-animations');

    if (animations.checked) {
        document.body.classList.add('animations');
        localStorage.setItem('website-animations', 'yuh');
    } else {
        document.body.classList.remove('animations');
        localStorage.removeItem('website-animations');  // nuh
    }
}

// Used by router to update buttons and inputs to match settings
function refreshSettings() {
    let website = document.getElementById('website-version');
    let server = document.getElementById('server-version');
    let darkmode = localStorage.getItem('website-darkmode');
    let animations = localStorage.getItem('website-animations');

    website.innerText = version;
    server.innerText = serverVersion;

    if (darkmode === "yuh") {
        document.getElementById('website-darkmode').checked = true;
    }
    if (animations === "yuh") {
        document.getElementById('website-animations').checked = true;
    }
}
