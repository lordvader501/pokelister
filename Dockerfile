# step 1

FROM node:18-alpine AS builder

ENV NODE_ENV=production

WORKDIR /pokelister

RUN npm install -g parcel

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# step 2

FROM nginx

COPY --from=builder /pokelister/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf