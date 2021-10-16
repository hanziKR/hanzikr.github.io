window.addEventListener("DOMContentLoaded", async () => {
    Gcookie.loadCookieArray();
    
    const userData = { id: Gcookie.findCookie("id"), session: Gcookie.findCookie("session") };

    const onread = function(ws) {
        return new Promise(function(resolve, reject) {
            ws.onmessage = function (event) {
                resolve(event.data);
            };
            ws.onclose = function() {
                reject();
            };
            ws.onerror = function(error) {
                reject(error);
            };
        });
    };
    const onopen = function(ws) {
        return new Promise(function(resolve, reject) {
            ws.onopen = function() {
                resolve();
            };
        });
    };

    // ws.send();

    const refresh = async function() {
        let ws = new WebSocket("wss://hanzikr.kro.kr");
        await onopen(ws);

        try {
            let data;

            ws.send(JSON.stringify({ head: "session", body: userData }));
            data = await onread(ws);
            if (data == "fail") throw 1;

            ws.send(JSON.stringify({ head: "ls" }));
            data = await onread(ws);

            if (data == "fail") throw 1;
            data = await onread(ws);

            const list = JSON.parse(data);
            const listDiv = document.getElementById("list");
            
            while (listDiv.lastElementChild) {
                listDiv.removeChild(listDiv.lastElementChild);
            }
            for (let i = 0; i < list.length; i++) {
                const div = document.createElement("div");
                const content = document.createElement("a");
                const fname = list[i];

                content.textContent = fname;
                content.onclick = () => {
                    window.open("https://hanzikr.kro.kr/hcloud/down?name=" + fname, '_blank');
                };
                div.appendChild(content);
                listDiv.appendChild(div);
            }
        } catch (e) {
            console.log(e);
        }
        ws.close();
    };
    refresh();

    document.getElementById("file").addEventListener("change", function() {
        document.getElementById("dropContainer").textContent = this.files[0].name;
    });
    document.getElementById("refresh").onclick = function() {
        refresh();
    }

    const form = document.getElementById("form");

    form.onsubmit = async (event) => {
        event.preventDefault();
        let reader = new FileReader();

        reader.onload = async function() {
            let ws = new WebSocket("wss://hanzikr.kro.kr");
            await onopen(ws);

            try {
                let data;

                ws.send(JSON.stringify({ head: "session", body: userData }));
                data = await onread(ws);
                if (data == "fail") throw 1;

                ws.send(JSON.stringify({ head: "upload", body: { name: file.files[0].name } }));
                
                data = await onread(ws);
                if (data == "fail") throw 1;
                ws.send(reader.result);

                data = await onread(ws);
                if (data == "fail") throw 1;
                alert("파일이 업로드되었습니다!");
                refresh();
            } catch (e) {
                console.log(e);
            }
            ws.close();
        };

        reader.readAsBinaryString(file.files[0]);

        // // const fileURL = window.URL.createObjectURL(file.value);
        // // console.log(fileURL);
        // // URL.revokeObjectURL(fileURL);
        // const file = event.target.file;
    }
    // webSocket.close();
});