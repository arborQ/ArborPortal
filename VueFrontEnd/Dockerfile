FROM node:8
WORKDIR /usr/src/vue

COPY package*.json ./
RUN npm install -qy
COPY . .

EXPOSE 8081:8081
CMD [ "npm", "run", "dev" ]