# Use official Node.js LTS image (Alpine Linux variant is small)
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first (optimizes layer caching)
COPY package*.json ./

# Install ONLY production dependencies
RUN npm ci --only=production

# Copy all remaining files
COPY . .

# Expose port 3000 to the host machine
EXPOSE 3000

# Command to run when container starts
CMD ["node", "server.js"]
