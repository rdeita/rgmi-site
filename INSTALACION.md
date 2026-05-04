# 🚀 Guía de Instalación — rgmi.mx

> **Para Rafael**: esta guía está pensada para que cualquier persona —sin conocimientos técnicos— pueda publicar este sitio en `rgmi.mx`. Síguela paso a paso. **Tiempo total estimado: 45 minutos.**

---

## 📋 Qué vas a hacer (resumen)

1. **Crear cuenta en GitHub** (donde vive el código del sitio) — 5 min
2. **Subir el sitio a GitHub** — 10 min
3. **Crear cuenta en Cloudflare y desplegar el sitio** — 10 min
4. **Conectar tu dominio `rgmi.mx` desde Akky** — 10 min
5. **Configurar el formulario de contacto (Web3Forms)** — 5 min
6. **Activar el panel de edición de artículos** — 5 min

Al terminar tendrás:
- Tu sitio en vivo en `https://rgmi.mx`
- Un panel en `https://rgmi.mx/admin` para publicar artículos como si fuera Word
- Formulario de contacto que llega a `rafael@rgmi.mx`
- Costo mensual: **$0** ✅

---

## ANTES DE EMPEZAR — Prepara los archivos

Antes de hacer nada técnico, asegúrate de tener listos estos archivos en la carpeta `rgmi-site/`:

### 1. Tu foto profesional
Guarda la foto que me enviaste como:
```
rgmi-site/assets/rafael-foto.jpg
```
**Tip de optimización**: Si la foto pesa más de 500 KB, comprímela en https://tinyjpg.com (gratis, arrastras y bajas la versión optimizada). Esto hace que el sitio cargue rápido en celulares.

### 2. PDF del Modelo RMI
Ya está en `rgmi-site/assets/modelo-rmi.pdf` — listo. ✅

### 3. Logos
Ya están copiados:
- `assets/escudo-marino.png` (favicon)
- `assets/monograma-marino.png` (footer)
- `assets/monograma-chrome.png` (hero/portada)

---

## PASO 1 · Crear cuenta en GitHub *(5 min)*

GitHub es donde se guarda el código de tu sitio. Es gratuito.

1. Ve a https://github.com/signup
2. Email: `rafael@rgmi.mx` (o el que prefieras)
3. Username: te sugiero algo limpio como `rmartinezdeita` o `rgmi-mx`
4. Verifica el correo
5. Plan: **Free** (suficiente para tu sitio)

✅ **Listo cuando**: Puedes entrar a https://github.com y ver tu perfil.

---

## PASO 2 · Subir el sitio a GitHub *(10 min)*

### 2a. Crear el repositorio

1. Estando logueado en GitHub, haz clic en el botón **"+"** arriba a la derecha → **"New repository"**
2. **Repository name**: `rgmi-site`
3. **Description**: `Sitio web de Rafael Martínez De Ita`
4. **Privacy**: Public *(necesario para que Decap CMS funcione gratis)*
5. **NO marques** "Add a README", "Add .gitignore", ni "Add a license"
6. Botón **"Create repository"**

### 2b. Subir los archivos (sin terminal)

GitHub te mostrará una pantalla con varias opciones. Busca el link **"uploading an existing file"** (en azul).

1. Haz clic en ese link
2. Se abre una pantalla con un área para arrastrar archivos
3. Abre el explorador de Windows y ve a la carpeta `C:\Users\rafam\OneDrive\Documentos\Claude\Code\rgmi-site`
4. Selecciona **TODO** el contenido de la carpeta (Ctrl+A) y **arrástralo** al área de GitHub

> ⚠️ **Importante**: arrastra el *contenido* de la carpeta, no la carpeta completa. Es decir: archivos `index.html`, `css/`, `js/`, `assets/`, etc. directamente.

5. Espera a que suba (puede tardar 1-3 minutos por las imágenes)
6. Abajo, en "Commit changes", deja el mensaje por defecto y haz clic **"Commit changes"**

✅ **Listo cuando**: Ves todos los archivos del sitio listados en tu repo en GitHub.

