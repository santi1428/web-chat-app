FROM node:14.15.4

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN ls 

RUN npm install

COPY . .

RUN chmod +x prepare_app.sh

RUN npm install -g nodemon dotenv

RUN npm ci

CMD npm run dev

EXPOSE 5000

