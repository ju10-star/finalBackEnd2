# finalBackEnd2

# Proyecto Final Backend III – API de Adopciones

Este proyecto implementa un API REST de adopciones con Node.js, Express y Jest para pruebas.  
Incluye endpoints CRUD, validaciones y dockerización para despliegue.

---

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/jul10star/finalbackend2.git
   cd finalbackend2

2. Instalar dependencias:
    bash
    npm install

3. Ejecutar la suite de pruebas con Jest:
    bash
    npm test

4. Evidencia de ejecución

 PASS  tests/adoption.test.js
  Adoption Router
    √ GET /adoption debería devolver listado
    √ POST /adoption debería crear adopción válida
    √ POST /adoption debería fallar si faltan datos
    √ POST /adoption debería fallar si falta el campo 'petId'
    √ GET /adoption/:id debería devolver 404 si el ID no existe
    √ PUT /adoption/:id debería actualizar correctamente una adopción
    √ DELETE /adoption/:id debería eliminar una adopción existente

5. Dockerización: 

    Dockerfile:
        FROM node:18-alpine
        WORKDIR /app
        COPY package*.json ./
        RUN npm install --production
        COPY . .
        EXPOSE 3000
        CMD ["node", "server.js"]

6. Construcción de la imagen:
    docker build -t finalbackend2 .

7. Ejecución del contenedor:
    docker run -p 3000:3000 finalbackend2

8. La API estará disponible en http://localhost:3000

9. Link al repositorio:
    https://hub.docker.com/r/jul10ndev/finalbackend2

10. Evidencia:

            Tests: 7/7 en verde 

            Docker: Imagen construida y ejecutada correctamente 

            Publicación: Imagen disponible en DockerHub 

            Repositorio GitHub: https://github.com/jul10star/finalBackEnd2
