FROM node:18

WORKDIR /app

COPY server.js .

RUN npm install express axious cors

ENV PORT=5001 

EXPOSE 5001

CMD ["node", "server.js"]