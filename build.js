const fs = require("fs-extra");

fs.rmdirSync("build", {recursive: true});

fs.copySync("angular-form-builder/dist/angular-form-builder", "build/angular");
// fs.copySync("react/dist", "build/react");