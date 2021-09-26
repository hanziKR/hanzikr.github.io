window.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");

    form.onsubmit = (event) => {
        event.preventDefault();

        const id = event.target.id.value.toLowerCase();
        const password = event.target.password.value;
        const message = document.getElementById("message");

        message.textContent = "";

        const passwordHash = String(CryptoJS.SHA256(password)).toUpperCase();
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onload = () => {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                const response = JSON.parse(xmlHttp.response);
                if (!response.success) {
                    switch (response.msg) {
                        case "iorp": {
                            message.textContent = "id나 password가 잘못되었습니다";
                            break;
                        }
                        case "exist": {
                            message.textContent = "다른 유저가 사용중인 id입니다";
                            break;
                        }
                        default: {
                            message.textContent = "알 수 없는 오류가 발생했습니다";
                            break;
                        }
                    }
                }
                else {
                    const expires = response.data.data.expires;
                    
                    Gcookie.setCookie("session", response.data.session, expires);
                    Gcookie.setCookie("uid", response.data.data.id, expires);
                    
                    const url = new URL(window.location.href);
                    const c = url.searchParams.get("c");

                    if (!c || !c.startsWith("https://hanzikr.github.io")) {
                        window.location.href = "/";
                    }
                    else {
                        window.location.href = c;
                    }
                }
            }
        };
        let params = "";
        params += "id=" + id + "&";
        params += "password=" + passwordHash;

        xmlHttp.open("POST", "https://hanzikr.kro.kr/signup", true);

        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.send(params);
    };
});