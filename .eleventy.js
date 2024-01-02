const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  
  eleventyConfig.addPassthroughCopy('src/css');
  eleventyConfig.addPassthroughCopy('src/images');

  eleventyConfig.addPlugin(pluginRss);

  return {
    dir: {
        input: "src"
    },
    // htmlTemplateEngine: "njk",
    passthroughFileCopy: true
  };
}