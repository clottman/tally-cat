const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [150, 300],
    formats: ["webp", "jpeg"],
    outputDir: './dist/img/'
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function(eleventyConfig) {
    eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
    // eleventyConfig.addFilter( "myFilter", function() {});
   eleventyConfig.setTemplateFormats(["njk", "ejs", "js", "css"]);
    return {
      dir: {
        input: "src",
        output: "dist"
      }
    };
  };