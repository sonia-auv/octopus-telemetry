FROM node:14-alpine as dependencies
RUN apk add git
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --network-timeout=30000

FROM node:14-alpine
EXPOSE 3000

WORKDIR /app
COPY --from=dependencies /app/node_modules node_modules
COPY . .
CMD ["npm", "start"]

