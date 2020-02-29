FROM node:12

RUN npm install cnpm -g --registry=https://registry.npm.taobao.org \
    && cnpm install pm2@latest -g
COPY ./backend/package.json /code/backend/package.json
COPY ./frontend/package.json /code/frontend/package.json

RUN cd /code/backend \
    && cnpm install

RUN cd /code/frontend \
    && cnpm install

# expect a build-time variable
ARG CDN_HOST
# use the value to set the ENV var default
ENV CDN_HOST=$CDN_HOST

ENV NEXT_TELEMETRY_DISABLED=1
COPY ./ /code
RUN cd /code/backend \
    && npm run build \
    && cd /code/frontend \
    && npm run build

WORKDIR /code/frontend
CMD cd /code/backend && npm run typeorm:run && pm2 start dist/src/main.js && pm2 start http-server.js && cd /code/frontend && npm run start


