FROM node:18

WORKDIR /app
COPY . /app
RUN yarn && npx tsc

CMD [ "node", "dist/main.js" ]