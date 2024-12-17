FROM node:lts-alpine

# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/
RUN npm install -g node-gyp

ENV PATH=/opt/app/node_modules/.bin:$PATH

RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY . .

RUN chown -R node:node .
RUN npm config set fetch-retry-maxtimeout 600000 -g && npm install
RUN npm install
RUN npm install mysql2

USER node
RUN ["npm", "run", "build"]
EXPOSE 1337
CMD ["npm", "run", "develop"]
