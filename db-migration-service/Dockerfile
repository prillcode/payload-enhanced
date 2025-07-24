FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy parent project files (assumes build context is root directory)
COPY package.json pnpm-lock.yaml ./
COPY src ./src
COPY sample-data ./sample-data

# Copy migration service files
COPY db-migration-service/package.json ./migration-package.json
COPY db-migration-service/migrate.js ./migrate.js

# Install pnpm
RUN npm install -g pnpm

# Install dependencies for migration service using the migration-specific package.json
RUN mv migration-package.json package.json && pnpm install --no-frozen-lockfile

# Run the migration and seeding
CMD ["node", "migrate.js"]