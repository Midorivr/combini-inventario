# Imagenes del sitio

Para que aparezca la mascota de Hikari Market en el sitio:

1. Guarda la imagen de la mascota (fondo transparente, formato PNG idealmente) en esta misma carpeta.
2. Nombra el archivo exactamente: `mascota.png`
3. Recarga la pagina (`http://localhost:3000/`). La mascota deberia reemplazar automaticamente el icono de onigiri que aparece por defecto.

No necesitas tocar nada del codigo: `public/index.html` ya busca la imagen en `img/mascota.png` y si no la encuentra, muestra un icono de reemplazo (para que el sitio nunca se vea roto mientras tanto).

Si mas adelante quieres agregar el logo completo (el que tiene el texto "HIKARI MARKET" dibujado), puedes guardarlo aqui como `logo.png` y decirle a Claude que lo conecte al header.
