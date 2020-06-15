FROM node:13-alpine as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./docker/web/package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts -g --silent

COPY ./docker/web .
RUN npm run build

FROM nginx:1.13.12-alpine
COPY --from=build ./app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
