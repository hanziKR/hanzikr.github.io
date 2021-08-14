(window.onload = () => {
    const listDiv = document.getElementById("list");
    const list = ["asdf.txt", "fdsa.png"];
    for (let i = 0; i < list; i++) {
        let content = document.createElement("p");
        content.textContent = list[i];
        listDiv.appendChild(content);
    }
})();