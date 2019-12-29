FROM node:12-alpine

WORKDIR /src/app

COPY src ./src
COPY static ./static
COPY package.json .
COPY server.js .

RUN mkdir uploads

# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done
RUN apk add --no-cache --virtual .gyp \
    python \
    make \
    g++ \
    && npm install \
    && apk del .gyp
# RUN npm install

CMD ["npm", "run", "start-docker"]