FROM node:22-alpine AS development

WORKDIR /usr/app

COPY package*.json ./

RUN npm ci

COPY ./ ./

RUN npm run build


FROM node:22-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/app

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=development /usr/app/dist ./dist

CMD [ "npm", "start" ]