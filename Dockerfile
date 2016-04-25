FROM node:4.2.3
WORKDIR /opt/app
RUN npm i -g karma-cli
RUN npm i -g gulp-cli
#ENTRYPOINT npm start
RUN apt-get update
RUN apt-get install -y xvfb
RUN apt-get install -y chromium
RUN apt-get install -y openjdk-7-jre
ENV PORT 8080
EXPOSE 8080
