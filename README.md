# Digital Transformation Agency's website

[![CircleCI](https://circleci.com/gh/AusDTO/dta-website.svg?style=svg&circle-token=2bcec14fa84e7b927e3e048f8448bc3c4f91674d)](https://circleci.com/gh/AusDTO/dta-website)
[![Stories in Ready](https://badge.waffle.io/AusDTO/dta-website.png?label=ready&title=Ready)](https://waffle.io/AusDTO/dta-website)
[![Code Climate](https://codeclimate.com/github/AusDTO/dta-website/badges/gpa.svg)](https://codeclimate.com/github/AusDTO/dta-website)

www.dta.gov.au is a [Jekyll website](http://jekyllrb.com/).

## Installation

**Ensure you have the pre-requisites installed:**

- [Ruby 2.3.1](https://www.ruby-lang.org/en/documentation/installation/)
- [rbenv](https://github.com/rbenv/rbenv)
- [Bundler](http://bundler.io/)
- [Node.js](https://nodejs.org) (For pa11y tests)

Run each of the following commands to get the site running locally:

1. `git clone git@github.com:AusDTO/dta-website.git`
2. `cd dta-website`
3. `bundle install`
4. `bundle exec jekyll serve`

You should be able to see the site at: http://127.0.0.1:4000

To increase the speed of jekyll builds, you can replace the last step with `bin/servefast.sh`. This will disable the search plugin and only render the latest post.

### Run tests locally

Install pa11y-ci and it's dependencies with:

1. `npm install -g phantomjs-prebuilt`
2. `npm install pa11y-ci@^0.4`

Make sure you have the app running locally with:

`bundle exec jekyll serve`

Run the tests with:

`bin/citest.sh`

### Test external links

External links are not tested as part of CI in `bin/citest.sh` to keep test results reproducible.

You can separately test external links with:

`bin/checkexternal.sh`

## Development Process

Issues are tracked on GitHub and are best viewed using [waffle](https://waffle.io/AusDTO/dta-website).

The default branch is `develop` which is continuously deployed by circleCI to https://dta.apps.staging.digital.gov.au/

The production branch is `master` which is continuously deployed by circleCI to https://www.dta.gov.au/

When starting a new change, branch from `develop`.

If needed a branch can be continuously deployed by circleCI to a staging site at https://dta-website-branchname.apps.staging.digital.gov.au/. As long as the circleCI tests are passing, this staging site will be kept up to date with all commits to the branch.

To enable continuously deploying a branch, add the branch name to `DEPLOY_BRANCHES` in `bin/cideploy.sh`. When you are finished you should remove the branch from `DEPLOY_BRANCHES` and delete the app by running `cf delete dta-website-<branchname>`.

When your change is ready, submit a PR to the `develop` branch. After the PR is merged, it will be deployed to [staging](https://dta.apps.staging.digital.gov.au/).

When ready for a production deploy, merge the `develop` branch to `master`. You can do this through Github [with a PR](https://github.com/AusDTO/dta-website/compare/master...develop) or from the command line:

* `git checkout master`
* `⁠git pull`
* `git merge --no-ff develop`
* `git push origin master`

## cloud.gov.au details

### staging

* **api**: https://api.system.staging.digital.gov.au
* **org**: dta
* **space**: website
* **circle user**: dtacircleci

### production

* **api**: https://api.system.platform.digital.gov.au
* **org**: dta
* **space**: website
* **circle user**: dtacircleci
* has a cloudfront distribution under the parent DTO AWS account
* cloudfront is logging to an S3 bucket in the parent DTO AWS account
  * `dta-site-cdn-logs`
* uses AWS Route53 for dns under the parent DTO AWS account

## Setting up CircleCI

* go to circleci in the browser and authorize with Github.
* follow your new github repo
* add the following environment variables via the circleci UI

```
CF_PROD_API
CF_STAGING_API

CF_USER
CF_PASSWORD
CF_ORG
CF_SPACE

CF_BASIC_AUTH_USERNAME  [optional]
CF_BASIC_AUTH_PASSWORD  [optional]
```
