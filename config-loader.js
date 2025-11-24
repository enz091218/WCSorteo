class ConfigLoader {
  constructor(configPath = '/config-overlay3.json') {
    this.configPath = configPath;
    this.config = null;
  }

  async load() {
    try {
      const response = await fetch(this.configPath);
      this.config = await response.json();
      return this.config;
    } catch (error) {
      console.error(`Error loading config from ${this.configPath}:`, error);
      return null;
    }
  }

  applyStylesToDocument() {
    if (!this.config) {
      console.error('Config not loaded. Call load() first.');
      return;
    }

    const style = document.createElement('style');
    let css = '';

    const { colors, fonts, spacing, borders, shadows, effects, dimensions } = this.config;

    css += this.generateColorStyles(colors);
    css += this.generateFontStyles(fonts);
    css += this.generateSpacingStyles(spacing);
    css += this.generateBorderStyles(borders);
    css += this.generateShadowStyles(shadows);
    css += this.generateEffectStyles(effects);
    css += this.generateDimensionStyles(dimensions);

    style.textContent = css;
    document.head.appendChild(style);
  }

  generateColorStyles(colors) {
    return `
      :root {
        --primary-text: ${colors.primaryText};
        --secondary-text: ${colors.secondaryText};
        --background-color: ${colors.backgroundColor};
        --highlight-color: ${colors.highlightColor};
        --loading-background: ${colors.loadingBackground};
        --loading-text: ${colors.loadingText};
        --assigned-text: ${colors.assignedTextColor};
        --spinner-border: ${colors.spinnerBorder};
        --spinner-border-top: ${colors.spinnerBorderTop};
      }

      .loading-text { color: ${colors.loadingText}; }
      .loading-spinner {
        border-color: ${colors.spinnerBorder};
        border-top-color: ${colors.spinnerBorderTop};
      }
      #loading-screen { background: ${colors.loadingBackground}; }
      .assigned-text { fill: ${colors.assignedTextColor} !important; }
    `;
  }

  generateFontStyles(fonts) {
    return `
      .loading-text {
        font-family: ${fonts.primary};
        font-size: ${fonts.loadingTextSize};
      }
      .cls-8 {
        font-family: ${fonts.primary};
        font-size: ${fonts.countryNameSize};
      }
      .cls-7 { font-size: ${fonts.bomboTeamSize}; }
      #featured-text-1, #featured-text-2, #featured-text-3 {
        font-family: ${fonts.primary};
        font-size: ${fonts.featuredTextSize};
      }
    `;
  }

  generateSpacingStyles(spacing) {
    return `
      .loading-text { margin-bottom: ${spacing.loadingMarginBottom}; }
      .loading-spinner { margin-top: ${spacing.loadingTopMargin}; }
    `;
  }

  generateBorderStyles(borders) {
    return `
      .loading-spinner {
        border-width: ${borders.spinnerBorderWidth};
        border-radius: ${borders.spinnerBorderRadius};
      }
    `;
  }

  generateShadowStyles(shadows) {
    return `
      /* Custom shadows can be applied here */
    `;
  }

  generateEffectStyles(effects) {
    return `
      .assigned-text { opacity: ${effects.assignedOpacity}; }
      image.assigned-flag {
        filter: grayscale(${effects.assignedGrayscale}) opacity(${effects.assignedOpacity});
      }
      .bombo-container {
        transition: opacity ${effects.fadeTransitionDuration} ease-in-out;
      }
      #loading-screen {
        transition: opacity ${effects.loadingTransitionDuration} ease-in-out, visibility ${effects.loadingTransitionDuration} ease-in-out;
      }
    `;
  }

  generateDimensionStyles(dimensions) {
    return `
      /* Dimensions applied via SVG attributes */
    `;
  }

  applySVGConfiguration(svg) {
    if (!this.config) return;

    const { dimensions, colors, spacing, borders } = this.config;
    const countryHighlights = svg.querySelectorAll('[id^="country-highlight"]');
    const texts = svg.querySelectorAll('[id^="bombo-team"]');
    const images = svg.querySelectorAll('[id^="bombo-flag"]');
    const borders_elements = svg.querySelectorAll('[id^="border-bombo-flag"]');

    countryHighlights.forEach(el => {
      el.setAttribute('fill', colors.highlightColor);
      el.setAttribute('rx', spacing.countryBoxRadius);
      el.setAttribute('ry', spacing.countryBoxRadius);
    });

    texts.forEach(el => {
      el.style.fill = colors.primaryText;
      el.style.fontSize = dimensions.countryBoxHeight;
    });

    images.forEach(el => {
      el.setAttribute('width', dimensions.flagWidth);
      el.setAttribute('height', dimensions.flagHeight);
    });

    borders_elements.forEach(el => {
      el.setAttribute('stroke-width', borders.flagBorderWidth);
      if (borders.flagBorderColor !== 'none') {
        el.setAttribute('stroke', borders.flagBorderColor);
      }
      el.setAttribute('rx', spacing.flagBorderRadius);
      el.setAttribute('ry', spacing.flagBorderRadius);
    });
  }

  getConfig() {
    return this.config;
  }

  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
  }
}

window.ConfigLoader = ConfigLoader;
