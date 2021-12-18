const httpreq = function() {
    const req = function(url, params, timeout) {
        return new Promise(function(resolve, reject) {
            const xmlHttp = new XMLHttpRequest();
            xmlHttp.onload = function() {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    resolve(JSON.parse(xmlHttp.response));
                }
                else {
                    reject(xmlHttp.response);
                }
            };
            xmlHttp.ontimeout = function() {
                reject("xmlHttp time out");
            }

            xmlHttp.open("POST", url, true);
            xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlHttp.timeout = timeout || 3000;
            xmlHttp.send(JSON.stringify(params));
        });
    }
    const reqnormal = function(url, params, timeout) {
        return new Promise(function(resolve, reject) {
            const xmlHttp = new XMLHttpRequest();
            xmlHttp.onload = function() {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    resolve(JSON.parse(xmlHttp.response));
                }
                else {
                    reject(xmlHttp.response);
                }
            };
            xmlHttp.ontimeout = function() {
                reject("xmlHttp time out");
            }

            xmlHttp.open("POST", url, true);
            xmlHttp.timeout = timeout || 3000;
            xmlHttp.send(params);
        });
    }
    return {
        req: req,
        reqnormal: reqnormal
    }
}();