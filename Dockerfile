FROM node:14-alpine as dependencies
RUN apk add git
WORKDIR /app
ARG ROS_IP
ENV ROS_IP=${ROS_IP}
COPY package.json yarn.lock ./
RUN yarn install --network-timeout=300000

FROM node:14-alpine
EXPOSE 3000

WORKDIR /app
COPY --from=dependencies /app/node_modules node_modules
COPY . .
CMD ["npm", "start"]

