# recipr

Wondering what to eat today? Already had pizza the past few days? Recipr is a website that allows users to search for new recipes based on all sorts of qualities! Can try to find foods that are crunchy, spicy, baked, red, etc... You'll be able to discover new easy to make recipes right here! 

## Getting Started

Clone the repo!

### Prerequisites

Make sure you have Node (>8.7.0) and npm (>5.4.2). We used Node 8.7.0 and npm 5.4.2.

### Installing

### Local Installation

Linux:
Navigate to recipr/app/
```
npm install
npm run dev
npm run build
```

```
$ npm run dev

> my-project2@1.0.0 dev recipr/app
> cross-env NODE_ENV=development webpack-dev-server --open --inline --hot

Project is running at http://localhost:8080/
webpack output is served from /dist/
404s will fallback to /index.html
```

A new tab will open up running on localhost:8080

## Running the tests

Navigate to recipr/testing

To test the json parsing:
```
node parset.js
```

## Deployment

See [deploy_heroku.txt](https://github.com/nwmandel/recipr/blob/master/documents/deploy_heroku.txt) for steps to deploy on heroku!

## Built With

* [Vuetify](https://vuetifyjs.com/en/) - The web framework used
* [npm](https://www.npmjs.com/) - Dependency Management

## Authors

* **Nicholas Mandel** - [nwmandel](https://github.com/nwmandel)
* **Michael Bartido** - [mbartido](https://github.com/mbartido)
* **Dylan Davidson** - [dylanjdavidson](https://github.com/dylanjdavidson)
* **Will Chan** - [willwchan](https://github.com/willwchan)
* **Dario Torres** - [Dario-Torres](https://github.com/Dario-Torres)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## Acknowledgments

* Spoonacular for letting us use their API service.