---

## PASO 3 · Desplegar en Cloudflare Pages *(10 min)*

### 3a. Crear cuenta Cloudflare

1. Ve a https://dash.cloudflare.com/sign-up
2. Email: el mismo que GitHub o cualquiera
3. Verifica el correo

### 3b. Conectar el repo de GitHub

1. En el panel de Cloudflare, busca **"Workers & Pages"** en el menú lateral izquierdo
2. Haz clic en **"Create application"** → pestaña **"Pages"** → **"Connect to Git"**
3. Conecta tu cuenta de GitHub (te pedirá autorizar — di que sí)
4. Selecciona el repositorio **`rgmi-site`**
5. **Begin setup**

### 3c. Configurar el deployment

| Campo | Valor |
|-------|-------|
| **Project name** | `rgmi` (o el que prefieras) |
| **Production branch** | `main` |
| **Framework preset** | `None` |
| **Build command** | *déjalo vacío* |
| **Build output directory** | *déjalo vacío* |

6. Botón **"Save and Deploy"**
7. Espera 1-2 minutos. Cuando aparezca el ✅ verde con "Success", tu sitio ya está vivo en una URL temporal tipo `rgmi.pages.dev`.

✅ **Probá esa URL en tu celular y en tu compu** — debe verse perfecto.

---

## PASO 4 · Conectar `rgmi.mx` (Akky) *(10 min)*

### 4a. Agregar el dominio en Cloudflare

1. En la página de tu proyecto en Cloudflare Pages, ve a la pestaña **"Custom domains"**
2. Botón **"Set up a custom domain"**
3. Escribe **`rgmi.mx`** y haz clic **"Continue"**
4. Cloudflare te mostrará **dos registros DNS** que tienes que copiar a Akky. Se ven así (los valores exactos te los da Cloudflare):

```
Tipo: CNAME
Nombre: rgmi.mx (o @)
Valor: rgmi.pages.dev
```

```
Tipo: CNAME
Nombre: www
Valor: rgmi.pages.dev
```

**Mantén esa pantalla abierta — vas a copiar/pegar de aquí.**

### 4b. Editar DNS en Akky

1. Ve a https://www.akky.mx y haz login con tu cuenta
2. Panel → **"Mis dominios"** → **`rgmi.mx`**
3. Busca la sección **"Administrar DNS"** o **"Zona DNS"** (la ubicación exacta puede variar — busca un menú que mencione "DNS" o "Servidores de nombre")
4. Vas a agregar **dos registros** nuevos:

**Registro 1** (la raíz del dominio):
| Campo | Valor |
|-------|-------|
| Tipo | `CNAME` (si Akky no permite CNAME en raíz, usa `ALIAS` o `ANAME` si está disponible; si solo tienes `A`, ver opción alternativa abajo) |
| Nombre / Host | `@` o vacío (significa la raíz `rgmi.mx`) |
| Valor / Destino | `rgmi.pages.dev` |
| TTL | `3600` (o el que ofrezca por defecto) |

**Registro 2** (el subdominio www):
| Campo | Valor |
|-------|-------|
| Tipo | `CNAME` |
| Nombre / Host | `www` |
| Valor / Destino | `rgmi.pages.dev` |
| TTL | `3600` |

5. **Guardar** o **Aplicar cambios**.

> 🟡 **Si Akky NO permite CNAME en la raíz** (es común en registradores antiguos), usa esta opción alternativa:
>
> En lugar del registro `CNAME` en `@`, agrega **dos registros A** apuntando a las IPs de Cloudflare. Cloudflare las muestra en la misma pantalla donde te dio los CNAME — ábrelas y copia las IPs (suelen ser dos):
>
> ```
> Tipo: A    | Nombre: @    | Valor: [primera IP que te da Cloudflare]
> Tipo: A    | Nombre: @    | Valor: [segunda IP que te da Cloudflare]
> Tipo: CNAME| Nombre: www  | Valor: rgmi.pages.dev
> ```

### 4c. Esperar la propagación

