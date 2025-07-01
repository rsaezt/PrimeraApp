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

##  Instalación y ejecución

```bash
npm install
ionic serve