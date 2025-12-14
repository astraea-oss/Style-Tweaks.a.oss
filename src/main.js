"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => AstraeaStyleTweaksPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var DEFAULT_SETTINGS = {
  enabled: true,
  headerColor: "#a882ff",
  linkColor: "#7c3aed",
  headerFont: ""
};
var AstraeaStyleTweaksPlugin = class extends import_obsidian.Plugin {
  async onload() {
    console.log("Astraea Style Tweaks loaded");
    await this.loadSettings();
    this.addSettingTab(new AstraeaSettingTab(this.app, this));
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
    this.removeStyles();
    const { headerColor, linkColor, headerFont } = this.settings;
    const fontFamily = headerFont ? `${headerFont}, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` : "inherit";
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
      
      /* LINKS - Editor view (all link types) */
      .cm-link,
      .cm-hmd-internal-link,
      .cm-url,
      .cm-link-text,
      a.internal-link,
      a.external-link {
        color: ${linkColor} !important;
      }
      
      /* LINKS - Reading view */
      .markdown-preview-view .internal-link,
      .markdown-preview-view .external-link,
      .markdown-preview-view a {
        color: ${linkColor} !important;
      }
      
      /* LINKS - Live preview */
      .is-live-preview .cm-link,
      .is-live-preview .cm-hmd-internal-link,
      .is-live-preview .internal-link {
        color: ${linkColor} !important;
      }
    `;
    const styleEl = document.createElement("style");
    styleEl.id = "astraea-style-tweaks";
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
  }
  removeStyles() {
    const styleEl = document.getElementById("astraea-style-tweaks");
    if (styleEl) {
      styleEl.remove();
    }
  }
  onunload() {
    console.log("Astraea Style Tweaks unloaded");
    this.removeStyles();
  }
};
var AstraeaSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Astraea Style Tweaks Settings" });
    new import_obsidian.Setting(containerEl).setName("Enable plugin").setDesc("Turn all styling effects on or off").addToggle((toggle) => toggle.setValue(this.plugin.settings.enabled).onChange(async (value) => {
      this.plugin.settings.enabled = value;
      await this.plugin.saveSettings();
      if (value) {
        this.plugin.applyStyles();
      } else {
        this.plugin.removeStyles();
      }
    }));
    containerEl.createEl("h3", { text: "Headers & Titles" });
    new import_obsidian.Setting(containerEl).setName("Header & title color").setDesc("Choose a color for all headers (h1-h6) and the note title").addColorPicker((color) => color.setValue(this.plugin.settings.headerColor).onChange(async (value) => {
      this.plugin.settings.headerColor = value;
      await this.plugin.saveSettings();
      if (this.plugin.settings.enabled) {
        this.plugin.applyStyles();
      }
      this.display();
    })).addText((text) => text.setPlaceholder("#a882ff").setValue(this.plugin.settings.headerColor).onChange(async (value) => {
      if (/^#[0-9A-F]{6}$/i.test(value)) {
        this.plugin.settings.headerColor = value;
        await this.plugin.saveSettings();
        if (this.plugin.settings.enabled) {
          this.plugin.applyStyles();
        }
      }
    })).addExtraButton((button) => button.setIcon("reset").setTooltip("Reset to default").onClick(async () => {
      this.plugin.settings.headerColor = DEFAULT_SETTINGS.headerColor;
      await this.plugin.saveSettings();
      if (this.plugin.settings.enabled) {
        this.plugin.applyStyles();
      }
      this.display();
    }));
    new import_obsidian.Setting(containerEl).setName("Header & title font").setDesc('Enter a font name (e.g., "Georgia", "Fira Code"). Leave empty for default.').addText((text) => text.setPlaceholder("e.g., Georgia").setValue(this.plugin.settings.headerFont).onChange(async (value) => {
      this.plugin.settings.headerFont = value.trim();
      await this.plugin.saveSettings();
      if (this.plugin.settings.enabled) {
        this.plugin.applyStyles();
      }
    })).addExtraButton((button) => button.setIcon("reset").setTooltip("Reset to default").onClick(async () => {
      this.plugin.settings.headerFont = DEFAULT_SETTINGS.headerFont;
      await this.plugin.saveSettings();
      if (this.plugin.settings.enabled) {
        this.plugin.applyStyles();
      }
      this.display();
    }));
    containerEl.createEl("h3", { text: "Links" });
    new import_obsidian.Setting(containerEl).setName("Link color").setDesc("Choose a color for all internal and external links").addColorPicker((color) => color.setValue(this.plugin.settings.linkColor).onChange(async (value) => {
      this.plugin.settings.linkColor = value;
      await this.plugin.saveSettings();
      if (this.plugin.settings.enabled) {
        this.plugin.applyStyles();
      }
      this.display();
    })).addText((text) => text.setPlaceholder("#7c3aed").setValue(this.plugin.settings.linkColor).onChange(async (value) => {
      if (/^#[0-9A-F]{6}$/i.test(value)) {
        this.plugin.settings.linkColor = value;
        await this.plugin.saveSettings();
        if (this.plugin.settings.enabled) {
          this.plugin.applyStyles();
        }
      }
    })).addExtraButton((button) => button.setIcon("reset").setTooltip("Reset to default").onClick(async () => {
      this.plugin.settings.linkColor = DEFAULT_SETTINGS.linkColor;
      await this.plugin.saveSettings();
      if (this.plugin.settings.enabled) {
        this.plugin.applyStyles();
      }
      this.display();
    }));
    containerEl.createEl("p", {
      text: "Colors must be in hex format (e.g., #a882ff). Changes apply immediately.",
      cls: "setting-item-description"
    });
  }
};
