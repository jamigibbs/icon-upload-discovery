const uswds = require("@uswds/compile");

/**
 * USWDS version
 */

uswds.settings.version = 3;

/**
 * Path settings
 */

uswds.paths.src.projectIcons = "./assets/icons";

/**
 * Exports
 */

exports.init = uswds.init;
exports.compile = uswds.compile;
exports.compileIcons = uswds.compileIcons;
exports.copyImages = uswds.copyImages;

