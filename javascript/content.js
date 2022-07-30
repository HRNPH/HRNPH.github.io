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
        add_contents('shit');
    }
}

const MediumFetch = async(name) => {
    const res = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${name}`
    );
    return await res.json();
};

const contruct_article = (header, detail, link, piclink, pubDate) => {
    const article = `
    <div class="article-card" onclick="window.open('${link}')">
        <div class="article-card__header">
            <img src="${piclink}" class="alt="article-card__image" class="article-card__image" width="100%">
        </div>
        <div class="article-card__body">
            <span class="tag">${pubDate}</span>
            <h4>${header}</h4>

        </div>
    </div>
    `
    return article;
};

// article-content
function add_contents(here) {
    MediumFetch('hrnph').then(data => {
        let article_at = document.querySelector("#article-content");
        article_at.innerHTML = "";
        for (let i = 0; i < data.items.length; i++) {
            let item = data.items[i];
            let title = item.title;
            let link = item.link;
            let pubDate = item.pubDate.split(' ')[0];
            let description = item.description;
            let piclink = item.thumbnail;
            let article = contruct_article(title, description, link, piclink, pubDate);
            let article_at = document.querySelector("#article-content");
            article_at.innerHTML += article
        }
    }).catch(err => {
        console.log(err);
    })

}