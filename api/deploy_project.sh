#!/bin/bash
echo "instalando dependencias..."
yarn install
echo "instalando base de datos..."
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
echo "iniciando api..."
yarn start
