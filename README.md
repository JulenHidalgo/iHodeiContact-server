# iHodeiContact Server

Servidor backend desarrollado en **Node.js** para la aplicación iHodeiContact.  
Este servidor gestiona toda la lógica relacionada con el apartado de noticias, incluyendo almacenamiento, recuperación y gestión de contenidos multimedia y texto.  
Está diseñado para interactuar con la aplicación móvil en React Native y una extensión de Chrome que permite subir publicaciones.

---

## ⚙️ Configuración necesaria

> Este proyecto requiere un archivo `.env` que no está incluido en el repositorio por razones de seguridad.  
> Este archivo debe ser creado manualmente en la raíz del proyecto.

### 📄 1. Crear archivo `.env`

En la raíz del proyecto, crea un archivo llamado:

```
.env
```

Y añade dentro la siguiente estructura de ejemplo:

```env
DB_HOST=            # Host de la base de datos
DB_PORT=            # Puerto de la base de datos
DB_USER=            # Usuario de la base de datos
DB_PASSWORD=        # Contraseña para acceder a la base de datos
DB_NAME=            # Nombre de la base de datos

GOOGLE_CREDENTIALS= # JSON generado desde Google Cloud Console al crear un perfil OAuth 2.0.
                    # Puedes configurarlo accediendo a:
                    # https://console.cloud.google.com/auth/clients?project=NOMBRE_DEL_PROYECTO
                    # Sustituye NOMBRE_DEL_PROYECTO por el nombre real de tu proyecto en Google Cloud Console.

GOOGLE_TOKEN=       # Token obtenido al ejecutar: node getToken.js
                    # Durante el proceso, accede con el usuario de pruebas que hayas añadido como tester
                    # desde: https://console.cloud.google.com/auth/audience?project=NOMBRE_DEL_PROYECTO
                    # Sustituye NOMBRE_DEL_PROYECTO por el nombre real de tu proyecto en Google Cloud Console.

DRIVE_GENERIC_FOLDER=   # Carpeta genérica en Google Drive para fallback
DRIVE_IMG_FOLDER=       # Carpeta donde se subirán las imágenes
DRIVE_PDF_FOLDER=       # Carpeta donde se subirán los archivos PDF
DRIVE_VID_FOLDER=       # Carpeta donde se subirán los vídeos
```

> Reemplaza cada valor con tus credenciales reales. Mantén el formato de las variables JSON entre comillas dobles correctamente escapadas (`\n` para saltos de línea).

---

## 🚀 Instalación y ejecución

1. Clona este repositorio:

```bash
git clone https://github.com/julenhidalgo/iHodeiContact-server.git
cd iHodeiContact-server
```

2. Instala las dependencias:

```bash
npm install
```

3. Ejecuta el servidor:

```bash
npm start
```

O si usas `nodemon`:

```bash
npm run dev
```

El servidor se iniciará en `http://localhost:3000` (puede variar según el puerto que configures).

---

## 📂 Estructura del proyecto

```
iHodeiContact-server/
├── config/              # Configuración de la base de datos
├── controllers/         # Lógica de negocio para las distintas clases
├── middleware/          # Validaciones y autenticaciones para los archivos
├── models/              # Modelos de datos
├── routes/              # Definición de rutas de la API
├── server.js            # Punto de entrada del servidor
├── token.json           # Token de autenticación de Google (protegido)
└── .env                 # Variables de entorno (no incluido)
```

---

## 🛡️ Seguridad

- No compartas tu archivo `.env` ni `token.json` públicamente.
- Ambos están protegidos en `.gitignore`.

---

¿Dudas? ¿Errores? Contacta con el equipo de **HodeiCloud** o revisa la documentación interna.
