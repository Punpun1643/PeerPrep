FROM node:16

#create app directory
WORKDIR /usr/app

#bundle app source 
COPY . .

RUN npm install 

EXPOSE 8002

CMD [ "npm", "run", "dev"]
