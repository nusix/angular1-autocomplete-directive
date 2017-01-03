# angular1-autocomplete-directive — sample of input with autocomplete functionality from backend

## Getting Started

To get started you can simply clone the angular1-autocomplete-directive repository and install the dependencies:


### Prerequisites

You need git to clone the angular1-autocomplete-directive repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

I also use node.js to initialize and test angular1-autocomplete-directive. You must have node.js and
its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).


### Clone app

Clone the app repository using git:

```
git clone https://github.com/nusix/angular1-autocomplete-directive.git
cd angular1-autocomplete-directive
```


### Install Dependencies

`Npm` is automatically preconfigured to install all dependencies so you can simply do:

```
npm install
```


### Run the Application

The project is preconfigured with a simple development web server. The simplest way to start
this server is:

```
npm start
```

Now browse to the app at `http://localhost:3000/`.


## Building

You can simply build this project with:

```
npm run build
```

That creates dist folder in the app structure with builded files neccessary for running on the web server (upload on web hosting or run loccaly with http-server -a localhost -p 8000 if it's installed)


## Testing

There are unit tests in this project.

### Running Unit Tests

Unit tests are written in
[Jasmine](https://jasmine.github.io/), which you run with the [Karma Test Runner](https://karma-runner.github.io/1.0/index.html).

* the configuration is found at `karma.conf.js`
* the unit tests are found next to the code they are testing and are named as `....spec.js`.
* the coverage of unit tests is found at `/reports/coverage/...` (just open the index.html file in browser)
* you can find tests summary (coverage, results...) in console after running npm test
* if problems with karma occurs, try run `npm install -g karma-cli` to install karma locally and then start tests in app folder

To run the unit tests with karma:

```
npm test
```


## Directory Layout

```
angular1-autocomplete-directive/              --> app root folder
    client/                   --> all of the source files for the application
        app/                   --> all components of the application
            common/            --> common components (directives)
                assets/                --> all design files (css, images, fonts)
            components/            --> all components for specific parts of the application
                home/                  --> default component - playing the game
                    home.html            --> the partial template
                    home.controller.js              --> the controller logic
                    home.spec.js         --> tests of the controller
                    home.scss         --> css style for this component
                    home.js         --> config for this component
                    home.component.js         --> home component definition
            common/            --> folder with services
            app.js          --> all modules of the app are defined in this file
        index.html             --> app layout file (the main html template file of the app)
    dist/               --> built project
    reports/            --> source of unit tests coverage
```