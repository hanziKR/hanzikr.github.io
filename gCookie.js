const Gcookie = (() => {
    let cookieArray = []; 

    const getCookieArray = () => {
        return cookieArray;
    }
    const loadCookieArray = () => {
        cookieArray = document.cookie.split(";");
    }
    const findCookie = (key) => {
        const _key = key + "=";
        for (let i = 0; i < cookieArray.length; i++) {
            if (cookieArray[i].indexOf(_key) == 0) return cookieArray[i].slice(_key.length, cookieArray[i].length);
        }
    }
    const setCookie = (key, data) => {
        document.cookie = key + "=" + encodeURIComponent(data) + ";expires=Fri, 31 Dec 9999 00:00:00 UTC;domain=" + "hanzikr.github.io";
    }
    return {
        getCookieArray : getCookieArray,
        loadCookieArray : loadCookieArray,
        findCookie : findCookie,
        setCookie : setCookie
    };
})();