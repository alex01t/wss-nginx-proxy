FROM node:lts
RUN npm install node-static && npm install ws
WORKDIR /app
COPY . .
CMD node server.js