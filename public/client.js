let isScrolling = false;
const wrapElement = document.querySelector(".wrap");
let page = 1;

function show() {
    document.querySelector(".background").className = "background show";
}

function closePopup() {
    document.querySelector(".background").className = "background";
}

// 닫기 버튼을 클릭하면 팝업을 닫음
document.getElementById("close").addEventListener("click", function() {
    closePopup();
});

document.addEventListener("mouseup", function (e) {
    const popup = document.querySelector(".popup");
    if (!popup.contains(e.target)) {
        closePopup();
    }
});


// 클래스가 "load_article"인 article 요소의 클릭 이벤트를 수신
document.querySelectorAll(".load_article").forEach(function(article) {
    article.addEventListener("click", function() {

        const src = article.getElementsByTagName("div")[0].getElementsByTagName("img")[0].getAttribute("src");
        const title = article.getElementsByTagName("div")[0].getElementsByTagName("h2")[0].innerText;
        const content = article.getElementsByTagName("div")[0].getElementsByTagName("p")[0].innerText;
        const date = article.getElementsByTagName("div")[0].getElementsByTagName("p")[1].innerText;
        const no = article.getElementsByTagName("div")[0].getElementsByTagName("input")[0].value;
        const nodivElement = document.querySelectorAll(".nodiv");

        document.querySelector("#popup-image").src = src;
        document.querySelector("#popup-title").innerText = title;
        document.querySelector("#popup-content").innerText = content;
        document.querySelector("#popup-date").innerText = date;

        nodivElement.forEach((element, index) => {
            element.value = `${no}`;
        });

        show();
    });
});


document.getElementById("searchBtn").addEventListener("click", function() {
    document.querySelector(".textdiv").value = document.getElementById("search-text").value;
    console.log(document.getElementById("search-text").value);
    console.log(document.querySelector(".textdiv").value );
});

document.querySelector(".likeBtn").addEventListener("click", function(e) {
    e.stopPropagation();
}, false);