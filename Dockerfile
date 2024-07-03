FROM node:20-alpine3.18 as builder

WORKDIR /app
COPY package*.json ./
RUN sudo rm -r node_modules
RUN npm install --production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]