FROM node:apline

EXPOSE 1820
WORKDIR /usr/src/app

COPY package.json package-lock.json /usr/src/app/
ENV NODE_ENV=production
RUN npm install

COPY . /usr/src/app
RUN npm run build

CMD ["npm", "run", "start"]
