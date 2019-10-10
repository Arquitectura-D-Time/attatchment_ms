From node:12

WORKDIR /src

COPY package*.json ./

RUN npm install 

COPY . .
Expose 5006
CMD [ "npm","start" ]