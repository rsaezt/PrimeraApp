# ⚽ EquipMatch – App de Equipos Favoritos

 Aplicación desarrollada con **Ionic y Angular** para explorar equipos deportivos, agregar favoritos, personalizar el perfil del usuario y utilizar funciones clave sin conexión a internet.

##  Características principales

-  Navegación protegida con Route Guards
-  Consumo de API REST (TheSportsDB) para mostrar equipos
-  Agregado y eliminación de equipos favoritos
-  Persistencia local con `@ionic/storage`
-  Manejo del estado de red (`@capacitor/network`) para controlar acciones
-  Personalización del usuario: nombre, estado y foto
-  Geolocalización con `@capacitor/geolocation`
-  Tema oscuro configurable
-  Feedback visual con `ion-toast` según conectividad

##  Tecnologías utilizadas

- **Ionic Angular**
- **TypeScript**
- **HTML & SCSS**
- **@ionic/storage-angular**
- **@capacitor/geolocation**
- **@capacitor/network**
- **HttpClient (Angular)**

## Pruebas implementadas

**Pruebas unitarias:** ejecutadas con Jasmine y Karma para validar servicios y componentes. Resultado exitoso: 11 especificaciones sin fallos.
  ```bash
  ng test

Pruebas end-to-end (E2E) Implementadas con Cypress para simular el flujo completo del usuario: inicio de sesión, navegación, selección de equipos y perfil.

Para ejecutar las pruebas:
ionic serve      # en una terminal
npx cypress open # en otra terminal

##  Instalación y ejecución

```bash
npm install
ionic serve