# CampoPro — App de reservas de campos deportivos

## 1. Descripción general del proyecto

CampoPro es una aplicación móvil desarrollada con React Native y Expo para gestionar reservas de campos deportivos.

La aplicación está pensada como una solución tipo SaaS para dueños de complejos deportivos. El objetivo es permitir que los negocios puedan administrar sus sedes, campos, empleados, reservas, mantenimientos, pagos simulados y reportes desde una sola app.

## 2. Objetivo principal

Desarrollar una aplicación móvil funcional que permita reservar campos deportivos y gestionar la operación básica de un negocio deportivo mediante distintos perfiles de usuario.


- Estado global gestionado con Redux.
- Conexión a base de datos en la nube mediante Firebase.
- Autenticación de usuarios.
- Acceso a una capacidad nativa del dispositivo.
- Gestión del proyecto mediante Trello.
- Código versionado con Git/GitHub.

## 3. Roles de usuario

La aplicación tendrá cuatro perfiles principales:

### Administrador

Es el responsable general de la plataforma CampoPro.

Funciones principales:

- Ver negocios registrados.
- Ver planes contratados.
- Activar o desactivar negocios.
- Consultar pagos simulados de suscripción.
- Ver estadísticas globales básicas.

### Dueño

Es el propietario de un negocio deportivo.

Funciones principales:

- Crear y gestionar su negocio.
- Gestionar sedes.
- Gestionar campos deportivos.
- Vincular empleados.
- Ver reservas.
- Crear mantenimientos.
- Consultar reportes básicos.
- Ver el estado de su plan.

### Empleado

Es un usuario vinculado por un dueño a un negocio concreto.

Funciones principales:

- Ver reservas del día.
- Crear reservas manuales.
- Confirmar pagos en local.
- Cancelar reservas.
- Consultar disponibilidad de campos.

### Cliente

Es el usuario que reserva campos deportivos.

Funciones principales:

- Registrarse e iniciar sesión.
- Buscar campos deportivos.
- Ver detalles de un campo.
- Seleccionar fecha y hora.
- Realizar pago simulado.
- Consultar sus reservas.
- Cancelar reservas cuando sea posible.

## 4. Gestión de roles y perfiles

Todos los usuarios se registran inicialmente como cliente.

Después, un usuario puede tener más perfiles asociados:

- Puede convertirse en dueño si crea un negocio y selecciona un plan.
- Puede convertirse en empleado si un dueño lo vincula mediante su correo.
- Puede seguir usando la app como cliente aunque también sea dueño o empleado.

La app tendrá una pantalla de selección de perfil después del login.

Ejemplo:

Un usuario llamado Josue puede tener estos perfiles:

- Cliente
- Dueño de Canchas Josue FC

Si Jacinto quiere reservar en otro negocio, entra como cliente.  
Si quiere administrar su negocio, entra como dueño.

## 5. Planes de suscripción simulados

La app tendrá tres planes:

### Plan Básico — 29 €/mes

Incluye:

- 1 sede.
- 1 campo.
- Hasta 2 empleados.
- Reporte simple.
- Reservas básicas.

### Plan Pro — 59 €/mes

Incluye:

- Hasta 2 sedes.
- Hasta 4 campos.
- Hasta 10 empleados.
- Reportes avanzados.
- Bloqueo por mantenimiento.

### Plan Premium — 99 €/mes

Incluye:

- Sedes ilimitadas.
- Campos ilimitados.
- Empleados ilimitados.
- Reportes completos.
- Soporte prioritario simulado.

## 6. Funcionalidades principales

La versión final del proyecto incluirá:

- Registro de usuarios.
- Login con Firebase Authentication.
- Selección de perfil activo.
- Navegación principal orientada a iOS.
- Gestión de campos deportivos.
- Gestión de reservas.
- Pago simulado.
- Gestión de empleados.
- Gestión de mantenimiento.
- Reportes básicos.
- Panel administrador.
- Persistencia local.
- Notificación local de reserva.

## 7. Firebase

Firebase se usará para:

- Authentication.
- Firestore Database.
- Guardar usuarios.
- Guardar negocios.
- Guardar planes.
- Guardar sedes.
- Guardar campos.
- Guardar reservas.
- Guardar pagos simulados.
- Guardar mantenimientos.
- Guardar empleados vinculados.

## 8. Redux

Redux se usará para gestionar el estado global de la app.

Se almacenará:

- Usuario autenticado.
- Perfil activo.
- Negocio activo.
- Campos cargados.
- Reservas cargadas.
- Estado de carga.
- Datos temporales de una reserva.

## 9. Capacidad nativa

Como capacidad nativa se implementarán notificaciones locales.

La idea es que, cuando un cliente confirme una reserva, la aplicación pueda crear una notificación local de recordatorio.

Ejemplo:

"Recuerda tu reserva en Fútbol 7 hoy a las 20:00."

## 10. Persistencia local

Se usará almacenamiento local para guardar información sencilla en el dispositivo, como:

- Último perfil activo.
- Preferencia básica de sesión.
- Datos recientes no críticos.

## 11. Funcionalidades simuladas

Por alcance del proyecto, algunas funcionalidades serán simuladas:

- Pago de reservas.
- Pago de suscripción mensual.
- Soporte prioritario.
- Estados de facturación.
- Reportes avanzados.

Aunque sean simuladas, se guardarán en Firebase para demostrar la lógica de negocio.

## 12. Alcance final esperado

Al finalizar el proyecto, la app deberá permitir demostrar:

1. Registro e inicio de sesión.
2. Selección de perfil.
3. Reserva de un campo deportivo.
4. Pago simulado.
5. Reserva guardada en Firebase.
6. Panel de dueño.
7. Panel de empleado.
8. Panel de administrador.
9. Estado global con Redux.
10. Capacidad nativa mediante notificaciones.
11. Persistencia local.
12. Trello organizado con 40 horas.
13. Commits claros en GitHub.

## 13. Nombre del proyecto

Nombre de la app:

CampoPro
