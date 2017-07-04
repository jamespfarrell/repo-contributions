# Githuberoo

> Githuberoo allows you to search for Github users by username and see what contributions they have made to each repository.

Details of the build set up are below, but the easiest way to run this is to clone the repository, then run:
``` bash

# Clone the repo:

git clone git@github.com:jamespfarrell/repo-contributions.git

or 

git clone https://github.com/jamespfarrell/repo-contributions.git


# go into the new directory:
cd repo-contributions

# install dependencies
npm install

# You can now run it in dev mode by running

npm start
 
```
and going to http://localhost:8080/#/

See below for building and running in a production mode

```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build


# build for production and view the bundle analyzer report
npm run build --report


```

### Testing:

I had wanted to include unit tests, but hit a frustrating issue with the sass-loader in Webpack, and after a couple of hours I have decided return to this later, as I have some pressing issues that need my attention right now.