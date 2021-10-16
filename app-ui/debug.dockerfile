# Create image based off of the official 12.8-alpine
FROM node:14-alpine

#RUN echo "nameserver 8.8.8.8" |  tee /etc/resolv.conf > /dev/null
WORKDIR /usr/src/app/app-ui

# Copy dependency definitions
COPY package.json package-lock.json ./

## installing and Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm install -g @angular/cli @angular-devkit/build-angular && npm install

EXPOSE 4200

CMD [ "npm", "start" ]
