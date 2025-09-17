namespace Productos.Domain.Entities;

public class Product
{
    public int Id { get; set; } // PK
    public string Nombre { get; set; } = null!;
    public string Descripcion { get; set; } = string.Empty;
    public decimal Precio { get; set; }
    public DateTime FechaCreacion { get; set; } = DateTime.UtcNow;
    public bool Estado { get; set; } = true;

    // Relación con imágenes
    public ICollection<ProductImage>? Images { get; set; }
}
