const pluginRss = require("@11ty/eleventy-plugin-rss");
const Image = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  
  eleventyConfig.addPassthroughCopy('src/css');
  eleventyConfig.addPassthroughCopy('src/images');

  eleventyConfig.addPlugin(pluginRss);



	eleventyConfig.addShortcode("image", async function (src, alt, sizes) {
		let metadata = await Image(src, {
			widths: [300, 600, 900, 1200, 1800],
			formats: ["webp", "jpeg"],
      // urlPath: "./images/",
      outputDir: "./_site/img/",
		});

		let imageAttributes = {
			alt,
			sizes,
			loading: "lazy",
			decoding: "async",
		};

		// You bet we throw an error on a missing alt (alt="" works okay)
		return Image.generateHTML(metadata, imageAttributes);
	});


  return {
    dir: {
        input: "src"
    },
    // htmlTemplateEngine: "njk",
    passthroughFileCopy: true
  };
}