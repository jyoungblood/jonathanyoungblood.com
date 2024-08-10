const fetch = require("node-fetch")

// Fetch the most recent 10 posts
// If we want more, we can loop through requests, up to 100 at a time, and append them to an array
// https://developer.wordpress.org/rest-api/using-the-rest-api/pagination/

module.exports = async () => {
  const res = await fetch("https://printshop.hxgf.io/wp-json/wp/v2/posts?categories=5");
  let content = await res.json();
  // console.log(content);
  return content;
}
