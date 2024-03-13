FROM node:20.10-alpine
ARG workdir

WORKDIR $workdir
ADD package*.json .
RUN npm i
ADD . .

CMD npm run dev