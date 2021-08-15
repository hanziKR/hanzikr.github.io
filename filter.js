window.addEventListener('DOMContentLoaded', () => {
    Gcookie.loadCookieArray();
    
    if (Gcookie.findCookie("bfilter") == "1") {
        Btoggle.setMode(true);
    }

    const btoggle = document.getElementById("btoggle");
    btoggle.checked = Btoggle.getMode();
});