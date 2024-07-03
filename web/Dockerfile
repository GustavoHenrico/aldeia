FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

RUN mkdir -p /etc/nginx/ssl
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/nginx/ssl/nginx.key \
    -out /etc/nginx/ssl/nginx.crt \
    -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"

FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY --from=build /etc/nginx/ssl/nginx.crt /etc/nginx/ssl/
COPY --from=build /etc/nginx/ssl/nginx.key /etc/nginx/ssl/

RUN echo 'server {' > /etc/nginx/conf.d/nginx.conf
RUN echo '    listen 80;' >> /etc/nginx/conf.d/nginx.conf
RUN echo '    listen 443 ssl;' >> /etc/nginx/conf.d/nginx.conf
RUN echo '    server_name localhost;' >> /etc/nginx/conf.d/nginx.conf
RUN echo '' >> /etc/nginx/conf.d/nginx.conf
RUN echo '    ssl_certificate /etc/nginx/ssl/nginx.crt;' >> /etc/nginx/conf.d/nginx.conf
RUN echo '    ssl_certificate_key /etc/nginx/ssl/nginx.key;' >> /etc/nginx/conf.d/nginx.conf
RUN echo '' >> /etc/nginx/conf.d/nginx.conf
RUN echo '    location / {' >> /etc/nginx/conf.d/nginx.conf
RUN echo '        root /usr/share/nginx/html;' >> /etc/nginx/conf.d/nginx.conf
RUN echo '        index index.html index.htm;' >> /etc/nginx/conf.d/nginx.conf
RUN echo '        try_files $uri $uri/ /index.html;' >> /etc/nginx/conf.d/nginx.conf
RUN echo '    }' >> /etc/nginx/conf.d/nginx.conf
RUN echo '' >> /etc/nginx/conf.d/nginx.conf
RUN echo '    # Redirecionar tráfego HTTP para HTTPS' >> /etc/nginx/conf.d/nginx.conf
RUN echo '    if ($scheme = http) {' >> /etc/nginx/conf.d/nginx.conf
RUN echo '        return 301 https://$host$request_uri;' >> /etc/nginx/conf.d/nginx.conf
RUN echo '    }' >> /etc/nginx/conf.d/nginx.conf
RUN echo '}' >> /etc/nginx/conf.d/nginx.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
