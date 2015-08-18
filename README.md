# Exosite Fleet API

Javascript library for [Exosite](http://exosite.com)'s fleet management APIs, currently in beta.

## Usage

Add library and dependencies to your HTML. The library is dependent on jQuery (for ajax) and Auth0 (for tokens). The jQuery dependency is expected to be dropped.

```
<head>
    <script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
    <script src="http://cdn.auth0.com/w2/auth0-4.js"></script>
    <script src="https://rawgit.com/dweaver/exosite-fleet/master/exosite-fleet.js"></script>
</head>
```

Use the library by requiring it

```
<script>
var fleet = require('exosite-fleet');
var exo = new fleet('API TOKEN');
exo.query({domain: "cloudy.exosite.com"}, ["model","name","sn"]).then(function(devices) {
  console.log(devices);
});
</script>
```


## Build for distribution

To build the build, do this:

```
$ npm build
npm build && cd src && browserify Exosite.js -t babelify -r ./Exosite:exosite-fleet -o ../exosite-fleet.js && cd .. && cp ./exosite-fleet.js ../fleet/scripts/exosite-fleet.js
$ uglifyjs exosite-fleet.js -o exosite-fleet.min.js
```
