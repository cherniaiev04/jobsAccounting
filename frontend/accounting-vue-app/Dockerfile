# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code
COPY . .

# Build frontend
RUN npm run build

# Expose port
EXPOSE 8080

# Serve app
CMD ["npm", "run", "dev", "--", "--host"]
