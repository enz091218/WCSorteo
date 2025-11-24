# Guía de Configuración de Estilos - Overlay 3

## 📋 Descripción

El archivo `overlay3-config.js` contiene toda la configuración visual del Overlay 3. Este archivo te permite personalizar cada aspecto del diseño sin necesidad de editar el código HTML/SVG directamente.

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

## ⚙️ Integración con Overlay 3

**NOTA IMPORTANTE**: Actualmente este archivo es una **referencia de documentación**. Los estilos están definidos directamente en `overlay3.html`.

### Para aplicar cambios:

1. **Opción 1 - Manual**: 
   - Edita este archivo con tus valores preferidos
   - Copia los valores correspondientes a `overlay3.html` manualmente
   - Busca las secciones relevantes en el código HTML/SVG

2. **Opción 2 - Integración automática** (requiere desarrollo adicional):
   - Solicita que se integre este archivo de configuración
   - Se creará un sistema que lea estos valores automáticamente
   - Los cambios se aplicarán sin editar el HTML

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
