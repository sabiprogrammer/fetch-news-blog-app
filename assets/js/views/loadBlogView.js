// import avatarImg from "url:../../../images/avatar.jpg";
const avatarImg = new URL("../../../images/avatar.jpg", import.meta.url);
const pic01 = new URL("../../../images/pic01.jpg", import.meta.url);
// console.log(pic01.href);

class LoadNewsView {
  _data;
  _parentElement = document.querySelector("#main");
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderSpinner() {
    const markup = "loading...";
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  renderError() {
    return "Data might not be empty";
  }
  handleContinueReadingClick(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".continueR");

      if (!btn) return;

      e.preventDefault();
      const postIndex = btn.dataset.postindex;

      handler(postIndex);
    });
  }

  _generateMarkup() {
    return this._data
      .map((post, index) => {
        return `
                <article class="post">
                    <header>
                        <div class="title">
                            <h2><a target="_blank" href="${post.url}">${post.title}</a></h2>
                            <p>
                                ${
                                  post.description.length > 100
                                    ? post.description.slice(0, 50) + "..."
                                    : post.description
                                }
                            </p>
                        </div>
                        <div class="meta">
                            <time class="published" datetime="2015-11-01">${
                              post.publishedAt
                            }</time>
                            <a href="#" class="author"><span class="name">${post.author}</span><img src="${avatarImg}" alt="${
          post.title
        }" /></a>
                        </div>
                    </header>
                    <a href="${post.url}" target="_blank" class="image featured"><img data-src="${
          post.urlToImage
        }" src="${pic01}" alt="" /></a>
                    <p class="postcontent">${post.content.slice(
                      0,
                      post.currentContentLength
                    )}${
          post.content.length > post.currentContentLength ? "..." : ""
        }</p>
                    <footer>
                        <ul class="actions">
                            <li><a href="#" class="button large continueR" data-postindex="${index}">Continue Reading</a></li>
                        </ul>
                        <ul class="stats">
                            <li><a href="#">General</a></li>
                            <li><a href="#" class="icon solid fa-heart">28</a></li>
                            <li><a href="#" class="icon solid fa-comment">128</a></li>
                        </ul>
                    </footer>
                </article>
            `;
      })
      .join("");
  }
}

export default new LoadNewsView();
