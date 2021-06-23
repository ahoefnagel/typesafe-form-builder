# typesafe form builder - 🔧 Bob The Form Builder 🔨
Building forms with complete typesafety. 

## Quick start
Live Demo: https://ahoefnagel.github.io/typesafe-form-builder/  
Run the following commands to get started.  
`npm install`  
`npm start`  
Below is stated some more information about the structure of the project. 

## Initializing the project
The initialization of the three sub-projects that are used to create the form builder are quite straight forward.  
Just as you normally would, you use `npm install` to install all the required packages.  
But this can be done in the root folder of the project.  
The install script has been changed by installing the packages that are required for each sub-project. 

## Building the project
After the packages of a sub-project have been downloaded, the `postinstall` script will be ran on all the sub-projects.  
This script will build the project with the specifications that have been described in the relevant `tsconfig.json` files. 

## Running a local instance
For the developing or expanding of this project there is a way to run all of the code on a testing server, since all code is client sided.  
By running `npm start` in the root folder a `http-server` will be started with the `build` folder as the root directory of the local server.  
In the console the host:port will be displayed, or you can navigate to http://127.0.0.1:8080/  
For angular you can directly navigate to  http://127.0.0.1:8080/angular/  
For react you can directly navigate to  http://127.0.0.1:8080/react/  

## Additional information 
A live demo can be found at https://ahoefnagel.github.io/typesafe-form-builder/ with some more information on the usage of the library. 