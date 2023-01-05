let windowWidth = 0;
let windowHeight = 0;
let siteHeight = 0;
let scrollVertical = 0;
let scrollBeside = 0;
windowWidth = document.documentElement.clientWidth;
windowHeight = window.innerHeight;  // ユーザーが見ているページ(ウィンドウ)の高さを取得
siteHeight = document.body.clientHeight;  // ユーザーが見ているページ全体の高さを取得
scrollVertical = window.pageYOffset;  //縦スクロール
scrollBeside = window.pageXOffset;  //横スクロール

function getUnixTimestamp() {
    // Dateオブジェクトを作成
    const date = new Date();
    // UNIXタイムスタンプを取得する (ミリ秒単位)
    const timestampMs = date.getTime();
    // UNIXタイムスタンプを取得する (秒単位に変換)
    // const timestamp = Math.floor(timestampMs / 1000);
    return timestampMs
}

const getPageTitle = function (index) {
    // ページのタイトルを取得する
    var url = location.href;
    var pageTitle = document.title
    const watchPage = {
        index: index,
        url: url,
        pageTitle: pageTitle,
        timestamp: getUnixTimestamp()
    }
    return watchPage
}

function checkScroll() {
    const wheelData = {
        index: 1,
        windowWidth: windowWidth,  // ユーザーが見ているページ(ウィンドウ)の幅を取得
        windowHeight: windowHeight,  // ユーザーが見ているページ(ウィンドウ)の高さを取得
        siteHeight: siteHeight,  // ユーザーが見ているページ全体の高さを取得
        scrollVertical: scrollVertical,  //縦スクロール
        scrollBeside: scrollBeside,  //横スクロール
        timestamp: getUnixTimestamp()  // データ取得時刻
    };
    chrome.runtime.sendMessage(wheelData, (response) => {
        return true
    });
    return true
};

chrome.runtime.sendMessage(getPageTitle(0), function (response) {
    return true
});

setInterval(function () {
    checkScroll();
}, 1000);

window.addEventListener("click", (event) => {
    const clickData = {
        index: 2,
        clickX: event.pageX,
        clickY: event.pageY,
        timestamp: getUnixTimestamp()
        // target: event.target
    }
    chrome.runtime.sendMessage(clickData, function (response) {
        return true
    })
    return true
});

window.addEventListener('focus', function () {
    chrome.runtime.sendMessage(getPageTitle(3), function (response) {
        return true
    });
});