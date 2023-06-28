FROM node:slim

#Create app dir
WORKDIR /usr/src/app

#Install app dependencies
COPY . .

RUN npm ci --production

RUN npm run build
COPY ./src/config/config.js .build/src/config/config.js
EXPOSE 3001
EXPOSE 6969
CMD ["node", "build/server.js"]