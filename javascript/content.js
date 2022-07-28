function page_swap() {
    home = document.querySelector("#home-content");
    article = document.querySelector("#article-content");
    side_button = document.querySelector("#side-button");
    // add hidden class if element is not hidden and remove if hidden

    if (home.classList.contains("hidden")) {
        home.classList.remove("hidden");
        article.classList.add("hidden");
        let texts = "บทความ";
        // change each <h1> element in side_button
        side_button.innerHTML = "";
        // for each text in texts
        for (let i = 0; i < texts.length; i++) {
            let text = texts[i];
            side_button.innerHTML += `<h1>${text}</h1>`;
        }

    } else {
        article.classList.remove("hidden");
        home.classList.add("hidden");

        let texts = "หน้าหลัก";
        // change each <h1> element in side_button
        side_button.innerHTML = "";
        // for each text in texts
        let holder = null;
        for (let i = 0; i < texts.length; i++) {
            let text = texts[i];
            if (texts[i + 1] === "้" || texts[i + 1] === "ั") {
                text = text + texts[i + 1];
                side_button.innerHTML += `<h1>${text}</h1>`;
                holder = i + 1
            } else if (i !== holder) {
                side_button.innerHTML += `<h1>${text}</h1>`;
            }

        }
    }




}