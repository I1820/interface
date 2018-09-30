FROM node:alpine

EXPOSE 1820
LABEL maintainer="Parham Alvani <parham.alvani@gmail.com>"
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app
RUN npm run build

CMD ["npm", "run", "start"]
