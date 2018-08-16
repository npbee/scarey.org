# Scarey.org

## DEPENDENCIES

### Ruby dependecies

- rbenv
- Jekyll
- Sass
- Compass
- Susyone

* Install `rbenv`
* Install `nvm`

`nvm use`

Make sure bundler is installed
`gem install bundler`

Then install the dependencies:
`bundle install`

### Javascript dependencies

Make sure node and NPM are installed
`npm install`

- jQuery 1.10.2
- Gulp

## Development flow

- Start Jekyll
  `bundle exec jekyll serve --watch`
- Edit Sass
  `gulp sass`

## Deployment Flow

- Create branch
- Push to github
- Check Netlify preview
- Merge to master

Site files.

---

**Local Alias:** scarey

**Enivronment**:

- SASS
- jQuery 1.10.2
- MAMP
- Jekyll

**Build:**

- Commit to master
- scareydeploy
- cd public_html
- git pull origin master
