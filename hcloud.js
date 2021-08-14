const Hcloud = (() => {
    const fileDownload = (fname) => {
        window.open("https://hanzikr.kro.kr/hcloud/down?name=" + fname, '_blank');
    }
    return {
        fileDownload : fileDownload
    };
})();

window.onload = () => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onload = () => { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            const listDiv = document.getElementById("list");
            const list = xmlHttp.responseText.split("/");
            for (let i = 0; i < list.length; i++) {
                const div = document.createElement("div");
                const content = document.createElement("a");
                const fname = list[i];

                content.textContent = fname;
                content.setAttribute("onclick", 'Hcloud.fileDownload("' + fname + '")');
                
                div.appendChild(content);
                listDiv.appendChild(div);
            }
        }
    };
    xmlHttp.open("GET", "https://hanzikr.kro.kr/hcloud/list", true);
    xmlHttp.send();
};