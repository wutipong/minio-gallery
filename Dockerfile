FROM node:20-alpine AS builder

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build
RUN npm prune --production

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .

EXPOSE 3000
CMD ["node", "build"]