const fs = require('fs');

// Leer el archivo
let content = fs.readFileSync('overlay3_backup_1080p.html', 'utf8');

// Función para escalar un número por 2
function scale(match, num) {
  const scaled = parseFloat(num) * 2;
  return scaled % 1 === 0 ? scaled.toString() : scaled.toFixed(2);
}

// 1. Cambiar viewBox
content = content.replace(/viewBox="0 0 1920 1080"/, 'viewBox="0 0 3840 2160"');

// 2. Cambiar dimensiones del rect principal
content = content.replace(/width="1920" height="1080"/, 'width="3840" height="2160"');

// 3. Escalar tamaños de fuente en CSS
content = content.replace(/font-size:\s*(\d+(?:\.\d+)?)px/g, (match, size) => {
  return `font-size: ${scale(match, size)}px`;
});

// 4. Escalar dimensiones en clipPath
content = content.replace(/(<clipPath[^>]*>[\s\S]*?<rect[^>]*)\bx="(\d+(?:\.\d+)?)"\s+y="(\d+(?:\.\d+)?)"\s+width="(\d+(?:\.\d+)?)"\s+height="(\d+(?:\.\d+)?)"\s+rx="(\d+(?:\.\d+)?)"\s+ry="(\d+(?:\.\d+)?)"/g, 
  (match, prefix, x, y, w, h, rx, ry) => {
    return `${prefix}x="${scale(match, x)}" y="${scale(match, y)}" width="${scale(match, w)}" height="${scale(match, h)}" rx="${scale(match, rx)}" ry="${scale(match, ry)}"`;
  }
);

// 5. Escalar transform="translate(x y)"
content = content.replace(/transform="translate\((\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\)"/g, (match, x, y) => {
  return `transform="translate(${scale(match, x)} ${scale(match, y)})"`;
});

// 6. Escalar atributos x, y, width, height en elementos
content = content.replace(/\bx="(\d+(?:\.\d+)?)"/g, (match, val) => `x="${scale(match, val)}"`);
content = content.replace(/\by="(\d+(?:\.\d+)?)"/g, (match, val) => `y="${scale(match, val)}"`);
content = content.replace(/\bwidth="(\d+(?:\.\d+)?)"/g, (match, val) => `width="${scale(match, val)}"`);
content = content.replace(/\bheight="(\d+(?:\.\d+)?)"/g, (match, val) => `height="${scale(match, val)}"`);
content = content.replace(/\brx="(\d+(?:\.\d+)?)"/g, (match, val) => `rx="${scale(match, val)}"`);
content = content.replace(/\bry="(\d+(?:\.\d+)?)"/g, (match, val) => `ry="${scale(match, val)}"`);

// 7. Escalar stroke-width
content = content.replace(/stroke-width="(\d+(?:\.\d+)?)"/g, (match, val) => `stroke-width="${scale(match, val)}"`);

// 8. Escalar valores en path d="M..." (esto es más complejo)
content = content.replace(/\bd="([^"]+)"/g, (match, pathData) => {
  const scaledPath = pathData.replace(/([-]?\d+(?:\.\d+)?)/g, (numMatch, num) => {
    return scale(numMatch, num);
  });
  return `d="${scaledPath}"`;
});

// 9. Escalar .flag-image dimensions
content = content.replace(/\.flag-image\s*\{[^}]*width:\s*(\d+(?:\.\d+)?)px[^}]*height:\s*(\d+(?:\.\d+)?)px[^}]*\}/g, 
  (match, w, h) => {
    return `.flag-image {\n      width: ${scale(match, w)}px;\n      height: ${scale(match, h)}px;\n    }`;
  }
);

// 10. Escalar border-radius
content = content.replace(/border-radius:\s*(\d+(?:\.\d+)?)px/g, (match, val) => {
  return `border-radius: ${scale(match, val)}px`;
});

// Guardar el archivo escalado
fs.writeFileSync('overlay3.html', content, 'utf8');
console.log('Archivo escalado a 4K exitosamente!');
