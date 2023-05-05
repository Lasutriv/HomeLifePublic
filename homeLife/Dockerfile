FROM node:17-alpine

WORKDIR /app

COPY package.json .

RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

RUN npm install

RUN npm run build

COPY . .

EXPOSE 7777
# required for docker desktop port mapping

CMD ["npm", "start"]