- Vuelve a Cloudflare. En la pestaña **Custom domains** debe aparecer **"Active"** con un check verde junto a `rgmi.mx`.
- **Tiempo de propagación**: usualmente 15-30 minutos. A veces hasta 2 horas. Muy raramente más.
- Mientras esperas, abre `rgmi.mx` en una pestaña en modo incógnito. Cuando funcione → ¡estás vivo!

✅ **Listo cuando**: `https://rgmi.mx` te muestra tu sitio con HTTPS automático (candadito verde en el navegador).

---

## PASO 5 · Configurar el formulario de contacto *(5 min)*

El formulario usa **Web3Forms** — gratuito, sin cuenta, sin tarjeta.

### 5a. Obtener tu Access Key

1. Ve a https://web3forms.com
2. Pega tu correo `rafael@rgmi.mx` en el campo "Get Access Key"
3. Haz clic en **"Create Access Key"**
4. Revisa tu correo — Web3Forms te enviará una clave (un texto largo tipo `a1b2c3d4-e5f6-...`)

### 5b. Pegar la clave en el sitio

1. En GitHub, abre tu repo `rgmi-site`
2. Haz clic en el archivo **`index.html`**
3. Botón del lápiz ✏️ arriba a la derecha (Edit this file)
4. Usa **Ctrl+F** y busca: `REEMPLAZAR_CON_TU_ACCESS_KEY_DE_WEB3FORMS`
5. Reemplázalo por la clave que te llegó al correo
6. Abajo, **"Commit changes"** → mensaje: "Configurar Web3Forms" → Commit

7. Espera ~30 segundos. Cloudflare reconstruye el sitio automáticamente.
8. Prueba el form en `rgmi.mx#contacto` — el mensaje debe llegarte a `rafael@rgmi.mx`.

✅ **Listo cuando**: te llega un correo de prueba a `rafael@rgmi.mx`.

---

## PASO 6 · Activar el panel de artículos `/admin` *(5 min)*

El panel de Decap CMS necesita autorizar GitHub para poder guardar artículos.

### 6a. Configurar la autenticación

1. En GitHub, ve a **Settings** (perfil) → **Developer settings** (al fondo del menú izquierdo) → **OAuth Apps** → **"New OAuth App"**
2. Llena los campos:

| Campo | Valor |
|-------|-------|
| Application name | `RGMI Admin` |
| Homepage URL | `https://rgmi.mx` |
| Authorization callback URL | `https://api.netlify.com/auth/done` |

3. Botón **"Register application"**
4. Vas a ver un **Client ID** (ya visible) y un **Client Secret** (botón "Generate a new client secret"). Copia ambos.

### 6b. Conectar Decap con tu repo

Edita el archivo `admin/config.yml` en GitHub:

1. En tu repo, ve a `admin/config.yml` → ✏️
2. Reemplaza `TU_USUARIO/rgmi-site` con tu usuario real, ej. `rmartinezdeita/rgmi-site`
3. Para la primera vez, **comenta** (o borra) la línea `base_url:` —vamos a usar la versión simple primero. Tu archivo debe verse así:

```yaml
backend:
  name: github
  repo: rmartinezdeita/rgmi-site
  branch: main
  # base_url: https://decap-proxy-rgmi.workers.dev   ← COMENTADO
```

4. Commit changes.

### 6c. Probar el panel

1. Ve a `https://rgmi.mx/admin`
2. Botón **"Login with GitHub"**
3. Te pide autorizar — autoriza
4. ¡Ya estás dentro del panel!
5. Botón **"New Artículo"**, escribe algo, **"Publish"** → en 30 segundos aparece en `rgmi.mx/articulos`.

✅ **Listo cuando**: puedes publicar un artículo desde `/admin` y se ve en `/articulos`.

> 💡 **Si tienes problemas con la autenticación de GitHub**, la solución más limpia es desplegar un pequeño "proxy" en Cloudflare Workers. Es opcional y solo lo necesitas si lo anterior no funciona. Avísame y te paso esos pasos extra (15 min).

---

## ✅ ¡LISTO!

