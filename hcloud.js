window.onload = () => {
    console.log("hi");
    const listDiv = document.getElementById("list");
    
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            console.log(xmlHttp.responseText);
            const list = ["asdf.txt", "fdsa.png", "fff.gif"];
            for (let i = 0; i < list.length; i++) {
                let content = document.createElement("p");
                content.textContent = list[i];
                listDiv.appendChild(content);
            }
        }
    }
    xmlHttp.open("GET", "https://hanzikr.kro.kr", true);
    xmlHttp.send();
};