# Stage 1: Build the Angular app
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular app
RUN npm run build --prod

# Stage 2: Serve the app using Node.js
FROM node:18

WORKDIR /app

# Copy the build output
COPY --from=build /app/dist/meta-photo-ui ./dist

# Install a simple HTTP server to serve the application
RUN npm install -g http-server

# Expose port 8080
EXPOSE 8080

# Start the HTTP server and serve from the `dist` folder
CMD ["http-server", "dist", "-p", "8080"]
