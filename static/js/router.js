let routes = {};

function addRoute(route, div, func = null) {
    routes[route] = {
        "div": div,
        "func": func
    };
}

function setPage(route) {
    for (let r in routes) {
        routes[r]['div'].style.display = "none";
    }
    try {
        routes[route]['div'].style.display = "block";
    } catch (e) {
        routes["*"]['div'].style.display = "block";
    }

    if (routes[route]['func'] !== null) {
        routes[route]['func']();
    }
}

function router() {
    let request = location.hash;
    request = request.replace("#", "");

    if (request === "") {
        request = "/";
    }

    setPage(request);
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
