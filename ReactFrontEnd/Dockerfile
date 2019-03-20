FROM node:8
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -qy
COPY . .

CMD [ "npm", "run", "dev:start" ]