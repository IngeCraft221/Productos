using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Productos.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// DbContext (si usas base de datos real)
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Controladores
builder.Services.AddControllers();

// CORS (para permitir frontend en otro puerto)
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Mi API Productos",
        Version = "v1",
        Description = "API para gestionar productos y sus imágenes",
        Contact = new OpenApiContact
        {
            Name = "Brayan Moreno",
            Email = "tuemail@dominio.com"
        }
    });
});

var app = builder.Build();

// Middleware
app.UseCors();

// Habilitar Swagger solo en desarrollo
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Mi API Productos v1");
    });
}

// Servir archivos estáticos (wwwroot)
app.UseDefaultFiles(); // Busca index.html automáticamente
app.UseStaticFiles();

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
