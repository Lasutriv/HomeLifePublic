FROM node:17-alpine

WORKDIR /app

COPY package.json .

RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

# We have fontawesome pro and it requires some registry config to get the correct packages:
RUN npm config set "@fortawesome:registry" https://npm.fontawesome.com/
# npm config set "//npm.fontawesome.com/:_authToken" TOKEN
RUN npm config set "//npm.fontawesome.com/:_authToken" <TOKEN>
RUN npm install

COPY . ./

# https://github.com/wojtekmaj/react-pdf/issues/496#issuecomment-566200248
# Apparently smaller servers can run out of memory if the below is not set
ENV GENERATE_SOURCEMAP false  

RUN npm run build

EXPOSE 7777
# required for docker desktop port mapping

CMD ["npm", "start"]


# Running multiple commands on windows for ease of docker management creation/deletion
# docker stop homeLife_c && docker rm homeLife_c && docker rmi homelife_homelife && docker-compose up && docker start homeLife_c
# docker stop homeLife_c; docker rm homeLife_c; docker rmi homelife_homelife; docker-compose up; docker start homeLife_c