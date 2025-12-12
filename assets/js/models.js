import { getJSON } from "./helper.js";
import { API_KEY, API_URL } from "./config.js";

export const state = {
  isMorePosts: false,
  news: {
    totalNumPosts: 5,
    page: 1,
    data: [],
  },
};
export const loadNews = async function () {
  let { articles: data } = await getJSON(`${API_URL}${API_KEY}`);
  state.isMorePosts = data.length > state.news.totalNumPosts;

  state.news.data = data.map((post) => ({
    ...post,
    currentContentLength: 5,
  }));
};

export function getNewsPageContent(index, charToAdd = 10) {
  // const post = state.news.findIndex(index);
  const post = state.news.data.at(index);

  if (!post) return null;

  // assuming you want 5 characters each
  // const start = (charToAdd - 1) * 5;
  // const end = charToAdd * 5;

  // increase currentContentLength for next click
  post.currentContentLength = Math.min(
    post.currentContentLength + charToAdd,
    post.content.length
  );

  const start = 0;
  const end = post.currentContentLength;
  const content = post.content.slice(start, end);

  return content;
}

export function getNewsPage(page = state.news.page) {
  state.news.page = page; // update current page number (global variable: important for pagination view)

  const start = (page - 1) * state.news.totalNumPosts;
  const end = page * state.news.totalNumPosts;

  return state.news.data.slice(start, end);
}