FROM node:lts

WORKDIR /build

COPY assets assets
COPY components components
COPY layouts layouts
COPY middleware middleware
COPY pages pages
COPY plugins plugins
COPY server-middleware server-middleware
COPY static static
COPY store store

COPY nuxt.config.js .
COPY package.json .
COPY tailwind.config.js .
COPY tsconfig.json .

RUN yarn && yarn build

EXPOSE 3000
