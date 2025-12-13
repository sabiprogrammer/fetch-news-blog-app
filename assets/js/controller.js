import * as model from "./models.js";
import loadNewsView from "./views/loadBlogView.js";
import paginationView from "./views/paginationView.js";
import loadSideBarPosts from "./views/loadSideBarPosts.js";
import { initLazyLoading } from "./lazyLoadImages.js";

async function controlLoadNews() {
  loadNewsView.renderSpinner();

  try {
    await model.loadNews();
    // loadNewsView.render(model.state.news.data.slice(0, model.state.news.data.totalNumPosts));
    loadNewsView.render(model.getNewsPage(1));
    initLazyLoading();
    if (model.state.isMorePosts) paginationView.render(model.state.news);
  } catch (error) {
    loadNewsView.renderError();
  }

}

const controlContinueReading = function (postIndex) {
  const content = model.getNewsPageContent(postIndex, 59);
  const post = model.state.news.data[postIndex];
  const btn = document.querySelector(
    `.continueR[data-postindex="${postIndex}"]`
  );

  // update the content of the selected post
  const postEl = btn.closest(".post").querySelector("p.postcontent");

  postEl.textContent =
    content +
    (content.length < model.state.news.data.at(postIndex).content.length
      ? "..."
      : "");

  if (post.currentContentLength >= post.content.length) {
    btn.style.display = "none";
    // btn.disable = true;
  }
};

const controlPagination = function (goToPage=1) {
  // render NEW posts
  loadNewsView.render(model.getNewsPage(goToPage));
  initLazyLoading();
  // render NEW pagination buttons
  paginationView.render(model.state.news);

  // Scroll to top so the user sees the new page's start
  try {
    window.scrollTo({ top: 0, behavior: "auto" });
  } catch (err) {
    // fallback for very old browsers
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
};

const controlLoadSideBarPosts = async function() {
  loadSideBarPosts.renderSpinner();

  /*
    // if no data yet, wait for controlLoadNews to finish
  if (!model.state.news.data || model.state.news.data.length === 0) {
    await controlLoadNews(); // only if it's safe to call again (it awaits loadNews)
    // or alternatively, throw / return early so caller can wait
  }
  */

  try {
    loadSideBarPosts.render(model.state.news.data.slice(-7));
  } catch (error) {
    console.error(error);
    // alert('Error loading sidebar posts:', error);
    
  }
}

const init = function () {
  controlLoadNews().then(() => controlLoadSideBarPosts());

  loadNewsView.handleContinueReadingClick(controlContinueReading);
  paginationView.addHandlerClick(controlPagination);
};
init();
