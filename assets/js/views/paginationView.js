class PaginationView {
  _data;
  _parentElement = document.querySelector("#main");

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    // this._parentElement.innerHTML = "";
    // this._parentElement.insertAdjacentHTML("afterbegin", markup);
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  renderSpinner() {
    const markup = "loading...";
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btnPag");
      if (!btn) return;
        e.preventDefault();

        const goToPage = +btn.dataset.goto;

        handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(this._data.data.length / this._data.totalNumPosts);

    // first page
    if (this._data.page === 1 && numPages > 1) {
      return `
            <ul class="actions pagination">
                <li><a href="" class="disabled button large btnPag previous">Previous Page</a></li>
                <li><a href="#" data-goto="${this._data.page + 1}" class="button large btnPag next">Next Page</a></li>
            </ul>
        `;
    }

    // last page
    if (this._data.page === numPages && numPages > 1) {
      return `
            <ul class="actions pagination">
                <li><a href="" data-goto="${this._data.page - 1}" class="button large btnPag previous">Previous Page</a></li>
                <li><a href="#" class="disabled button btnPag large next">Next Page</a></li>
            </ul>
        `;
    }

    // other pages
    if (this._data.page < numPages) {
      return `
            <ul class="actions pagination">
                <li><a href="" data-goto="${this._data.page - 1}" class="button btnPag large previous">Previous Page</a></li>
                <li><a href="#" data-goto="${this._data.page + 1}" class="button large btnPag next">Next Page</a></li>
            </ul>
        `;
    }

    // only one page
    return `
            <ul class="actions pagination">
                <li><a href="" class="disabled button btnPag large previous">Previous Page</a></li>
                <li><a href="#" class="disabled button btnPag large next">Next Page</a></li>
            </ul>
        `;
  }
}

export default new PaginationView();
