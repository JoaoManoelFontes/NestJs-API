# Etapa de build
FROM node:18 as build

WORKDIR /app

COPY scripts/wait-for-db.sh ./wait-for-db.sh
RUN chmod +x ./wait-for-db.sh

COPY package*.json ./
COPY prisma ./prisma
COPY . .

RUN npm install
RUN npx prisma generate
RUN npm run build
RUN npm ci --omit=dev && npm cache clean --force

# Etapa final
FROM node:18

WORKDIR /app

RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

COPY --from=build /app/wait-for-db.sh ./wait-for-db.sh
RUN chmod +x ./wait-for-db.sh

COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma

EXPOSE 3000

CMD ["sh", "./wait-for-db.sh", "sh", "-c", "npx prisma migrate deploy && npm run start:prod"]
