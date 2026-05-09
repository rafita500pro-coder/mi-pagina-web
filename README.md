# StepStyle — Tienda de Zapatos Premium

Sitio web premium para tienda de calzado. Diseño dark luxury con acentos dorados,
animaciones fluidas y experiencia de usuario de nivel agencia.

---

## 📁 Estructura del Proyecto

```
stepstyle/
├── index.html          ← Página principal (todo-en-uno)
├── css/
│   └── styles.css      ← Estilos personalizados + variables + dark mode
├── js/
│   └── main.js         ← Toda la lógica JS (cursor, FAQ, form, counters…)
└── images/             ← (opcional) imágenes locales
```

---

## 🚀 Cómo Ejecutar

### Opción 1 — Abrir directamente (sin servidor)
Abre `index.html` con doble clic en el explorador de archivos.
Funciona en Chrome, Firefox, Edge y Safari.

> Las fuentes de Google y Remixicon necesitan conexión a internet la primera vez.

### Opción 2 — Servidor local (recomendado para desarrollo)

**Con Python (ya incluido en Mac/Linux):**
```bash
cd stepstyle
python3 -m http.server 3000
# → http://localhost:3000
```

**Con Node.js:**
```bash
npx serve .
# → http://localhost:3000
```

**Con VS Code:**
Instala la extensión "Live Server" y haz clic en "Go Live".

---

## 🎨 Cómo Personalizar

### Colores
Edita las variables en `css/styles.css` (líneas 10–25):
```css
:root {
  --brand-gold:     #C9A96E;   /* ← Color principal dorado */
  --brand-gold-lt:  #E8D5B0;   /* ← Versión clara del dorado */
  --brand-dark:     #0D0D0D;   /* ← Fondo oscuro */
  --brand-charcoal: #1A1A1A;   /* ← Fondo tarjetas */
}
```

### Textos e información
Todo el contenido está en `index.html`. Busca y reemplaza:
- `StepStyle` → nombre de tu negocio
- `hola@stepstyle.com` → tu email real
- `+52 (55) 1234-5678` → tu teléfono real
- `wa.me/525512345678` → tu número de WhatsApp real
- `Av. Insurgentes Sur 1765…` → tu dirección real

### Imágenes de productos
Las imágenes vienen de Unsplash (gratuitas). Para cambiarlas:
1. Busca en https://unsplash.com
2. Obtén el enlace directo de la imagen
3. Reemplaza el `src` en cada `<img>` de los productos

Para imágenes locales:
```html
<!-- Antes -->
<img src="https://images.unsplash.com/...">

<!-- Después -->
<img src="images/mi-zapato.jpg">
```

### Número de WhatsApp
En `index.html`, busca el botón de WhatsApp y reemplaza:
```html
href="https://wa.me/TU_NUMERO?text=Mensaje%20de%20bienvenida"
```
Ejemplo: `wa.me/5215512345678` (código de país + número sin espacios ni guiones)

### Productos
Copia el bloque de cualquier `<article class="product-card">` y modifica:
- `src` de la imagen
- `data-category` (sport, formal, casual, limited)
- Nombre del producto en `<h3 class="product-name">`
- Precio en `<span class="product-price">`
- Colores en los `.color-dot`

### Fuentes
Para cambiar la fuente display (títulos):
1. Ve a https://fonts.google.com y elige una fuente serif elegante
2. Reemplaza el link de Google Fonts en `<head>`
3. Cambia `var(--font-display)` en el CSS

---

## 📦 Tecnologías utilizadas

| Tecnología | Versión | Uso |
|---|---|---|
| HTML5 | — | Estructura semántica |
| CSS3 | — | Estilos, animaciones, variables |
| JavaScript ES6+ | — | Interactividad |
| Tailwind CSS | CDN v3 | Utilidades de layout y spacing |
| Remixicon | 4.2.0 | Iconografía |
| Google Fonts | — | Fuentes premium |
| Unsplash | — | Imágenes placeholder |

---

## ✅ Funcionalidades incluidas

- [x] Diseño dark luxury con modo claro/oscuro
- [x] Navbar fija con efecto glassmorphism al scroll
- [x] Cursor personalizado animado
- [x] Hero con parallax sutil
- [x] Filtro de productos por categoría
- [x] Hover "Quick Add" en tarjetas de producto
- [x] Galería con lightbox
- [x] Contadores animados (Intersection Observer)
- [x] Testimonios con avatar real
- [x] Tabla de precios / membresía
- [x] FAQ acordeón animado
- [x] Formulario con validación completa
- [x] Toast notifications
- [x] Botón WhatsApp flotante con pulso
- [x] Menú móvil con animación
- [x] Scroll reveal en todos los elementos
- [x] SEO básico (meta tags, Open Graph)
- [x] Accesibilidad (ARIA labels, roles)
- [x] Scrollbar personalizada
- [x] Footer completo con newsletter

---

## 🔮 Mejoras Futuras Recomendadas

### E-commerce real
- [ ] Integrar **Shopify** o **WooCommerce** como backend
- [ ] Carrito de compras con `localStorage`
- [ ] Sistema de pagos con Stripe o MercadoPago
- [ ] Gestión de inventario y tallas

### Funcionalidad avanzada
- [ ] Buscador de productos con filtros avanzados
- [ ] Página de detalle de producto individual
- [ ] Sistema de reseñas verificadas
- [ ] Wishlist / lista de deseos
- [ ] Comparador de modelos

### Rendimiento
- [ ] Lazy loading con Intersection Observer nativo
- [ ] Imágenes WebP con fallback
- [ ] Service Worker para funcionamiento offline (PWA)
- [ ] Compresión de imágenes con Sharp o ImageMagick
- [ ] CDN para assets estáticos

### Marketing
- [ ] Chat en vivo (Tawk.to o Intercom)
- [ ] Pop-up de descuento de bienvenida
- [ ] Email marketing integration (Mailchimp)
- [ ] Google Analytics 4
- [ ] Facebook Pixel

### Técnico
- [ ] Migrar a React + Next.js para SSR/SSG
- [ ] Backend con Node.js + Express + MySQL
- [ ] Sistema de autenticación de usuarios
- [ ] Panel de administración
- [ ] API REST para productos y pedidos

---

## 🐛 Resolución de Problemas

**Las fuentes no cargan:**
→ Verifica tu conexión a internet. Las fuentes se cargan desde Google Fonts.

**Las imágenes no se ven:**
→ Las imágenes de Unsplash requieren conexión a internet. Para uso offline, descárgalas y colócalas en la carpeta `images/`.

**El cursor personalizado no aparece:**
→ Solo funciona en dispositivos de escritorio con ratón. En móviles se oculta automáticamente.

**El formulario no "envía" realmente:**
→ Es una demo. Para hacerlo funcional conecta con Formspree, EmailJS o tu propio backend:
  - Formspree: cambia `id="contact-form"` por `action="https://formspree.io/f/TU_ID" method="POST"`
  - EmailJS: instala la librería y usa `emailjs.send()`

---

## 📄 Licencia

Este código es libre para uso personal y comercial.
Créditos de imágenes: Unsplash (licencia gratuita).
Iconos: Remixicon (licencia Apache 2.0).
Fuentes: Google Fonts (licencia Open Font).

---

**¿Necesitas ayuda con la personalización?**
Contáctanos en hola@stepstyle.com
