const { override, addBabelPlugin, addBabelPresets } = require("customize-cra");

module.exports = override(addBabelPlugin("styled-jsx/babel"));
