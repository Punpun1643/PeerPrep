FROM node:16

#create app directory
WORKDIR /usr/app

#bundle app source 
COPY . .

RUN npm install 

EXPOSE 8004

CMD [ "npm", "run", "dev"]