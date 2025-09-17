// Obtener id del query string
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Spinner
const spinner = document.createElement('div');
spinner.className = 'spinner';
spinner.style.display = 'none';
spinner.style.position = 'fixed';
spinner.style.top = '50%';
spinner.style.left = '50%';
spinner.style.transform = 'translate(-50%, -50%)';
spinner.style.border = '8px solid #f3f3f3';
spinner.style.borderTop = '8px solid #0077ff';
spinner.style.borderRadius = '50%';
spinner.style.width = '60px';
spinner.style.height = '60px';
spinner.style.animation = 'spin 1s linear infinite';
spinner.style.zIndex = '1000';
document.body.appendChild(spinner);

// Animación spin
const style = document.createElement('style');
style.textContent = `
@keyframes spin {
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg);}
}
`;
document.head.appendChild(style);

// URL base de la API
const API_BASE = 'http://localhost:5260/api/products';

// Si es edición, cargar producto
if (productId) {
    cargarProductoParaEditar(productId);
}

// Función para cargar datos del producto
async function cargarProductoParaEditar(id) {
    try {
        spinner.style.display = 'block';
        const response = await fetch(`${API_BASE}/${id}`);
        if (!response.ok) throw new Error('No se pudo cargar el producto');

        const producto = await response.json();
        document.getElementById('nombre').value = producto.nombre;
        document.getElementById('descripcion').value = producto.descripcion;
        document.getElementById('precio').value = producto.precio;
        document.getElementById('imagenUrl').value = (producto.images && producto.images[0]) ? producto.images[0].url : '';
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron cargar los datos: ' + error.message,
            confirmButtonColor: '#0077ff'
        });
    } finally {
        spinner.style.display = 'none';
    }
}

// Función agregar o actualizar producto
async function agregarProducto() {
    const nombre = document.getElementById('nombre').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();
    const precio = parseFloat(document.getElementById('precio').value);
    const url = document.getElementById('imagenUrl').value.trim();

    // Validación
    if (!nombre || !descripcion || isNaN(precio) || precio <= 0) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Completa todos los campos correctamente.',
            confirmButtonColor: '#0077ff'
        });
        return;
    }

    // Objeto para enviar al backend
    const nuevoProducto = {
        nombre,
        descripcion,
        precio,
        images: url ? [{ fileName: nombre, url }] : []
    };

    try {
        spinner.style.display = 'block';
        const endpoint = productId ? `${API_BASE}/${productId}` : API_BASE;
        const method = productId ? 'PUT' : 'POST';

        // Envío al backend
        const response = await fetch(endpoint, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoProducto)
        });

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: productId ? 'Producto actualizado con éxito!' : 'Producto agregado con éxito!',
                confirmButtonColor: '#0077ff'
            }).then(() => window.location.href = 'index.html');
        } else {
            const errorText = await response.text();
            console.error('Error backend:', errorText);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al guardar producto: ' + errorText,
                confirmButtonColor: '#0077ff'
            });
        }
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al guardar producto: ' + error.message,
            confirmButtonColor: '#0077ff'
        });
    } finally {
        spinner.style.display = 'none';
    }
}

// Validación en tiempo real del precio
document.getElementById('precio').addEventListener('input', e => {
    const value = parseFloat(e.target.value);
    e.target.style.borderColor = (isNaN(value) || value <= 0) ? 'red' : '#0077ff';
});
