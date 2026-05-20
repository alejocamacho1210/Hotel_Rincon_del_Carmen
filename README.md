# Hotel El Rincón del Carmen 🏨

Sistema web de reservas hoteleras desarrollado con **HTML, CSS y JavaScript puro**, enfocado en la gestión de habitaciones, reservas y administración interna del hotel.

---

# ✨ Características principales

## 👤 Sistema de usuarios
- Registro de clientes
- Inicio de sesión
- Persistencia de sesión con `sessionStorage`
- Roles de usuario:
  - Cliente
  - Administrador

---

## 🛏️ Sistema de habitaciones
- Visualización dinámica de habitaciones
- Información detallada:
  - descripción
  - servicios
  - capacidades
  - ubicación
  - precio
- Filtro por:
  - fecha check in
  - fecha check out
  - cantidad de personas

---

## 📅 Sistema de reservas
- Validación de disponibilidad
- Cálculo automático de noches
- Cálculo automático del total a pagar
- Persistencia de reservas con `localStorage`
- Cancelación de reservas
- Panel de reservas del cliente

---

## 👨‍💼 Panel administrativo

El administrador puede:

- Editar habitaciones
- Cambiar:
  - precio
  - disponibilidad
  - descripción
  - capacidades
  - ubicación
  - servicios
- Gestionar reservas
- Cancelar reservas
- Visualizar estadísticas generales

---

# 🔐 Usuario administrador

El sistema crea automáticamente un administrador al iniciar el proyecto por primera vez.

## Credenciales:

```txt
Nombre: Juan Arias
Documento: 1097489524
Contraseña: Juanda.2210
```

---

# 🧠 Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript Vanilla
- LocalStorage
- SessionStorage

---

# 📂 Estructura del proyecto

```txt
src/
│
├── css/
│   ├── base.css
│   ├── layout.css
│   └── elements.css
│
├── data/
│   └── disponibilidad.json
│
├── html/
│   ├── pag-01.html
│   ├── pag-02.html
│   ├── pag-03.html
│   ├── registro.html
│   ├── irAPagar.html
│   └── admin.html
│
├── images/
│
└── js/
    ├── admin.js
    ├── initRooms.js
    ├── leerInputs.js
    ├── pago.js
    ├── registro.js
    ├── usuarios.js
    ├── Webcomponent_pag-01.js
    ├── Webcomponent_pag-02.js
    └── Webcomponent_pag-03.js
```

---

# ⚙️ Funcionamiento general

## 1. Inicialización de habitaciones

Las habitaciones se cargan desde `disponibilidad.json` y se almacenan automáticamente en `localStorage`.

---

## 2. Flujo de reserva

### Cliente no autenticado

1. Selecciona habitación
2. Se redirige a `registro.html`
3. Crea cuenta
4. Continúa al pago

---

### Cliente autenticado

1. Selecciona habitación
2. Se redirige directamente a `irAPagar.html`
3. Confirma la reserva

---

# 💾 LocalStorage utilizado

## Habitaciones

```txt
habitaciones
```

## Usuarios

```txt
usuarios
```

## Reservas

```txt
reservas
```

---

# 🧪 Validaciones implementadas

- Fechas inválidas
- Check out menor al check in
- Usuarios duplicados
- Correos duplicados
- Disponibilidad de habitaciones
- Verificación de sesión activa

---

# 🎨 Diseño

El proyecto utiliza una interfaz moderna inspirada en:
- Airbnb
- Booking
- Hoteles de lujo

Incluye:
- tarjetas dinámicas
- modales
- diseño elegante
- gradientes
- efectos visuales modernos

---

# 🚀 Próximas mejoras

- Backend real
- Base de datos
- Pasarela de pagos
- Recuperación de contraseña
- Correos automáticos
- Dashboard avanzado
- Calendario de disponibilidad
- Responsive completo
- API REST

---

# 📸 Capturas

- Página principal
- Sistema de reservas
- Panel administrativo
- Panel de cliente
- Pago de habitación

---

# 👨‍💻 Autor

Proyecto desarrollado por:

```txt
Juan David Arias Patiño
Alejandro Camacho Becerra
```

---

# 📄 Licencia

Proyecto académico y educativo.