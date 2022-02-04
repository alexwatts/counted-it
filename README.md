Counted it.
=============================

This repository contains a server side Google App Engine project and a React+Flux JS application for the front end.
The project itself is a site I have built for the purpose of learning these technologies. It's a site that lets users
track things (like weight loss) and generate graphs. The site is integrated with Facebook, Twitter and Google+.

Development Instructions.
=============================

I used IntelliJ 14 for development of the Google App Engine back end data structures (Cloud Data Store) and Rest
Endpoints (Spring MVC and Spring Security). For the Front End React/Flux project I used Webstorm 9.

For the back end project after checking out the repository I just open the root module of the repository and IntelliJ
will detect a GAE project and create run/debug profiles for the app engine server. There is no additional setup requried
and the server starts on port 8080 when the run/debug profile is invoked. There are Java sources and tests in the
standard maven project structure and the Spring container is integrated into GAE web app.

The Front end project is nested in the src/main/react directory. I develop this by opening this module with Webstorm 9.
There is a bit of playing around to make webstorm recognise that it's dealing JSX files. I had to set the 'Language'
setting to JSX for the entire project before the syntax was picked up. There is a gulpfile.js which compiles the react
sources into deployable JS and copies it down a couple of levels into the GAE webapp directory. Running this gulpfile
is a manual step required before deploying. For local development (without needing a running back end instance) there
is a switch in the code in api.js which turns on a mocked version of server API. I start an http server in the GAE
webapps directory and then just navigate to http://localhost:8089/index.html to see changes.

On OSX the commands I used for that are:

cd ~/counted-it/src/main/webapp
python -m SimpleHTTPServer 8089

Deployment Instructions.
=============================

In src/main/webapp/WEB-INF/app-engine-web.xml there is an application name defined. Provided that this name matches
with an application namespace you've created in google cloud plaform, then the only required step for deployment is
this maven command

mvn appengine:update

The first time this is executed you need to authenticate using your google account settings, but then the build will
be a simple fire and forget command. I've used this approach in a Jenkins job and it's very reliable.
