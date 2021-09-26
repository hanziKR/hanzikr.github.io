window.addEventListener("DOMContentLoaded", () => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onload = () => {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            const list = JSON.parse(xmlHttp.responseText);
            const listDiv = document.getElementById("list");
            for (let i = 0; i < list.length; i++) {
                const div = document.createElement("div");
                const content = document.createElement("a");
                const fname = list[i];

                content.textContent = decodeURIComponent(fname);
                content.onclick = () => {
                    window.open("https://hanzikr.kro.kr/hcloud/down?name=" + fname, '_blank');
                };
                div.appendChild(content);
                listDiv.appendChild(div);
            }
        }
    };
    Gcookie.loadCookieArray();
    
    let params = "";
    params += "uid=" + Gcookie.findCookie("uid") + "&";
    params += "session=" + Gcookie.findCookie("session") + "&";
    params += "path=" + encodeURIComponent("/");
    xmlHttp.open("POST", "https://hanzikr.kro.kr/hcloud/list", true);
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlHttp.send(params);

    const ws = new WebSocket("wss://hanzikr.kro.kr");
    ws.onopen = function() {
        console.log("웹소켓서버와 연결 성공");
        ws.send("hello!");
    };
    ws.onmessage = function(event) {
        console.log(`서버 웹소켓에게 받은 데이터: ${event.data}`);
    }
    ws.onclose = function() {
        console.log("서버 웹소켓 연결 종료");
    }
    ws.onerror = function(event) {
        console.log(event)
    }
    // webSocket.close();
});