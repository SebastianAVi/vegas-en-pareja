# Vegas en Pareja ♥

App Android (tablet Samsung o celular) para nuestro viaje a Las Vegas.

**Secciones:** Galería (fotos y videos) · Tiendas · Mapa · Eventos · Contactos de emergencia.

## Descargar e instalar el APK

1. En la tablet/celular, abre la página de **Releases** de este repositorio y descarga `VegasEnPareja.apk`.
2. Ábrelo. Si Android lo pide, permite *"Instalar apps desconocidas"* para el navegador o "Mis archivos".
3. Listo: aparece el ícono **Vegas en Pareja**.

Cada vez que se sube un cambio a `main`, GitHub Actions compila un APK nuevo y lo publica en Releases.

## Editar contenido

Todo está en `app/src/main/assets/www/`:

| Qué | Dónde |
|---|---|
| Lugares del mapa y tiendas (lista "VEGAS🎰" de Google Maps) | `js/data.js` → `LUGARES` |
| Eventos | `js/data.js` → `EVENTOS` |
| Contactos de emergencia | `js/data.js` → `CONTACTOS` |
| Fotos y videos | archivos en `media/` + lista en `js/data.js` → `GALERIA` |

Desde la app también se pueden agregar eventos y contactos propios (quedan guardados en el dispositivo).

> El mapa necesita internet (datos o Wi‑Fi) para cargar las calles; el resto funciona sin conexión.
