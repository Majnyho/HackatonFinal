# HackatonFinal# Proyecto E-commerce

Este proyecto es una aplicación de comercio electrónico desarrollada con Node.js, Express y MongoDB. Permite a los usuarios registrarse, iniciar sesión, buscar productos, realizar pagos y gestionar pedidos.

## Requisitos Previos

- Node.js
- MongoDB Atlas
- Cuenta de Culqi para pagos

## Configuración del Proyecto

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables de entorno:

```

MONGODB_URI=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=tu_secreto_para_jwt
CULQI_PRIVATE_KEY=sk_test_SWyklAB8rIyjXmje
CULQI_PUBLIC_KEY=pk_test_3dQXj5Q1Z5JZ5j7

### Instalación de Dependencias
npm install 

Ejecución del Servidor
npm start

##### Funcionalidades
https://hackatonfinal-xcbz.onrender.com
Usuarios
Registro de Usuario

Ruta: POST /api/users/register
Cuerpo: { "username": "testuser", "password": "password123" }
Login de Usuario

Ruta: POST /api/users/login
Cuerpo: { "username": "testuser", "password": "password123" }
Obtener Información del Usuario

Ruta: GET /api/users/profile
Encabezados: Authorization: Bearer <token>
Actualizar Información del Usuario

Ruta: PUT /api/users/profile
Encabezados: Authorization: Bearer <token>
Cuerpo: { "username": "nuevoNombre", "password": "nuevaContrasena" }

Eliminar Usuario
Ruta: DELETE /api/users/profile
Encabezados: Authorization: Bearer <token>
Productos
Obtener Todos los Productos

Ruta: GET /api/products
Crear un Nuevo Producto

Ruta: POST /api/products
Cuerpo: { "name": "Producto", "description": "Descripción", "price": 1000, "category": "Categoría", "stock": 10 }

Obtener un Producto por ID
Ruta: GET /api/products/:id

Actualizar un Producto
Ruta: PUT /api/products/:id
Cuerpo: { "name": "Nuevo Nombre", "description": "Nueva Descripción", "price": 1500, "category": "Nueva Categoría", "stock": 20 }

Eliminar un Producto
Ruta: DELETE /api/products/:id

Filtrar Productos por Stock
Ruta: GET /api/products/filter/stock?inStock=true

Filtrar Productos por Categoría
Ruta: GET /api/products/filter/category?category=Categoría

Buscar Productos por Inicial
Ruta: GET /api/products/search/initial?initial=A

Pagos

Procesar Pago
Ruta: POST /api/payments/pay
Cuerpo: { "token": "tok_test_visa_123456789", "amount": 1000, "email": "cliente@example.com" }

Reembolsar Pago
Ruta: POST /api/payments/refund
Cuerpo: { "chargeId": "chr_test_123456789", "reason": "Solicitud del cliente" }

Verificar Estado de Pago
Ruta: GET /api/payments/status/:chargeId
Órdenes

Crear una Nueva Orden
Ruta: POST /api/orders
Encabezados: Authorization: Bearer <token>
Cuerpo: { "userId": "60c72b2f9b1e8c1a50f8b8b5", "products": [{ "product": "60c72b2f9b1e8c1a50f8b8b6", "quantity": 2 }], "totalAmount": 3000, "status": "Pendiente" }

Obtener las Órdenes del Usuario
Ruta: GET /api/orders
Encabezados: Authorization: Bearer <token>

Obtener una Orden por ID
Ruta: GET /api/orders/:id
Encabezados: Authorization: Bearer <token>

Actualizar el Estado de una Orden
Ruta: PUT /api/orders/:id/status
Encabezados: Authorization: Bearer <token>
Cuerpo: { "status": "Enviado" }

Eliminar una Orden
Ruta: DELETE /api/orders/:id
Encabezados: Authorization: Bearer <token>

Obtener Todas las Órdenes (Administrador)
Ruta: GET /api/orders/all
Encabezados: Authorization: Bearer <token>

Contribución
Si deseas contribuir a este proyecto, por favor, sigue los siguientes pasos:

Haz un fork del repositorio.

Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
Realiza tus cambios (git commit -m 'Añadir nueva funcionalidad').
Empuja tu rama (git push origin feature/nueva-funcionalidad).
Abre un Pull Request.

## Recursos

### Colección de Postman

Hemos incluido una colección de Postman para facilitar la prueba de los endpoints de nuestra API.

#### Importar la Colección en Postman

1. Abre Postman.
2. Haz clic en **Import** en la parte superior izquierda.
3. Selecciona el archivo `HackathonFinal.postman_collection.json` que se encuentra en la carpeta `resources` de este repositorio.
4. La colección aparecerá en tu lista de colecciones y podrás utilizarla para probar los diferentes endpoints de la API.

### Endpoints Disponibles

- **Registro de Usuario**
  - **Método**: POST
  - **URL**: `/api/users/register`
  - **Cuerpo**:
    ```json
    {
      "username": "testuser",
      "password": "password123"
    }
    ```

- **Inicio de Sesión**
  - **Método**: POST
  - **URL**: `/api/users/login`
  - **Cuerpo**:
    ```json
    {
      "username": "testuser",
      "password": "password123"
    }
    ```

- **Obtener Productos**
  - **Método**: GET
  - **URL**: `/api/products`

- **Crear Producto**
  - **Método**: POST
  - **URL**: `/api/products`
  - **Cuerpo**:
    ```json
    {
      "name": "Producto",
      "description": "Descripción",
      "price": 1000,
      "category": "Categoría",
      "stock": 10
    }
    ```

- **Más Endpoints**: Detalles de otros endpoints disponibles en la API.