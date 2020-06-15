FROM node:12.16-alpine

WORKDIR /app

COPY ./docker/api/package.json ./

COPY ./docker/api .
COPY ./docker/api/dist .dist

CMD ["node", "dist/main"]
