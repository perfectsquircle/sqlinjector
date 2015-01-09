(function(w, d) {
    function ajax(method, url, body) {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();

            xhr.addEventListener("load", function(e) {
                var stuff = this.response;
                if (this.response && this.response[0] === "{") {
                    stuff = JSON.parse(this.response);
                }
                if (this.status >= 400) {
                    reject(stuff);
                } else {
                    resolve(stuff);
                }
            });

            xhr.addEventListener("error", function(e) {
                reject(this.response);
            });

            xhr.open(method, url);
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            xhr.setRequestHeader("Content-Type", "application/json");

            if (body) {
                if (typeof body !== "string") {
                    body = JSON.stringify(body);
                }
                xhr.send(body);
            } else {
                xhr.send();
            }
        });
    }

    w.ajax = ajax;
})(window, document);
