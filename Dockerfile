# --- Étape 1 : Installation des dépendances ---
FROM node:20-alpine AS deps
WORKDIR /app

# Copie des fichiers de dépendances
COPY package.json package-lock.json* ./

# Installation de toutes les dépendances (y compris dev pour la compilation)
RUN npm ci

# --- Étape 2 : Compilation du projet ---
FROM node:20-alpine AS builder
WORKDIR /app

# Récupération des node_modules de l'étape précédente
COPY --from=deps /app/node_modules ./node_modules
# Copie du code source
COPY . .

# Compilation de TypeScript vers JavaScript (dossier dist/)
RUN npm run build

# --- Étape 3 : Image de production finale ---
FROM node:20-alpine AS runner
WORKDIR /app

# Définition de l'environnement de production
ENV NODE_ENV=production

# Création d'un utilisateur et groupe non-root pour la sécurité
RUN addgroup -S -g 1001 nodejs && \
    adduser -S -u 1001 -G nodejs nestjs

# Copie des fichiers de package pour installer uniquement les dépendances de production
COPY --from=deps /app/package.json /app/package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copie du code compilé depuis l'étape "builder"
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist

# Utilisation de l'utilisateur non-root
USER nestjs

# Exposition du port par défaut de NestJS
EXPOSE 3000

# Commande de démarrage
CMD ["node", "dist/main.js"]