// ============================================
// CONFIGURACIÓN DE ESTILOS - OVERLAY 3
// ============================================
// Este archivo permite personalizar todos los aspectos visuales del Overlay 3
// Edita los valores según tus necesidades y guarda el archivo

const overlay3Config = {
  
  // ========== GRUPOS (A-L) ==========
  grupos: {
    // Header (título del grupo: "GRUPO A", etc.)
    header: {
      colorFondo: "#000000",              // Color de fondo del header (negro por defecto)
      colorFondoDestacado: "#AA8112",     // Color cuando el grupo está destacado (dorado)
      colorTexto: "#ffffff",              // Color del texto del título
      tamaño: 14,                         // Tamaño de fuente en px
      fuenteFamilia: "Moderniz",          // Familia de fuente
      bordeRadio: 8,                      // Radio de las esquinas redondeadas
      padding: "10px 20px"                // Espaciado interno
    },
    
    // Celdas de equipos (4 equipos por grupo)
    celdas: {
      colorFondo: "#ffffff",              // Color de fondo de las celdas
      colorBorde: "#000000",              // Color del borde de las celdas
      anchoBorde: 1,                      // Ancho del borde en px
      bordeRadio: 8,                      // Radio de las esquinas
      
      // Texto de nombres de equipos
      textoEquipo: {
        colorTexto: "#000000",            // Color del texto
        tamaño: 16,                       // Tamaño de fuente en px
        fuenteFamilia: "Moderniz"         // Familia de fuente
      },
      
      // Banderas
      bandera: {
        ancho: 51.4,                      // Ancho de la bandera en px
        alto: 34.2,                       // Alto de la bandera en px
        bordeRadio: 12.51,                // Radio de esquinas de la bandera
        bordeColor: "#555555",            // Color del borde (para banderas con fondo blanco)
        bordeAncho: 2                     // Ancho del borde
      }
    }
  },
  
  // ========== BOMBO ==========
  bombo: {
    // Título del bombo ("BOMBO 1", "BOMBO 2", etc.)
    titulo: {
      colorFondo: "#000000",              // Color de fondo del header del bombo
      colorTexto: "#ffffff",              // Color del texto
      tamaño: 16,                         // Tamaño de fuente en px
      fuenteFamilia: "Moderniz"           // Familia de fuente
    },
    
    // Área principal del bombo
    areaContenido: {
      colorFondo: "#e8e8e8",              // Color de fondo del área de equipos
      bordeRadio: 8,                      // Radio de las esquinas
      padding: "15px"                     // Espaciado interno
    },
    
    // Equipos en el bombo
    equipos: {
      // Texto de códigos de país (3 letras)
      texto: {
        colorTexto: "#000000",            // Color del texto normal
        colorTextoDestacado: "#ffffff",   // Color cuando está destacado
        tamaño: 16,                       // Tamaño de fuente en px
        fuenteFamilia: "Moderniz"         // Familia de fuente
      },
      
      // Banderas en el bombo
      bandera: {
        ancho: 48,                        // Ancho de la bandera en px
        alto: 32,                         // Alto de la bandera en px
        bordeRadio: 12,                   // Radio de esquinas
        bordeColor: "#555555",            // Color del borde
        bordeAncho: 2                     // Ancho del borde
      },
      
      // Estilos para equipos ya asignados
      asignado: {
        opacidadTexto: 0.5,               // Opacidad del texto (0-1)
        colorTexto: "#888888",            // Color gris para equipos asignados
        filtroGrayscale: "100%"           // Filtro de grises para la bandera
      }
    },
    
    // Recuadro de destacado (cuando se selecciona un país)
    destacado: {
      colorFondo: "#AA8112",              // Color dorado del recuadro
      opacidad: 0.8,                      // Opacidad del recuadro (0-1)
      bordeRadio: 8,                      // Radio de las esquinas
      ancho: 115,                         // Ancho del recuadro en px
      alto: 42,                           // Alto del recuadro en px
      transicion: "0.3s"                  // Duración de la animación
    }
  },
  
  // ========== PANTALLA DE CARGA ==========
  pantallaCarga: {
    colorFondo: "rgba(0, 0, 0, 0.9)",     // Color de fondo (negro semi-transparente)
    
    // Texto "Cargando transmisión..."
    texto: {
      contenido: "CARGANDO TRANSMISIÓN...", // Texto mostrado
      colorTexto: "#ffffff",              // Color del texto
      tamaño: 24,                         // Tamaño de fuente en px
      fuenteFamilia: "Moderniz"           // Familia de fuente
    },
    
    // Spinner de carga
    spinner: {
      tamaño: 50,                         // Tamaño del spinner en px
      colorBorde: "rgba(255, 255, 255, 0.3)", // Color del borde
      colorBordeSuperior: "#ffffff",      // Color de la parte animada
      anchoBorde: 4                       // Ancho del borde en px
    },
    
    // Porcentaje de progreso
    progreso: {
      colorTexto: "#ffffff",              // Color del texto
      tamaño: 16,                         // Tamaño de fuente en px
      fuenteFamilia: "Moderniz"           // Familia de fuente
    }
  },
  
  // ========== ANIMACIONES ==========
  animaciones: {
    // Fade entre bombos
    fadeBombo: {
      duracion: "0.4s",                   // Duración del fade
      easing: "ease-in-out"               // Tipo de transición
    },
    
    // Aparición de nuevos equipos
    aparicionEquipo: {
      duracion: 800,                      // Duración en milisegundos
      retraso: 100                        // Retraso inicial en ms
    },
    
    // Transición de opacidad del SVG
    transicionSVG: {
      duracion: "0.8s",                   // Duración del fade-in inicial
      easing: "ease-in-out"               // Tipo de transición
    }
  },
  
  // ========== COLORES GENERALES ==========
  coloresGenerales: {
    fondoTransparente: "transparent",     // Fondo del SVG
    negro: "#000000",                     // Negro estándar
    blanco: "#ffffff",                    // Blanco estándar
    dorado: "#AA8112",                    // Dorado oscuro para destacados
    grisClaro: "#e8e8e8",                 // Gris claro para fondos
    grisOscuro: "#888888",                // Gris oscuro para elementos deshabilitados
    bordeGris: "#555555"                  // Gris para bordes
  },
  
  // ========== TIPOGRAFÍA ==========
  fuentes: {
    principal: {
      nombre: "Moderniz",                 // Nombre de la fuente principal
      ruta: "/fuente/Moderniz.otf",       // Ruta al archivo de fuente
      formato: "opentype"                 // Formato del archivo
    },
    respaldo: "Arial, sans-serif"         // Fuente de respaldo si Moderniz no carga
  },
  
  // ========== DIMENSIONES DEL CANVAS ==========
  canvas: {
    ancho: 1920,                          // Ancho del canvas en px
    alto: 1080,                           // Alto del canvas en px
    aspectRatio: "16 / 9"                 // Relación de aspecto
  }
};

// No modifiques esta línea - exporta la configuración
if (typeof module !== 'undefined' && module.exports) {
  module.exports = overlay3Config;
}
