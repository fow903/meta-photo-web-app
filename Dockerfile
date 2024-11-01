# Stage 1: Build the Angular app for SSR
FROM node:18 AS build

WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the Angular app for SSR
RUN yarn build:ssr

# Stage 2: Create the production image
FROM node:18

WORKDIR /app

# Copy the entire dist output to the production image
COPY --from=build /app/dist ./dist

# Copy yarn.lock and package.json for production dependencies
COPY package.json yarn.lock ./

# Install production dependencies using Yarn
RUN yarn install --production --legacy-peer-deps

# Expose the port on which your SSR app will run
EXPOSE 4000

# Command to run the server
CMD ["node", "dist/meta-photo-ui/server/main.js"]
