# pull official base image
FROM node:17-alpine

# set working directory
WORKDIR /app

# install app dependencies
COPY package*.json ./
RUN npm install

# add app
COPY . ./

# expose port and start app
EXPOSE 3000
CMD ["npm", "start"]
