FROM node:14-alpine as dependencies
RUN apk add git
WORKDIR /app
# COPY package.json yarn.lock ./
COPY package.json ./
# RUN yarn install --network-timeout=300000
RUN npm install

FROM node:14-alpine
EXPOSE 3000

WORKDIR /app
COPY --from=dependencies /app/node_modules node_modules
COPY . .
CMD ["npm", "start"]

