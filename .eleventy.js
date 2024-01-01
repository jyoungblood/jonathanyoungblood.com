module.exports = function (eleventyConfig) {

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  
  eleventyConfig.addPassthroughCopy('src/css');
  eleventyConfig.addPassthroughCopy('src/images');

  return {
    dir: {
        input: "src"
    },
    passthroughFileCopy: true
  };
}