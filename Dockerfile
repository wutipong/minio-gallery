FROM node:20-alpine 
#AS builder

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build
RUN npm prune --production

# FROM node:20-alpine

# WORKDIR /app

# COPY --from=builder /app .

EXPOSE 4173
CMD ["npm", "run", "preview"]