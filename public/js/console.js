window.onload = function() {
    var $ = document.querySelector.bind(document);
    EventTarget.prototype.on = EventTarget.prototype.addEventListener;

    var webSocket = new WebSocket('ws://localhost:3002/console');

    webSocket.addEventListener("open", function() {
        console.debug("webSocket open");
        webSocket.send(App.consoleSessionKey);
    });

    webSocket.addEventListener("message", function(e) {
        var message = e.data;
        console.debug("webSocket message", e.data);
        // TODO: un-copypaste this
        if (!message || typeof message !== "string") {
            return;
        }
        var messageObj = JSON.parse(message);
        var action = messageObj.action;
        var params = messageObj.params;
        var body = messageObj.body;
        var promise;
        switch (action) {
            case "establish":
                handleEstablish(params, body);
                break;
            case "results":
                handleResults(params, body);
                break;
            case "resultsHtml":
                handleResultsHtml(body);
                break;
            case "error":
                handleError(body);
                break;
        }
    });

    function handleEstablish() {
        $(".console").removeAttribute("hidden");
        $(".progress-area").setAttribute("hidden", "hidden");
    }

    function handleResults(result) {

    }


    function handleResultsHtml(resultHtml) {
        $(".result-area").innerHTML = resultHtml;
    }

    function handleError(error) {
        console.error(error);
    }

    var consoleInput = $(".console-input");
    $(".statement-form").on("submit", function(e) {
        e.preventDefault();
        console.debug("form submit", consoleInput.value);
        webSocket.send(JSON.stringify({
            action: "query",
            body: consoleInput.value
        }));

    });
};
