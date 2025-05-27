FROM node:22-alpine AS base
WORKDIR /app
COPY package.*json ./

FROM base AS dependencies
RUN yarn install --frozen-lockfile

FROM dependencies AS development
ENV NODE_ENV=development
EXPOSE 3050
COPY . .
CMD ["yarn", "start"]

FROM dependencies AS builder
COPY . .
RUN yarn build

FROM base AS production
ENV NODE_ENV=production
EXPOSE 3050
RUN yarn install --frozen-lockfile --production && yarn cache clean
RUN yarn global add serve
COPY --from=builder /app/build ./build
CMD ["serve", "-s", "build", "-l", "3050"]