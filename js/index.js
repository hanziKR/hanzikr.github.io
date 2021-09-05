window.addEventListener("DOMContentLoaded", () => {
    Gcookie.loadCookieArray();
    const uid = Gcookie.findCookie("uid");

    const first = document.createElement("a");
    const second = document.createElement("a");
    
    first.setAttribute("class", "light-button");
    second.setAttribute("class", "light-button");
    first.setAttribute("font-size", "15px");
    second.setAttribute("font-size", "15px");
    if (uid) {
        first.textContent = "Hello! Lv.1 " + uid;
        first.href = "info";
        second.textContent = "Logout";
        second.onclick = () => {
            Gcookie.deleteCookie("uid");
            Gcookie.deleteCookie("session");
            window.location.reload();
        };
    }
    else {
        first.textContent = "Login";
        first.href = "login";
        second.textContent = "Signup";
        second.href = "signup";
    }
    const topbox = document.getElementById("topbox");

    topbox.appendChild(first);
    topbox.appendChild(second);
});