# Guía de Configuración para Overlay3

Este proyecto incluye un sistema completo de configuración que te permite personalizar colores, fuentes, márgenes, marcos, sombras y efectos del overlay sin modificar el HTML.

## Archivos Principales

1. **config-overlay3.json** - Archivo de configuración en formato JSON
2. **config-loader.js** - Script que carga y aplica la configuración

## Cómo Usar

### 1. En el HTML (overlay3.html)

Añade estas líneas en la etiqueta `<head>`:

```html
<script src="/config-loader.js"></script>
```

Y antes de cerrar `</body>`, añade:

```html
<script>
  const configLoader = new ConfigLoader('/config-overlay3.json');
  configLoader.load().then(() => {
    configLoader.applyStylesToDocument();
    // Cuando el SVG esté cargado, aplica la configuración SVG
    document.addEventListener('svgLoaded', () => {
      const svg = document.querySelector('svg');
      if (svg) configLoader.applySVGConfiguration(svg);
    });
  });
</script>
```

### 2. Personalizar Colores

En `config-overlay3.json`, edita la sección `colors`:

```json
"colors": {
  "primaryText": "#000000",          // Color del texto principal
  "secondaryText": "#888888",        // Color del texto secundario
  "backgroundColor": "#e8e8e8",      // Color de fondo
  "highlightColor": "#AA8112",       // Color del resaltado de países
  "loadingBackground": "rgba(0, 0, 0, 0.9)",
  "loadingText": "#ffffff",
  "assignedTextColor": "#888888",
  "spinnerBorder": "rgba(255, 255, 255, 0.3)",
  "spinnerBorderTop": "#ffffff"
}
```

### 3. Personalizar Fuentes

En la sección `fonts`:

```json
"fonts": {
  "primary": "'Moderniz', Arial, sans-serif",
  "countryNameSize": "16.05px",
  "bomboTeamSize": "14px",
  "loadingTextSize": "24px",
  "loadingSpinnerSize": "16px",
  "featuredTextSize": "28px"
}
```

### 4. Personalizar Espaciado (Márgenes y Rellenos)

En la sección `spacing`:

```json
"spacing": {
  "flagPadding": "0px",
  "flagBorderRadius": "12px",
  "countryBoxRadius": "8px",
  "loadingMarginBottom": "20px",
  "loadingTopMargin": "20px"
}
```

### 5. Personalizar Bordes y Marcos

En la sección `borders`:

```json
"borders": {
  "flagBorderWidth": "2px",
  "flagBorderColor": "none",
  "spinnerBorderWidth": "4px",
  "spinnerBorderRadius": "50%"
}
```

### 6. Personalizar Sombras

En la sección `shadows`:

```json
"shadows": {
  "countryBoxShadow": "none",
  "flagShadow": "none"
}
```

Ejemplos de sombras:
- `"0 4px 6px rgba(0, 0, 0, 0.1)"` - Sombra suave
- `"0 10px 20px rgba(0, 0, 0, 0.2)"` - Sombra pronunciada

### 7. Personalizar Efectos y Transiciones

En la sección `effects`:

```json
"effects": {
  "assignedOpacity": "0.5",
  "assignedGrayscale": "100%",
  "highlightOpacity": "0.3",
  "fadeTransitionDuration": "0.4s",
  "loadingTransitionDuration": "0.5s",
  "highlightTransitionDuration": "0.3s"
}
```

### 8. Personalizar Dimensiones

En la sección `dimensions`:

```json
"dimensions": {
  "flagWidth": "48px",
  "flagHeight": "32px",
  "countryBoxWidth": "115px",
  "countryBoxHeight": "42px"
}
```

## Ejemplo: Tema Oscuro

```json
{
  "colors": {
    "primaryText": "#ffffff",
    "backgroundColor": "#1a1a1a",
    "highlightColor": "#FFD700",
    "loadingBackground": "rgba(0, 0, 0, 0.95)",
    "loadingText": "#ffffff",
    "assignedTextColor": "#666666"
  }
}
```

## Ejemplo: Tema Corporativo Azul

```json
{
  "colors": {
    "primaryText": "#003366",
    "backgroundColor": "#e6f0ff",
    "highlightColor": "#0066cc",
    "loadingBackground": "rgba(0, 51, 102, 0.9)"
  },
  "fonts": {
    "primary": "'Arial', sans-serif",
    "featuredTextSize": "32px"
  }
}
```

## Pasos para Implementar

1. Copia los dos archivos al directorio raíz del proyecto:
   - `config-overlay3.json`
   - `config-loader.js`

2. Abre `overlay3.html` y añade las referencias en la sección anterior

3. Edita `config-overlay3.json` con tus valores personalizados

4. Recarga la página para ver los cambios aplicados

## Notas Importantes

- Los cambios en `config-overlay3.json` se aplican dinámicamente sin necesidad de recompilar
- Todos los valores deben estar en formato JSON válido
- Los colores pueden ser en formato hex (#RRGGBB) o rgba()
- Las fuentes se heredan del archivo de configuración
- Las transiciones deben estar en formato válido de CSS (ej: "0.3s")

## Funciones Avanzadas

### Cargar configuración personalizada via JavaScript

```javascript
const configLoader = new ConfigLoader();
await configLoader.load();

// Actualizar configuración
configLoader.updateConfig({
  colors: {
    primaryText: "#FF0000"
  }
});

// Aplicar cambios
configLoader.applyStylesToDocument();
```

### Obtener la configuración actual

```javascript
const config = configLoader.getConfig();
console.log(config.colors.highlightColor);
```
