# A self-contained build environment
FROM node:8.16

RUN apt-get update && apt-get install apt-file -y && apt-file update && apt-get install vim -y

WORKDIR /opt/mts/src
RUN mkdir -p /opt/mts/build
COPY package.json package-lock.json ./
RUN npm install
RUN yarn global add serve
COPY . ./
RUN npm run build --output-path=/opt/mts/build

#docker build -t marathon .
# docker run --expose 5000 -it marathon bash
#  yarn global add serve
#  serve -s build
#
# npm run start 