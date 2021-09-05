window.addEventListener("DOMContentLoaded", () => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onload = () => { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            const listDiv = document.getElementById("list");
            const list = xmlHttp.responseText.split("/");
            console.log(list);
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
});