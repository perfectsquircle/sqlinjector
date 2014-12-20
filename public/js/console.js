window.onload = function() {
    var $ = document.querySelector.bind(document);
    EventTarget.prototype.on = EventTarget.prototype.addEventListener;

    var webSocket = new WebSocket('ws://localhost:3002/console');

    webSocket.addEventListener("open", function() {
        console.debug("webSocket open");
        webSocket.send("connect\n" + App.connectionId);
    });

    webSocket.addEventListener("message", function(e) {
        var message = e.data;
        console.debug("webSocket message", e.data);
        // TODO: un-copypaste this
        if (!message || typeof message !== "string") {
            return;
        }
        var split = message.split("\n", 2);
        var route = split[0];
        var body = split[1];
        var promise;
        switch (route) {
            case "connect":
                handleConnect(body);
                break;
            case "results":
                handleResults(body);
                break;
        }
    });

    function handleConnect() {
        $(".console").removeAttribute("hidden");
        $(".progress-area").setAttribute("hidden", "hidden");
    }

    function handleResults() {

    }

    $(".statement-form").on("submit", function(e) {
        e.preventDefault();
        console.debug("form submit");
    });
};
