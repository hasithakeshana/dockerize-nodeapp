#specifies the base(parent) image
FROM node:alpine

#sets the working directory - define the working directory of a Docker container
WORKDIR /app

#first copy package only package json file to the container
COPY package*.json ./

#install packages into container
RUN npm install

#copies files and directories to the container.
#copy all - nodemodules are also copy - used .dockerignore to avoid copy nodemodules to the container
COPY . .

#expose port - port of the container
EXPOSE 3000

#provides command and arguments for an executing container.
ENTRYPOINT [ "node","index.js" ]