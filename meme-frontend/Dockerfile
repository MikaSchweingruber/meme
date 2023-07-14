FROM node:lts-alpine AS Builder

ENV NODE_OPTIONS --openssl-legacy-provider

# install simple http server for serving static content
RUN export \
  http_proxy="http://10.242.1.1:3128/" \
  https_proxy="http://10.242.1.1:3128/" && \
  npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm config set registry=https://st-nexus.sz.coop.ch/repository/nodejs-npmjs/ && \
  npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . /app

# build app for production with minification
RUN npm run build

FROM nginx:1.21-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=Builder /app/dist /usr/share/nginx/html