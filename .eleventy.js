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

  return Image.generateHTML(metadata, imageAttributes);
}

// get just the output url for an image, for use in social cards
async function urlShortcode(src, alt) {
  if(alt === undefined) {
    // You bet we throw an error on missing alt (alt="" works okay)
    throw new Error(`Missing \`alt\` on myImage from: ${src}`);
  }

  let metadata = await Image(src, {
    widths: [300],
    formats: ["jpeg"],
    outputDir: './dist/img'
  });

  let data = metadata.jpeg[metadata.jpeg.length - 1];
  return data.url;
}

module.exports = function(eleventyConfig) {
    eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
    eleventyConfig.addNunjucksAsyncShortcode("imageUrl", urlShortcode);
    // eleventyConfig.addFilter( "myFilter", function() {});
   eleventyConfig.setTemplateFormats(["njk", "ejs", "js", "css"]);
    return {
      dir: {
        input: "src",
        output: "dist"
      }
    };
  };