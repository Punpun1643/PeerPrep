FROM node:16

#create app directory
WORKDIR /usr/app

#bundle app source 
COPY . .

RUN npm install --force

EXPOSE 3000

CMD [ "npm", "start"]
