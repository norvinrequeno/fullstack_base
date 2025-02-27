## FULLSTACK

Este es un proyecto fullstack con Laravel 11 y React 18 con TypeScript + Vite

## Requerimientos
- Composer
- NODE
- PHP +8.X
- PostgreSQL
- Vite

## Instalación
- Descargar el repositorio: git clone git@github.com:norvinrequeno/fullstack_base.git
- Instalar dependencias de Laravel: composer install 
- Instalar dependencias de React: npm install
- Configurar archivo .env: Copiar .env.example como .env agregar las credenciales del gestor de base de datos variables de entorno; DB_CONNECTION, DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME,y DB_PASSWORD
- Generar la llave de la aplicación: (En la terminal dentro de la carpeta /laravel) php artisan key:generate
- Migración de base de datos: (En la terminal dentro de la carpeta /laravel) php artisan migrate
- Iniciar servicios de React: (En la terminal dentro de la carpeta /react) npx vite 
- Iniciar servicios de Laravel: (En la terminal dentro de la carpeta /laravel) php artisan serve --port=3001 (en el caso de cambiar puerto debe configurarse la variable de entorno en React /react/.env => VITE_API_URL)

