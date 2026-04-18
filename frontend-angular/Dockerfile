FROM nginx:alpine

# 1. Limpiamos
RUN rm -rf /usr/share/nginx/html/*

# 2. Copiamos los archivos de Angular
COPY dist/frontend-angular/browser/ /usr/share/nginx/html/

# 3. CREAMOS el archivo de configuración desde aquí mismo (sin usar el tuyo)
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
    location /api/ { \
        proxy_pass http://backend-service/api/; \
    } \
}' > /etc/nginx/conf.d/default.conf

# 4. Permisos
RUN chmod -R 755 /usr/share/nginx/html