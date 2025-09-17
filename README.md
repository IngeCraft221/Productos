# Productos -  C# y .NET

Este proyecto corresponde a la prueba técnica solicitada para evaluar conocimientos en desarrollo de aplicaciones con **C#, .NET, SQL Server y Frontend Web**.

---

## 🎯 Objetivo

Implementar una solución que contemple:

* **Backend (API REST en .NET)** para gestionar productos e imágenes.
* **Frontend Web** que consuma la API y permita interacción con los productos.
* Aplicar buenas prácticas de desarrollo, principios SOLID y código limpio.

---

## 🛠 Tecnologías utilizadas

* **Backend**

  * .NET 6 / .NET 8
  * Entity Framework / Dapper
  * SQL Server
  * Arquitectura MVC
  * xUnit (pruebas unitarias, opcional)

* **Frontend**

  * HTML, CSS, JavaScript
  * Framework opcional: Blazor, Razor Pages, React o Angular
  * Responsive Design

---

## 📌 Requerimientos funcionales

### Backend

* CRUD de **Productos** con los atributos:

  * `Id`
  * `Nombre`
  * `Descripción`
  * `Precio`
  * `FechaCreacion`
  * `Estado`
* CRUD de **Imágenes de Productos**.
* Endpoint adicional: listado de productos ordenados por precio.
* Validaciones y manejo de errores.

### Frontend

* Listar productos desde la API.
* Agregar, editar y eliminar productos.
* Agregar y eliminar imágenes de los productos.
* Mostrar producto con todas sus imágenes.
* Validaciones en formularios (ejemplo: precio > 0, campos obligatorios).

---

```

---

## ⚙️ Instalación y ejecución

### 1. Clonar repositorio

```bash
git clone https://github.com/tuusuario/Productos.git
cd Productos
```

### 2. Backend

1. Configurar la cadena de conexión en `appsettings.json`.
2. Ejecutar migraciones o importar el script `database.sql` en SQL Server.
3. Levantar el proyecto:

```bash
dotnet run --project Backend
```

### 3. Frontend

1. Abrir `index.html` en el navegador **o** usar un servidor local:

```bash
npx live-server Frontend
```

---

## ✅ Criterios de evaluación

* Cumplimiento de funcionalidades.
* Código limpio, modular y organizado.
* Arquitectura en capas.
* Documentación clara (este README y comentarios en el código).
* Uso correcto de Git (commits descriptivos y ordenados).

---

## 👤 Autor

**Brayan Moreno**
Desarrollador Junior con pasión por el código limpio, la resolución de problemas y el aprendizaje continuo.
<img width="1351" height="645" alt="image" src="https://github.com/user-attachments/assets/137aafcb-714a-4325-b129-254d97d3770d" />

<img width="1364" height="592" alt="image" src="https://github.com/user-attachments/assets/414de032-6471-4b75-8216-012b0974012e" />
<img width="1321" height="526" alt="image" src="https://github.com/user-attachments/assets/015b9584-c7ef-4127-928a-6ba85fe27b3c" />
<img width="1361" height="588" alt="image" src="https://github.com/user-attachments/assets/479f92bc-cc15-40ed-88d2-e3d29b4624de" />



