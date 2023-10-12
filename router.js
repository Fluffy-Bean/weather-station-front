let routes = {};

function addRoute(route, div) {
    routes[route] = div;
}

function setPage(route) {
    for (let r in routes) {
        routes[r].style.display = "none";
    }
    try {
        routes[route].style.display = "block";
    } catch (e) {
        routes["*"].style.display = "block";
    }
}

function router() {
    let request = location.hash;

    if (request === "") {
            request = "#/";
    }

    setPage(request.replace("#", ""));
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
