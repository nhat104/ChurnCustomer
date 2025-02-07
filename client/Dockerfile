# build stage
FROM node:20-alpine as build

WORKDIR /app
COPY . .
RUN npm install --force
RUN npm run build

# run stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
# # Install the shadow package for useradd
# RUN apk add --no-cache shadow

# RUN useradd -m new_user && chown -R new_user:new_user /usr/share/nginx/html
# USER new_user

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]