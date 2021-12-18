hcloudapi.domloaded(async function() {
    const form = document.getElementById("form");

    form.onsubmit = async function(event) {
        event.preventDefault();
        
        const message = document.getElementById("message");

        const loginResponse = await hcloudapi.signup(event.target.id.value, event.target.password.value);
        
        if (!loginResponse.success) {
            message.textContent = "Error : " + loginResponse.reason;
            alert("!Error!");
            return false;
        }
        
        gcookie.setCookie("token", loginResponse.token);

        const url = new URL(window.location.href);
        const c = url.searchParams.get("c");
        
        if (!c || !c.startsWith("https://hanzikr.github.io") || !c.startsWith("localhost")) {
            window.location.href = "/";
        }
        else {
            window.location.href = c;
        }
        return false;
    };
});