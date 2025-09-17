using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Productos.Domain.Entities;
using Productos.Infrastructure;

namespace Productos.Api.Controllers
{
    [ApiController] // Indica que este es un controlador de API
    [Route("api/[controller]")] // Ruta base: api/products
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        // Constructor: inyecta el DbContext para acceder a la base de datos
        public ProductsController(ApplicationDbContext db)
        {
            _db = db;
        }

        // =====================================
        // GET api/products
        // Devuelve todos los productos con sus imágenes
        // =====================================
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var products = await _db.Products
                                    .Include(p => p.Images) // Incluye la relación de imágenes
                                    .ToListAsync();
            return Ok(products); // Devuelve código 200 con la lista
        }

        // =====================================
        // GET api/products/{id}
        // Devuelve un producto específico por ID
        // =====================================
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var product = await _db.Products
                                   .Include(p => p.Images)
                                   .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
                return NotFound(); // Código 404 si no existe

            return Ok(product); // Código 200 con el producto
        }

        // =====================================
        // GET api/products/ordered-by-price
        // Devuelve todos los productos ordenados por precio
        // =====================================
        [HttpGet("ordered-by-price")]
        public async Task<IActionResult> GetOrdered()
        {
            var products = await _db.Products
                                    .OrderBy(p => p.Precio) // Orden ascendente
                                    .ToListAsync();
            return Ok(products);
        }

        // =====================================
        // POST api/products
        // Crea un nuevo producto
        // =====================================
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Product product)
        {
            // Validación simple
            if (product.Precio <= 0)
                return BadRequest("El precio debe ser mayor a 0");

            _db.Products.Add(product);
            await _db.SaveChangesAsync();

            // Devuelve 201 Created y la URL del nuevo recurso
            return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
        }

        // =====================================
        // PUT api/products/{id}
        // Actualiza un producto existente
        // =====================================
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Product product)
        {
            if (id != product.Id)
                return BadRequest("El ID no coincide");

            _db.Entry(product).State = EntityState.Modified; // Marca como modificado
            await _db.SaveChangesAsync();

            return NoContent(); // Código 204: éxito pero sin contenido
        }

        // =====================================
        // DELETE api/products/{id}
        // Elimina un producto
        // =====================================
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var product = await _db.Products.FindAsync(id);
            if (product == null)
                return NotFound(); // 404 si no existe

            _db.Products.Remove(product);
            await _db.SaveChangesAsync();

            return NoContent(); // 204: eliminado con éxito
        }
    }
}
