# Backend - MediControl API

API desarrollada con NestJS para la gestión de usuarios, medicamentos, horarios y métricas de salud.

---

## Requisitos

- Node.js
- Yarn
- Docker y Docker Compose
- Nest CLI

Instalar Nest CLI globalmente:

```bash
npm install -g @nestjs/cli
```

1. Clonar el repositorio y cd backend
2. `yarn install`
3. Clonar el archivo `.env.template` y renombrarlo a `.env`
4. Cambiar las variables de entorno
5. Levantar la base de datos

```
docker-compose up -d
```

6. Levantar: `yarn start:dev`
7. Ejecutar SEED

```
http://localhost:3000/api/seed
```

## Usuarios disponibles

1.

- email: admin@test.com
- password: Admin123

2.

- email: user@test.com
- password: Password123

## Documentación de la API

La API cuenta con documentación generada con Swagger.

Una vez levantado el backend, se puede acceder desde:

```
http://localhost:3000/api

```

Para utilizar endpoints protegidos:

1. Ejecutar el endpoint de login
2. Copiar el token JWT obtenido en la respuesta
3. Hacer clic en el botón **Authorize**
4. Ingresar el token
