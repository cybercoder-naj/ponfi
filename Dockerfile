FROM node:16

# Copy all files from the current directory to the Docker image
COPY . .

# Install dependencies
RUN npm install

# Start the server
CMD [ "npm", "start" ]