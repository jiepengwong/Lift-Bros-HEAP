# Stage 1: Build the React app
FROM node:14-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Create a smaller production image
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80

COPY --from=builder /app/entrypoint.sh /entrypoint.sh    

# wait-for-it requires bash, which alpine doesn't ship with by default. Use wait-for instead
ADD https://raw.githubusercontent.com/eficode/wait-for/v2.1.0/wait-for /usr/local/bin/wait-for
RUN chmod +rx /usr/local/bin/wait-for /entrypoint.sh

# CMD ["nginx", "-g", "daemon off;"]
ENTRYPOINT [ "sh", "/entrypoint.sh" ]
