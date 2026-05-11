FROM node:20-alpine

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy application source
COPY . .

ENV NODE_ENV=production
# Match host mapping in deploy workflow (-p 80:3000); app must listen on container port 3000.
ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]