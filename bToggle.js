const Btoggle = (() => {
    const root = document.documentElement;
    let bfilter = false;

    const applyMode = () => {
        if (bfilter) {
            root.style.setProperty("--bgColor", "#181a1b");
            root.style.setProperty("--normalColor", "#64aec9");
            root.style.setProperty("--lightColor", "#2791aa");
            root.style.setProperty("--darkColor", "#207a75");
        }
        else {
            root.style.setProperty("--bgColor", "#181a1b");
            root.style.setProperty("--normalColor", "#64aef1");
            root.style.setProperty("--lightColor", "#2791c8");
            root.style.setProperty("--darkColor", "#207aa7");
        }
        let logo = document.getElementById("logo");
        if (logo != null) {
            logo.setAttribute("src", (bfilter ? "logo-blue.svg" : "logo.svg"));
        }
    };
    const setMode = (sBfilter) => {
        bfilter = sBfilter;
        Gcookie.setCookie("bfilter", (bfilter ? "1" : "0"));
        applyMode();
    };
    const getMode = () => {
        return bfilter;
    };
    const toggleMode = () => {
        setMode(!bfilter);
    };

    return {
        setMode : setMode,
        getMode : getMode,
        toggleMode : toggleMode
    };
})();