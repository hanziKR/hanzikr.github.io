window.addEventListener("DOMContentLoaded", () => {
    const tosignup = document.getElementById("tosignup");
    tosignup.onclick = (event) => {
        event.preventDefault();

        const url = new URL(window.location.href);
        const c = url.searchParams.get("c");

        if (c) {
            window.location.href = "/signup?c=" + encodeURIComponent(c);
        }
        else {
            window.location.href = "/signup";
        }
    }

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
                    grecaptcha.reset();
                    switch (response.msg) {
                        case "iorp": {
                            message.textContent = "id나 password가 잘못되었습니다";
                            break;
                        }
                        case "recaptcha": {
                            message.textContent = "로봇이 아님을 증명하지 못했습니다";
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

                    if (!c || !c.startsWith("https://hanzikr.github.io") || !c.startsWith("localhost")) {
                        window.location.href = "/";
                    }
                    else {
                        window.location.href = c;
                    }
                }
            }
        };
        const recres = event.target["g-recaptcha-response"].value;
        let params = "";
        params += "g-recaptcha-response=" + recres + "&";
        params += "id=" + id + "&";
        params += "password=" + passwordHash;

        xmlHttp.open("POST", "https://hanzikr.kro.kr/login", true);

        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.send(params);
    };
});