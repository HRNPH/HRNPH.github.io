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
        reContruct_Navbar('#nav-link-menu', new_navbar(false));

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
        add_contents('#article-container', MediumFetch, 'hrnph', medium_contructor);
        reContruct_Navbar('#nav-link-menu', new_navbar(true));
    }
}

const MediumFetch = async(name) => {
    const res = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${name}`
    );
    return await res.json();
};

const RepoFetch = async(name) => {
    const res = await fetch(
        `https://api.github.com/users/${name}/repos`
    );
    return await res.json();
};

const contruct_article = (header, detail, link, piclink, pubDate) => {
    let article = `
    <div class="article-card" onclick="window.open('${link}')">
        <div class="article-card__header">
            <img src="${piclink}" class="alt="article-card__image" class="article-card__image" width="100%">
        </div>
        <div class="article-card__body">
            <span class="tag">${pubDate}</span>
            <h4>${header}</h4>
    `
    if (detail !== false && detail !== null) {
        article += `<p>${detail}</p>`
    }

    article += `</div></div>`

    return article;
};

const sleep = async(milliseconds) => {
    await new Promise(resolve => {
        return setTimeout(resolve, milliseconds)
    });
};

const medium_contructor = (here, data) => {
    let article_at = document.querySelector(here);
    article_at.innerHTML = ''
    for (let i = 0; i < data.items.length; i++) {
        let item = data.items[i];
        let title = item.title;
        let link = item.link;
        let pubDate = item.pubDate.split(' ')[0];
        let description = item.description;
        let piclink = item.thumbnail;
        let article = contruct_article(title, false, link, piclink, pubDate);
        article_at.innerHTML += article;

    }

}

const github_repo_contructor = (here, repos) => {
    let article_at = document.querySelector(here);
    article_at.innerHTML = '';
    for (let i = 0; i < repos.length; i++) {
        let repo = repos[i]
        let piclink = 'https://kinsta.com/wp-content/uploads/2018/04/what-is-github-1-1.png';
        let article = contruct_article(repo.name, repo.description, repo.html_url, piclink, repo.updated_at.split('').slice(0, 10).join(''));


        article_at.innerHTML += article;
    }
}

// article-container
function add_contents(here, fecthing, who, constructor) {
    fecthing(who).then(data => {
        let article_at = document.querySelector(here);
        article_at.innerHTML = "";
        constructor(here, data);

    }).catch(err => {
        console.log(err);
    })

};

function contentSwap() {
    if (document.querySelector("#article-link").classList.contains("active")) {
        document.querySelector("#article-link").classList.remove("active");
        document.querySelector("#repo-link").classList.add("active");

        add_contents('#article-container', RepoFetch, 'hrnph', github_repo_contructor);


    } else {
        document.querySelector("#article-link").classList.add("active");
        document.querySelector("#repo-link").classList.remove("active");

        add_contents('#article-container', MediumFetch, 'hrnph', medium_contructor);

    }

}

function reContruct_Navbar(where, content) {
    const doc = document.querySelector(where);
    doc.innerHTML = content;
};

const new_navbar = (is_new = true) => {
    let data
    if (is_new) {
        data = `
            <a class='article-link active' id='article-link' onclick="contentSwap()">
                <h2>บทความ</h2>
            </a>
            <a class='article-link' id='repo-link' onclick="contentSwap()">
                <h2>โปรเจ็ค</h2>
            </a>
        `
    } else {
        data = `
            <a class='nav-link active' href="#main">
                <h2>หน้าหลัก</h2>
            </a>
            <a class='nav-link' href="#profile">
                <h2>โปรไฟล์</h2>
            </a>
            <a class='nav-link' href="#portfolio">
                <h2>ผลงาน</h2>
            </a>
            <a class='nav-link' href="#award">
                <h2>เกียรติบัตร</h2>
            </a>
            <a class='nav-link' href="#PROUD">
                <h2>ความภาคภูมิใจ</h2>
            </a>
            <a class='nav-link' href="#education">
                <h2>การศึกษา</h2>
            </a>
            `
    }

    return data;
}