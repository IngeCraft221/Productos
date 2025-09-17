// Usando SweetAlert2 para mejores alertas
// Incluye en tu HTML: <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

const spinner = document.getElementById('loadingSpinner');

async function cargarProductos() {
    spinner.style.display = 'block';
    try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Error al cargar productos');

        const productos = await response.json();
        const container = document.getElementById('productosContainer');
        container.innerHTML = '';

        if (productos.length === 0) {
            container.innerHTML = `<p style="text-align:center; color:#555; margin-top:20px;">No hay productos disponibles.</p>`;
            return;
        }

        productos.forEach(p => {
            const div = document.createElement('div');
            div.className = 'producto';

            // Imagen
            const img = document.createElement('img');
            img.src = (p.images && p.images.length > 0 && p.images[0].url)
                ? p.images[0].url
                : 'https://via.placeholder.com/140';
            img.alt = p.nombre;
            div.appendChild(img);

            // Botones de acción
            const actionDiv = document.createElement('div');
            actionDiv.className = 'action-buttons';
            actionDiv.innerHTML = `
                <button class="edit-btn" title="Editar" onclick="editarProducto(${p.id})"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="delete-btn" title="Eliminar" onclick="eliminarProducto(${p.id})"><i class="fa-solid fa-trash"></i></button>
            `;
            div.appendChild(actionDiv);

            // Información
            const info = document.createElement('div');
            info.className = 'producto-info';
            info.innerHTML = `
                <span><strong>${p.nombre}</strong></span>
                <span>${p.descripcion}</span>
                <span class="precio">$${p.precio}</span>
                <span>ID: ${p.id}</span>
            `;
            div.appendChild(info);

            container.appendChild(div);
        });
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al cargar productos: ' + error.message,
            confirmButtonColor: '#0077ff'
        });
    } finally {
        spinner.style.display = 'none';
    }
}

// Eliminar producto
async function eliminarProducto(id) {
    const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0077ff',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });

    if (!result.isConfirmed) return;

    try {
        const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });
        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Eliminado',
                text: 'Producto eliminado con éxito',
                timer: 1500,
                showConfirmButton: false
            });
            cargarProductos();
        } else {
            const errorText = await response.text();
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al eliminar producto: ' + errorText
            });
        }
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al eliminar producto: ' + error.message
        });
    }
}

// Editar producto (redireccionar a agregar.html con id en query)
function editarProducto(id) {
    window.location.href = `agregar.html?id=${id}`;
}

// Cargar productos al iniciar
cargarProductos();
