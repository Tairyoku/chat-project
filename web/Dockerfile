# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app/web
COPY dist/ ./dist
#COPY package*.json ./
#RUN npm install
COPY .env ./
#RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage

COPY nginx.conf /etc/nginx/nginx.conf
## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-stage /app/web/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]