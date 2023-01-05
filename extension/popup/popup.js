// 学籍番号入力時の処理
function studentIDButtonClick() {
  chrome.storage.local.get("studentID", function (value) {
    console.log(value.studentID)

    document.getElementById('progress').style.display = 'none';
    if (value.studentID != undefined) {
      document.getElementById('introduce').style.display = 'none';
      document.getElementById('progress').style.display = 'block';
    } else if (nameText.value != "" && value.studentID == undefined) {
      chrome.storage.local.set({ 'studentID': nameText.value }, function () {
      });
      document.getElementById('introduce').style.display = 'none';
      document.getElementById('progress').style.display = 'block';
    }
  });
  document.body.style.height = "40px";
}

// 拡張機能がクリックされた際に最初に実行される処理
function windowOnload() {
  // progress はデータ取得中にポップアップに表示する要素なので最非表示にする
  document.getElementById('progress').style.display = 'none';
  // local storageから学籍番号情報を取得し、データが存在した場合はそれに応じた処理を行う
  chrome.storage.local.get("studentID", function (value) {
    console.log(value.studentID)
    if (value.studentID != undefined) {
      document.getElementById('introduce').style.display = 'none';
      document.getElementById('progress').style.display = 'block';
    }
  });
  document.body.style.height = "40px";
  document.body.style.width = "200px";
}

// データ取得ストップの処理
function dataStopButtonClick() {
  chrome.storage.local.get("studentID", function (value) {
    document.getElementById('introduce').style.display = 'block';
    document.getElementById('progress').style.display = 'none';
  });
  chrome.storage.local.clear("studentID");
}
// 拡張機能のポップアップを開くたびに実行される関数
window.onload = windowOnload;
// それぞれのボタンをクリックした際の処理
studentIdButton.addEventListener('click', studentIDButtonClick);
dataStopButton.addEventListener('click', dataStopButtonClick);