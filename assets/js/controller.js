import * as model from "./models.js";
import loadNewsView from "./views/loadBlogView.js";

async function controlLoadNews() {
  loadNewsView.renderSpinner();

  try {
    await model.loadNews();
    loadNewsView.render(model.state.news.slice(0, model.state.totalNumPosts));
    if (model.state.isMorePosts) loadNewsView.renderPaginationBtn();
  } catch (error) {
    loadNewsView.renderError();
  }
}

const controlContinueReading = function (postIndex) {
  const content = model.getNewsPage(postIndex, 59);
  const post = model.state.news[postIndex];
  const btn = document.querySelector(
    `.continueR[data-postindex="${postIndex}"]`
  );

  // update the content of the selected post
  const postEl = btn.closest(".post").querySelector("p.postcontent");

  postEl.textContent =
    content +
    (content.length < model.state.news.at(postIndex).content.length
      ? "..."
      : "");

  if (post.currentContentLength >= post.content.length) {
    btn.style.display = "none";
    // btn.disable = true;
  }
};

const init = function () {
  controlLoadNews();

  loadNewsView.handleContinueReadingClick(controlContinueReading);
};
init();
