FROM node:16.20.1-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20.10.0-alpine

WORKDIR /app
COPY package.json .
RUN npm install --only=production

COPY --from=build /app/build ./build

CMD npm run start