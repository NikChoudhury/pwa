if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/sw.js")
            .then(res => {
                console.log("service worker registered");
                res.update()
            })
            .catch(err => console.log("service worker not registered", err))
    });
    // Refreshing
    let refreshing;
    window.addEventListener('controllerchange', () => {
        if (refreshing) return;
        refreshing = true;
        window.location.reload();
    });
}



