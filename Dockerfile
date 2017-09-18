FROM node:6-alpine as build

ENV NODE_ENV delevopment

WORKDIR /usr/src/app

COPY . . 

RUN npm install --silent
RUN npm install grunt-cli -g --silent

# -------------

FROM build AS publish

RUN grunt dist

# -------------

FROM publish AS deploy

ENV NODE_ENV production

COPY --from=publish  /usr/src/app/dist .

EXPOSE 3001

CMD node app.js