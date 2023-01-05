import * as firebase from "../firebase/firebase-app.js";
import * as database from "../firebase/firebase-database.js";

// Initialize Firebase
const config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

let studentNumber = ''

chrome.runtime.onMessage.addListener(function (data) {
    const app = firebase.initializeApp(config);
    const db = database.getDatabase(app);

    chrome.storage.local.get("studentID", function (value) {
        studentNumber = value.studentID;
    });

    if (studentNumber != '' && studentNumber != undefined) {
        switch (data.index) {
            case 0:
                // 新規ページ
                database.update(database.ref(db, `${studentNumber}` + '/' + `openPage` + '/' + `${data.timestamp}`), {
                    url: data.url,
                    pageTitle: data.pageTitle,
                    timestamp: data.timestamp
                });
                break;
            case 1:
                // ホイール
                database.update(database.ref(db, `${studentNumber}` + '/' + `wheel` + '/' + `${data.timestamp}`), {
                    windowWidth: data.windowWidth,
                    windowHeight: data.windowHeight,
                    siteHeight: data.siteHeight,
                    scrollVertical: data.scrollVertical,
                    scrollBeside: data.scrollBeside,
                    timestamp: data.timestamp
                });
                break;
            case 2:
                // クリック
                database.update(database.ref(db, `${studentNumber}` + '/' + `click` + '/' + `${data.timestamp}`), {
                    clickX: data.clickX,
                    clickY: data.clickY,
                    timestamp: data.timestamp
                });
                break;
            case 3:
                // タブの切り替え
                database.update(database.ref(db, `${studentNumber}` + '/' + `watchPage` + '/' + `${data.timestamp}`), {
                    url: data.url,
                    pageTitle: data.pageTitle,
                    timestamp: data.timestamp
                });
                break;
        }
    }
    return true
});