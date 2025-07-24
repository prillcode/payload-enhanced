FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy the entire project (needed for collections, globals, and seed data)
COPY ../package.json ../pnpm-lock.yaml ./
COPY ../src ./src

# Copy the db-migration-service files
COPY ./src/sample-data ./sample-data
COPY ./package.json ./
COPY ./migrate.js ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies for migration service
RUN pnpm install --frozen-lockfile

# Run the migration and seeding
CMD ["node", "migrate.js"]