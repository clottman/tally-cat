module.exports = function(eleventyConfig) {
  
    // eleventyConfig.addFilter( "myFilter", function() {});
   eleventyConfig.setTemplateFormats(["njk", "ejs", "js", "css"]);
    return {
      dir: {
        input: "src",
        output: "dist"
      }
    };
  };