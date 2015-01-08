(function(w, d) {
    function ajax(method, url, body) {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();

            xhr.addEventListener("load", function(e) {
                console.debug(this);
                if (this.status >= 400) {
                    reject(this.response);
                } else {
                    if (this.response && this.response[0] === "{") {
                        resolve(JSON.parse(this.response));
                    } else {
                        resolve(this.response);
                    }
                }
            });

            xhr.addEventListener("error", function(e) {
                reject(this.response);
            });

            xhr.open(method, url);
            xhr.setRequestHeader("X-Requested-With", "xhr");
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
