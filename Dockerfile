# Etapa de build
FROM node:18 as build

WORKDIR /app

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

COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma

EXPOSE 3000

CMD sh -c "npx prisma migrate deploy && npm run start:prod"
