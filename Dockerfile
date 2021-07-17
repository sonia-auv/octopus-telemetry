FROM node:14-alpine as dependencies
RUN apk add git
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

FROM node:14-alpine
ENV PATH /app/node_modules/.bin:$PATH
EXPOSE 3000
WORKDIR /app
COPY --from=dependencies /app/node_modules .
COPY . .
CMD ["npm", "start"]

