# Use the official Node.js image with the desired version
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build TypeScript code
RUN npm run build

# Expose the port that the application will run on
EXPOSE 8080

# Run the application
CMD [ "node", "build/index.js" ]