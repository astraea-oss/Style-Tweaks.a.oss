import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';

interface AstraeaSettings {
  enabled: boolean;
  headerColor: string;
  linkColor: string;
  headerFont: string;
}

const DEFAULT_SETTINGS: AstraeaSettings = {
  enabled: true,
  headerColor: '#a882ff',
  linkColor: '#7c3aed',
  headerFont: ''
};

export default class AstraeaStyleTweaksPlugin extends Plugin {
  settings: AstraeaSettings;

  async onload() {
    console.log('Astraea Style Tweaks loaded');
    
    // Load settings
    await this.loadSettings();
    
    // Add settings tab
    this.addSettingTab(new AstraeaSettingTab(this.app, this));
    
    // Apply styles if enabled
    if (this.settings.enabled) {
      this.applyStyles();
    }
  }
  
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
  
  applyStyles() {
    // Remove existing styles first
    this.removeStyles();
    
    const { headerColor, linkColor, headerFont } = this.settings;
    
    // Build font-family string with fallback
    const fontFamily = headerFont 
      ? `${headerFont}, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
      : 'inherit';
    
    const css = `
      /* HEADERS - Preview */
      .markdown-preview-view h1,
      .markdown-preview-view h2,
      .markdown-preview-view h3,
      .markdown-preview-view h4,
      .markdown-preview-view h5,
      .markdown-preview-view h6 {
        font-size: 1em !important;
        line-height: 1.5 !important;
        margin-top: 0.5em !important;
        margin-bottom: 0.5em !important;
        padding-top: 0 !important;
        padding-bottom: 0 !important;
        color: ${headerColor} !important;
        font-family: ${fontFamily} !important;
      }
      
      /* HEADERS - Editor (line level) */
      .cm-line.HyperMD-header-1,
      .cm-line.HyperMD-header-2,
      .cm-line.HyperMD-header-3,
      .cm-line.HyperMD-header-4,
      .cm-line.HyperMD-header-5,
      .cm-line.HyperMD-header-6 {
        font-size: 1em !important;
        line-height: 1.5 !important;
        padding-top: 0.25em !important;
        padding-bottom: 0.25em !important;
        color: ${headerColor} !important;
        font-family: ${fontFamily} !important;
      }
      
      /* HEADERS - Editor (span level) */
      .cm-header-1,
      .cm-header-2,
      .cm-header-3,
      .cm-header-4,
      .cm-header-5,
      .cm-header-6 {
        font-size: 1em !important;
        color: ${headerColor} !important;
        font-family: ${fontFamily} !important;
      }
      
      /* TITLE - Inline title at top of note */
      .inline-title {
        color: ${headerColor} !important;
        font-family: ${fontFamily} !important;
      }
      
      /* LINKS - Source mode editor */
      .cm-s-obsidian span.cm-link,
      .cm-s-obsidian span.cm-hmd-internal-link,
      .cm-s-obsidian span.cm-url {
        color: ${linkColor} !important;
      }
      
      /* LINKS - Live Preview mode (aggressive targeting) */
      .markdown-source-view.mod-cm6 .cm-line a,
      .markdown-source-view.mod-cm6 .cm-line a.internal-link,
      .markdown-source-view.mod-cm6 .cm-line a.external-link,
      .markdown-source-view.mod-cm6 a.internal-link,
      .markdown-source-view.mod-cm6 a.external-link,
      .cm-content a.internal-link,
      .cm-content a.external-link,
      .cm-content a,
      .is-live-preview .cm-line a,
      .is-live-preview a.internal-link,
      .is-live-preview a.external-link {
        color: ${linkColor} !important;
      }
      
      /* LINKS - Reading view */
      .markdown-preview-view .internal-link,
      .markdown-preview-view .external-link,
      .markdown-preview-view a.internal-link,
      .markdown-preview-view a.external-link {
        color: ${linkColor} !important;
      }
      
      /* LINKS - Embedded links and popover previews */
      .popover .internal-link,
      .popover .external-link {
        color: ${linkColor} !important;
      }
    `;
    
    // Create and inject style element
    const styleEl = document.createElement('style');
    styleEl.id = 'astraea-style-tweaks';
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
  }
  
  removeStyles() {
    const styleEl = document.getElementById('astraea-style-tweaks');
    if (styleEl) {
      styleEl.remove();
    }
  }
  
  onunload() {
    console.log('Astraea Style Tweaks unloaded');
    this.removeStyles();
  }
}

class AstraeaSettingTab extends PluginSettingTab {
  plugin: AstraeaStyleTweaksPlugin;

  constructor(app: App, plugin: AstraeaStyleTweaksPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();
    
    containerEl.createEl('h2', { text: 'Astraea Style Tweaks Settings' });

    // Enable/Disable Toggle
    new Setting(containerEl)
      .setName('Enable plugin')
      .setDesc('Turn all styling effects on or off')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.enabled)
        .onChange(async (value) => {
          this.plugin.settings.enabled = value;
          await this.plugin.saveSettings();
          
          if (value) {
            this.plugin.applyStyles();
          } else {
            this.plugin.removeStyles();
          }
        }));

    // Headers & Titles Section
    containerEl.createEl('h3', { text: 'Headers & Titles' });

    // Header Color Picker
    new Setting(containerEl)
      .setName('Header & title color')
      .setDesc('Choose a color for all headers (h1-h6) and the note title')
      .addColorPicker(color => color
        .setValue(this.plugin.settings.headerColor)
        .onChange(async (value) => {
          this.plugin.settings.headerColor = value;
          await this.plugin.saveSettings();
          
          if (this.plugin.settings.enabled) {
            this.plugin.applyStyles();
          }
          // Update the text input
          this.display();
        }))
      .addText(text => text
        .setPlaceholder('#a882ff')
        .setValue(this.plugin.settings.headerColor)
        .onChange(async (value) => {
          // Validate hex color
          if (/^#[0-9A-F]{6}$/i.test(value)) {
            this.plugin.settings.headerColor = value;
            await this.plugin.saveSettings();
            
            if (this.plugin.settings.enabled) {
              this.plugin.applyStyles();
            }
          }
        }))
      .addExtraButton(button => button
        .setIcon('reset')
        .setTooltip('Reset to default')
        .onClick(async () => {
          this.plugin.settings.headerColor = DEFAULT_SETTINGS.headerColor;
          await this.plugin.saveSettings();
          if (this.plugin.settings.enabled) {
            this.plugin.applyStyles();
          }
          this.display();
        }));

    // Header Font
    new Setting(containerEl)
      .setName('Header & title font')
      .setDesc('Enter a font name (e.g., "Georgia", "Fira Code"). Leave empty for default.')
      .addText(text => text
        .setPlaceholder('e.g., Georgia')
        .setValue(this.plugin.settings.headerFont)
        .onChange(async (value) => {
          this.plugin.settings.headerFont = value.trim();
          await this.plugin.saveSettings();
          
          if (this.plugin.settings.enabled) {
            this.plugin.applyStyles();
          }
        }))
      .addExtraButton(button => button
        .setIcon('reset')
        .setTooltip('Reset to default')
        .onClick(async () => {
          this.plugin.settings.headerFont = DEFAULT_SETTINGS.headerFont;
          await this.plugin.saveSettings();
          if (this.plugin.settings.enabled) {
            this.plugin.applyStyles();
          }
          this.display();
        }));

    // Links Section
    containerEl.createEl('h3', { text: 'Links' });

    // Link Color Picker
    new Setting(containerEl)
      .setName('Link color')
      .setDesc('Choose a color for all internal and external links')
      .addColorPicker(color => color
        .setValue(this.plugin.settings.linkColor)
        .onChange(async (value) => {
          this.plugin.settings.linkColor = value;
          await this.plugin.saveSettings();
          
          if (this.plugin.settings.enabled) {
            this.plugin.applyStyles();
          }
          // Update the text input
          this.display();
        }))
      .addText(text => text
        .setPlaceholder('#7c3aed')
        .setValue(this.plugin.settings.linkColor)
        .onChange(async (value) => {
          // Validate hex color
          if (/^#[0-9A-F]{6}$/i.test(value)) {
            this.plugin.settings.linkColor = value;
            await this.plugin.saveSettings();
            
            if (this.plugin.settings.enabled) {
              this.plugin.applyStyles();
            }
          }
        }))
      .addExtraButton(button => button
        .setIcon('reset')
        .setTooltip('Reset to default')
        .onClick(async () => {
          this.plugin.settings.linkColor = DEFAULT_SETTINGS.linkColor;
          await this.plugin.saveSettings();
          if (this.plugin.settings.enabled) {
            this.plugin.applyStyles();
          }
          this.display();
        }));

    // Info section
    containerEl.createEl('p', { 
      text: 'Colors must be in hex format (e.g., #a882ff). Changes apply immediately.',
      cls: 'setting-item-description'
    });
  }
}