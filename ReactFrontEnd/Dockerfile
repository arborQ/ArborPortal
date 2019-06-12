FROM node:latest
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -qy
COPY . .

CMD [ "npm", "run", "start" ]