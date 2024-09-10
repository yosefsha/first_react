# Stage 1: Build the React app
FROM node:18-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React application
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy the built React app from the previous stage to the Nginx web server's default location
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to allow external traffic to the container
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
