From node:12

WORKDIR ./src

COPY package*.json ./

RUN npm install -y

COPY . .

EXPOSE  5006
CMD [ "npm","start" ]