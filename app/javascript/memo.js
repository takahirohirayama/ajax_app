function memo() {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    const formData = new FormData(document.getElementById("form"));
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const item = XHR.response.post;
        //HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得
      const list = document.getElementById("list");
       //送信後に入力フォームを削除する
      const formText = document.getElementById("content");
       //「メモとして描画する部分のHTML」を定義する
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      list.insertAdjacentHTML("afterend", HTML);
      //「メモの入力フォームに入力されたままの文字」はリセットする（上書きする）
      formText.value = "";
    };
    e.preventDefault();
  });
}
window.addEventListener("load", memo);
