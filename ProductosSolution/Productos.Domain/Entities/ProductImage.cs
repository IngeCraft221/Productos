using System.Text.Json.Serialization;

namespace Productos.Domain.Entities;

public class ProductImage
{
    public int Id { get; set; }                 // PK
    public int ProductId { get; set; }          // FK a Product
    public string FileName { get; set; } = null!;
    public byte[]? Data { get; set; }           // Imagen en binario
    public string? ContentType { get; set; }    // Tipo MIME

    // URL externa de la imagen
    public string? Url { get; set; }

    // Evita ciclos al serializar JSON
    [JsonIgnore]
    public Product? Product { get; set; }
}
