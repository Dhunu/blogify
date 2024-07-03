FROM node:20-alpine3.18 as builder

WORKDIR /app
COPY package*.json ./

# Install prisma globally
RUN npm install -g prisma
RUN npm install @prisma/client
RUN npx prisma generate

RUN npm install --production

COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "npm", "run", "start" ]