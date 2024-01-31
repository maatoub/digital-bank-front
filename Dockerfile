
# Application Vite
FROM node:alpine as build
WORKDIR /app
COPY package.json .
COPY . .
RUN npm install
RUN npm run build
CMD [ "npm","run","dev" ]
EXPOSE 5173

#  server Nginx
FROM nginx:latest
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
