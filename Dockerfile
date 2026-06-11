# Build Stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production Stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# Copy custom Nginx config if needed, otherwise default is used
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