Tu sitio está vivo en **`https://rgmi.mx`** con:
- ✓ Diseño editorial responsive (móvil, tablet, desktop)
- ✓ Bilingüe ES/EN con un clic
- ✓ Formulario de contacto funcional
- ✓ Panel de artículos en `/admin`
- ✓ Aviso de Privacidad LFPDPPP
- ✓ HTTPS automático
- ✓ Costo mensual: $0

---

## 📝 CÓMO PUBLICAR UN ARTÍCULO (uso diario)

1. Ve a `https://rgmi.mx/admin`
2. Login con GitHub
3. **"New Artículo"**
4. Llena:
   - **Título** del artículo
   - **Resumen** (1-2 líneas que enganchen al lector)
   - **Fecha** (la actual)
   - **Categoría** (selecciona de la lista)
   - **Etiquetas** (palabras clave)
   - **Idioma** (Español o English)
   - **Imagen destacada** (opcional, drag-drop)
   - **Contenido**: editor visual tipo Word (negritas, listas, citas, encabezados…)
5. **"Publish"** → en menos de 1 minuto aparece publicado.

Los artículos se indexan automáticamente:
- Aparecen en `rgmi.mx/articulos` con filtros por categoría
- Los últimos 3 aparecen también en la home (`rgmi.mx#articulos`)
- Buscador integrado por título, resumen y etiquetas
- Botón de compartir en LinkedIn, X, correo

---

## 🛠️ EDITAR EL CONTENIDO DEL SITIO (no artículos)

Si quieres cambiar el tagline, una credencial, un caso, etc., los textos están en:
- **`js/i18n.js`** — todos los textos del sitio en ES y EN

Editar ese archivo en GitHub (con el lápiz ✏️) → Commit → en 30 seg aparece actualizado.

> ⚠️ Cuida la sintaxis de comillas y comas. Si te da miedo, dime qué quieres cambiar y lo hago yo.

---

## 🆘 SOPORTE

Si algo no funciona:
1. **Sitio caído**: revisa que GitHub muestre tu último commit y que Cloudflare diga "Success" en su Deployments.
2. **DNS no propaga después de 4h**: revisa en https://www.whatsmydns.net/ que `rgmi.mx` apunte a Cloudflare.
3. **Form no envía**: revisa que la Access Key esté bien pegada en `index.html` (sin espacios extra).
4. **Cualquier otra cosa**: avísame con el mensaje de error y lo resolvemos.

---

## 📁 ESTRUCTURA DE ARCHIVOS (referencia)

```
rgmi-site/
├── index.html                    ← Página principal
├── articulos.html                ← Lista de artículos
├── articulo.html                 ← Lector de artículo individual
├── aviso-privacidad.html         ← Aviso LFPDPPP
├── admin/
│   ├── index.html                ← Panel de edición Decap CMS
│   └── config.yml                ← Configuración del panel
├── assets/
│   ├── escudo-marino.png         ← Favicon + footer
│   ├── monograma-marino.png      ← Logo principal
│   ├── monograma-chrome.png      ← Hero (cromado)
│   ├── modelo-rmi.pdf            ← Descarga del modelo
│   └── rafael-foto.jpg           ← TU FOTO (poner manualmente)
├── content/
│   └── articulos/                ← Aquí Decap guarda los .md
│       └── 2026-05-04-bienvenida.md
├── articulos/
│   └── manifest.json             ← Auto-generado por GitHub Actions
├── css/style.css                 ← Estilos completos
├── js/
│   ├── i18n.js                   ← Traducciones ES/EN
│   ├── main.js                   ← Interacciones
│   └── articulos.js              ← Lógica de artículos
├── .github/workflows/
│   └── update-manifest.yml       ← Auto-actualiza el manifiesto
├── _headers                      ← Caché y seguridad
├── _redirects                    ← Redirecciones
├── robots.txt                    ← SEO
├── sitemap.xml                   ← SEO
└── INSTALACION.md                ← Esta guía
```

---

**Hecho con cuidado para Rafael Martínez De Ita · Mayo 2026**
