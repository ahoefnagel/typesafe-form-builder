const fs = require("fs-extra");

fs.rmdirSync("build", {recursive: true});

// Copy all of the angular-form-builder sample code into the build/angular folder. 
fs.copySync("angular-form-builder/dist/angular-form-builder", "build/angular");

// Copy all of the react sample code into the build/react folder. 
// fs.copySync("react/dist", "build/react");

// Copy the relevant pages data into the build folder
fs.copySync("documentation/pages", "build");