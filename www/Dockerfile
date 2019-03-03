# build environment
FROM node:9.6.1 as builder

WORKDIR /app
COPY . ./

RUN npm install

ARG REACT_APP_NODE_ENV
ARG REACT_APP_API_URL

RUN npm run build

# production environment
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html/
EXPOSE 80
#CMD [“nginx”, “-g”, “daemon off;”]
