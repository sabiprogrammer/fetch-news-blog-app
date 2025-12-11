import { getJSON } from "./helper.js";
import { API_KEY, API_URL } from "./config.js";

export const state = {
  totalNumPosts: 3,
  isMorePosts: false,
  news: [],
};
export const loadNews = async function () {
  let { articles: data } = await getJSON(`${API_URL}${API_KEY}`);
  state.isMorePosts = data.length > state.totalNumPosts;

  state.news = data.map((post) => ({
    ...post,
    currentContentLength: 5,
  }));
};

export function getNewsPageContent(index, charToAdd = 10) {
  // const post = state.news.findIndex(index);
  const post = state.news.at(index);

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

export function getNewsPage(page){
  const start = (page - 1) * state.totalNumPosts;
  const end = page * state.totalNumPosts;
  return state.news.slice(start, end);
}