# Create image based off of the official 12.8-alpine
FROM node:14-alpine


# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app/api

# Copy dependency definitions
COPY package.json package-lock.json ./


ENV DB_CONNECTION_STRING "mongodb://mongo:27017"

RUN npm install

COPY . .

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["npm", "run", "build-start:prod"]