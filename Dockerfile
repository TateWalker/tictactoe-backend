FROM node:slim

#Create app dir
WORKDIR /usr/src/app

#Install app dependencies
COPY . .

RUN npm ci --production

RUN npm run build
RUN mkdir ./build/src/config
COPY ./src/config/config.js ./build/src/config/config.js
EXPOSE 3001
EXPOSE 4242
CMD ["node", "build/server.js"]