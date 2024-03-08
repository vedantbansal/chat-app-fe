FROM node:alpine
WORKDIR /usr/var/app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm","start"]