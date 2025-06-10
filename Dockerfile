FROM node:18-slim as build
WORKDIR /app
COPY ./package*.json .
RUN npm install
COPY . .
RUN npm run build:ssr

FROM node:18-slim as production
WORKDIR /app
## Copy source code
COPY --from=build /app/dist/* .
COPY ./package.json /app/package.json
EXPOSE 4000
## Start the application
CMD ["node","server/main.js" ]
