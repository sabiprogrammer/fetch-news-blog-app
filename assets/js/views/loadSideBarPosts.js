class SideBarPosts {
  _data;
  _parentElement = document.querySelector(".mini-posts");

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
    // this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  renderSpinner() {
    const markup = "loading...";
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError() {
    return "Data might not be empty";
  }

  _generateMarkup() {
    return this._data
      .map((post) => {
        return `
            <article class="mini-post">
                <header>
                    <h3><a href="#${post.url}" target="_blank">${post.title}</a></h3>
                    <time class="published" datetime="2015-10-20">${post.publishedAt}</time>
                    <a href="#" class="author"><img src="images/avatar.jpg" alt="" /></a>
                </header>
                <a href="${post.url}" target="_blank" class="image"><img src="${post.urlToImage}" alt="" /></a>
            </article>
        `;
      })
      .join("");
  }
}

export default new SideBarPosts();
