# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Install the default OpenSSL package
RUN apk add --no-cache openssl

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install
RUN npm install -g prisma

# Copy Prisma schema and generate the client
COPY prisma ./prisma
COPY .env ./
RUN npx prisma generate

# Copy application code and build the Next.js app
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:18-alpine
WORKDIR /app

# Install the default OpenSSL package
RUN apk add --no-cache openssl

# Copy built application and dependencies from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["sh", "-c", "npx prisma db push && npm run start"]