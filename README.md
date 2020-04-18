# Factor Conecta 

Este proyecto se divide en dos.
1. Express API
2. Vue App

## Express API

El backend fue realizado usando el framework de ExpressJS,
una base de datos Postgres usando Sequelize como ORM.

```
Antes de comenzar primero tenemos que copiar el archivo config.json.example que se encuentra en api/config y renombrarlo
a config.json, es decir solo quitamos '.example' este archivo tiene la configuración de la base de datos por lo que hay que
ingresar el usuario/contraseña para poder crear la base de datos.

Tambien tenemos que copiar el archivo .env.example y renombrarlo a .env, este archivo contiene las variables del entorno.
```

Dentro de la carpeta de api existe un script(deploy_project.sh) para el deploy del proyecto,
pero en caso de no funcionar xD podemos ejecutar los  siguientes comandos.

Instalación de dependencias
```shell
    yarn install
```

Creando la base de datos y ejecutando migraciones
```shell
    npx sequelize-cli db:create
    npx sequelize-cli db:migrate
    npx sequelize-cli db:seed:all
```

Iniciando el proyecto, por defecto usara el puerto 3000
```shell
    yarn start
```

## Vue App

El frontend fue realizando con Vue, Vuex, Vue Router, Vuetify.

Al igual que en la API hay un script(deploy_project.sh) dentro de la carpeta app,
pero en caso de no funcionar podemos ejecutar los  siguientes comandos.
```shell
    yarn install
```

Iniciando el proyecto, por defecto usara el puerto 8081
```shell
    yarn serve
```

En el navegador abrimos una nueva pestaña en
```shell
    http://localhost:8081
```
