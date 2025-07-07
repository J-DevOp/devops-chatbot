# Base image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy files
COPY package*.json ./
COPY index.cjs .
COPY index.html .

# Install dependencies
RUN npm install

# Expose port
EXPOSE 3000

# Start app
CMD ["node", "index.cjs"]
