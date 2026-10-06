# --- Étape 1 : Installation des dépendances ---
FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# --- Étape 2 : Compilation du projet ---
FROM node:24-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# --- Étape 3 : Image de production finale ---
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Création de l'utilisateur non-root
RUN addgroup -S -g 1001 nodejs && \
    adduser -S -u 1001 -G nodejs nestjs

# ✅ CRÉER LE DOSSIER logs ET DONNER LES PERMISSIONS
RUN mkdir -p /app/logs && chown -R nestjs:nodejs /app/logs

COPY --from=deps /app/package.json /app/package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist

USER nestjs
EXPOSE 3000
CMD ["node", "dist/main.js"]