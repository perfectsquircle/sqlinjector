window.onload = function() {
    $ = document.querySelector.bind(document);
    $$ = document.querySelectorAll.bind(document);
    EventTarget.prototype.on = EventTarget.prototype.addEventListener;

    //wsInit();
    ajaxInit();
};

function ajaxInit() {
    function handleResultsHtml(resultHtml) {
        //stopTimer();
        $(".result-area").innerHTML = resultHtml;
    }

    function handleError(error) {
        console.error(error);
        if (error && error.message) {
            $(".result-area").innerHTML = "<pre>" + error.message + "</pre>";
        }
    }

    var timer = $(".timer");
    var timerStart;
    function startTimer() {
        timerStart = Date.now();
        requestAnimationFrame(function step(timestamp) {
            timer.innerText = (Date.now() - timerStart) + "ms"; // TODO: DEFINITELY don't use Date.now()
            requestAnimationFrame(step);
        }, timer);
    }

    function stopTimer() {

    }

    var consoleInput = $(".statement-form .console-input");
    var params = $$(".statement-form .param");
    $(".statement-form").on("submit", function(e) {
        startTimer();
        e.preventDefault();
        console.debug("form submit", consoleInput.value);
        var queryParams = [].map.call(params, function(param) {
            return param.value;
        }).filter(function(param) {
            return param.length;
        });
        ajax("post", "/consoleSession/" + App.consoleSessionKey + "/query", {
            queryText: consoleInput.value,
            queryParams: queryParams
        }).then(handleResultsHtml).catch(handleError);

    });
}

function wsInit() {

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
}
