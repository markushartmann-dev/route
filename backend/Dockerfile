FROM node:20-alpine

WORKDIR /app

COPY package.json ./

# Use npm install instead of npm ci to avoid missing package-lock.json errors
RUN npm install --production

COPY . .

EXPOSE 3001

CMD ["node", "server.js"]
