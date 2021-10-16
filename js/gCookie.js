const Gcookie = (() => {
    let cookieArray = []; 

    const getCookieArray = () => {
        return cookieArray;
    }
    const loadCookieArray = () => {
        cookieArray = document.cookie.replace(" ", "").split(";");
    }
    const findCookie = (key) => {
        const _key = key + "=";
        for (let i = 0; i < cookieArray.length; i++) {
            if (cookieArray[i].indexOf(_key) == 0) return decodeURIComponent(cookieArray[i].slice(_key.length, cookieArray[i].length));
        }
    }
    const setCookie = (key, data, expires) => {
        document.cookie = key + "=" + encodeURIComponent(data) + ";secure=true;SameSite=Strict;expires=" + expires || "Sat, 1 Jan 2000 00:00:00 GMT";
    }
    const deleteCookie = (key) => {
        document.cookie = key + "=;expires=Sat, 1 Jan 2000 00:00:00 GMT";
    }
    return {
        getCookieArray : getCookieArray,
        loadCookieArray : loadCookieArray,
        findCookie : findCookie,
        setCookie : setCookie,
        deleteCookie: deleteCookie
    };
})();