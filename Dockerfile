# --- STAGE 1: Build React app ---
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package file & install dependency 
COPY package*.json ./
# Kalau pakai pnpm/yarn,
RUN yarn install

# Copy semua source code
COPY . .

# Build React app ke folder /app/build
RUN yarn run build


# --- STAGE 2: Serve dengan Nginx ---
FROM nginx:alpine

# Hapus default config nginx
RUN rm /etc/nginx/conf.d/default.conf

# Tambah config nginx untuk SPA React
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy hasil build dari stage 1 ke folder html nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Jalankan nginx
CMD ["nginx", "-g", "daemon off;"]
