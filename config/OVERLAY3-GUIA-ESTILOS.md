# Guía de Configuración de Estilos - Overlay 3

## 📋 Descripción

El archivo `overlay3-config.json` contiene toda la configuración visual del Overlay 3. Este archivo te permite personalizar cada aspecto del diseño sin necesidad de editar el código HTML/SVG directamente. **Los cambios se aplican automáticamente** al recargar el overlay en el navegador.

## 🎨 Componentes Configurables

### 1. **Grupos (A-L)**
- **Headers**: Color de fondo, color cuando está destacado, texto
- **Celdas**: Fondo, bordes, espaciado
- **Texto de equipos**: Color, tamaño, fuente
- **Banderas**: Dimensiones, bordes redondeados

### 2. **Bombo**
- **Título**: Fondo, color de texto, tamaño de fuente
- **Área de contenido**: Fondo, bordes, espaciado
- **Equipos**: Colores normales y destacados
- **Recuadro de destacado**: Color dorado, opacidad, tamaño
- **Equipos asignados**: Estilos en gris para equipos ya usados

### 3. **Pantalla de Carga**
- Texto, spinner, barra de progreso
- Colores y tamaños personalizables

### 4. **Animaciones**
- Duración de transiciones
- Efectos de fade entre bombos
- Aparición de nuevos equipos

### 5. **Colores Generales**
- Paleta de colores del proyecto
- Dorado, negro, blanco, grises

## 📝 Cómo Editar el Archivo

### Formato de Colores
```javascript
color: "#AA8112"     // Formato hexadecimal
color: "rgba(0, 0, 0, 0.9)"  // RGBA con transparencia
```

### Tamaños
```javascript
tamaño: 16           // Números sin comillas (píxeles)
ancho: "100px"       // Texto con comillas cuando incluye unidad
```

### Duraciones
```javascript
duracion: "0.4s"     // Segundos (con comillas)
duracion: 800        // Milisegundos (sin comillas)
```

## 🔍 Ejemplos de Personalización

### Cambiar el color dorado del destacado
```javascript
bombo: {
  destacado: {
    colorFondo: "#FFD700",  // Cambiar de dorado oscuro a dorado brillante
  }
}
```

### Hacer el texto de grupos más grande
```javascript
grupos: {
  header: {
    tamaño: 18,  // Cambiar de 14 a 18
  }
}
```

### Cambiar el fondo del bombo
```javascript
bombo: {
  areaContenido: {
    colorFondo: "#f5f5f5",  // Cambiar a gris más claro
  }
}
```

### Ajustar el tamaño de las banderas
```javascript
grupos: {
  celdas: {
    bandera: {
      ancho: 60,    // Más ancho
      alto: 40      // Más alto
    }
  }
}
```

## ⚙️ Cómo Usar el Sistema de Configuración

**¡El sistema de configuración es totalmente automático!** Los cambios que hagas en `overlay3-config.json` se aplican al recargar el overlay.

### Para aplicar cambios:

1. **Abre** el archivo `config/overlay3-config.json`
2. **Edita** los valores que quieras cambiar (colores, tamaños, etc.)
3. **Guarda** el archivo
4. **Recarga** la página `overlay3.html` en tu navegador (F5 o Ctrl+R)
5. ✅ **¡Listo!** Los cambios se aplicarán automáticamente

**No necesitas editar el código HTML ni reiniciar el servidor.**

### Sistema Técnico

Detrás de escenas, `overlay3.html` carga el archivo de configuración automáticamente al inicio:
- El servidor sirve el archivo JSON en el endpoint `/config/overlay3`
- El overlay lo carga con `fetch()` al arrancar
- La función `applyOverlayConfig()` aplica los estilos a los elementos SVG
- Si el archivo no se puede cargar, se usan valores por defecto

## 📊 Secciones del Archivo

| Sección | Descripción |
|---------|-------------|
| `grupos` | Estilos de los 12 grupos (A-L) |
| `bombo` | Estilos del área de bombo/pote |
| `pantallaCarga` | Pantalla de carga inicial |
| `animaciones` | Duraciones y efectos de transición |
| `coloresGenerales` | Paleta de colores del proyecto |
| `fuentes` | Configuración tipográfica |
| `canvas` | Dimensiones de pantalla (1920x1080) |

## 🎯 Valores Clave

### Colores Principales
- **Negro**: `#000000` - Headers y textos principales
- **Blanco**: `#ffffff` - Textos en fondos oscuros
- **Dorado**: `#AA8112` - Destacados y selecciones
- **Gris claro**: `#e8e8e8` - Fondo del bombo
- **Gris oscuro**: `#888888` - Equipos asignados

### Tamaños de Fuente
- **Títulos de grupo**: 14px
- **Texto de equipos**: 16px
- **Títulos de bombo**: 16px

### Animaciones
- **Fade bombo**: 0.4s
- **Aparición equipo**: 800ms
- **Transición SVG**: 0.8s

## 💡 Consejos

1. **Haz copia de seguridad** antes de hacer cambios grandes
2. **Prueba un cambio a la vez** para ver el efecto
3. **Mantén la coherencia** entre colores relacionados
4. **Respeta las proporciones** al cambiar tamaños

## 🆘 Soporte

Si necesitas ayuda para:
- Integrar automáticamente este archivo en el overlay
- Crear una interfaz visual para editar estos valores
- Añadir nuevas opciones de configuración

Solo pregunta y se puede implementar.
