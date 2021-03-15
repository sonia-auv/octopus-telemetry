FROM node:14

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH


# Copy the dependencies
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Add the application files
COPY . ./

# Run the app
CMD ["npm", "start"]

EXPOSE 3000

