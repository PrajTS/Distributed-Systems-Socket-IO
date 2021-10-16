# Create image based off of the official 12.8-alpine
FROM node:16-alpine

#RUN echo "nameserver 8.8.8.8" |  tee /etc/resolv.conf > /dev/null
WORKDIR /app

# Copy dependency definitions
COPY package.json package-lock.json ./

## installing and Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm ci


COPY . /app/

EXPOSE 4200

CMD [ "npm", "start" ]
