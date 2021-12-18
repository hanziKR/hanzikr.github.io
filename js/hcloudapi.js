//required gcookie.js,  httpreq.js CryptoJS.js
const hcloudapi = function() {
    const domloaded = function(doing) {
        window.addEventListener("DOMContentLoaded", function() {
            doing();
        });
    }
    const login = async function(id, password) {
        const rawResponse = await fetch("https://hanzikr.kro.kr/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id.toLowerCase(),
                password: String(CryptoJS.SHA256(password)).toUpperCase()
            }),
        });
        const response = await rawResponse.json();
        return response;
    };
    const signup = async function(id, password) {
        const rawResponse = await fetch("https://hanzikr.kro.kr/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id.toLowerCase(),
                password: String(CryptoJS.SHA256(password)).toUpperCase()
            }),
        });
        const response = await rawResponse.json();
        return response;
        // try {
        //     const response = await httpreq.req("https://hanzikr.kro.kr/signup", { id: id.toLowerCase(), password: String(CryptoJS.SHA256(password)).toUpperCase() });
        //     if (response.success) {
        //         return { success: true, id: response.id, session: response.session, expires: response.expires };
        //     }
        //     return { success: false, reason: response.reason };
        // } catch (e) {
        //     console.log("ERROR : %s", e);
        //     return { success: false, reason: e };
        // }
    };
    const sendFile = async function(file) {
        const session = gcookie.findCookie("session");
        const id = gcookie.findCookie("id");

        const formData = new FormData();
        formData.append("session", session);
        formData.append("id", id);
        formData.append("file", file);

        const xmlHttp = new XMLHttpRequest();
        xmlHttp.open("POST", "https://hanzikr.kro.kr/hcloud/upload", true);
        xmlHttp.upload.addEventListener("progress", function(e) {
            const per = e.loaded * 100 / e.total;
            console.log(per);
        });
        xmlHttp.send(formData);

        //const response = await httpreq.reqnormal("https://hanzikr.kro.kr/hcloud/upload", formData);
        // if (response.success) {
        //     return { success: true, id: response.id, session: response.session, expires: response.expires };
        // }
        // return { success: false, reason: response.reason };
    }

    return {
        domloaded: domloaded,
        login: login,
        signup: signup,
        sendFile: sendFile
    }
}();