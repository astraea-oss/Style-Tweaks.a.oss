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
  default: () => HeaderModifierPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var HeaderModifierPlugin = class extends import_obsidian.Plugin {
  async onload() {
    console.log("Astraea Style Tweaks loaded");
    this.addStyle();
  }
  addStyle() {
    const css = `
      /* Remove font size scaling from headings in preview */
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
      }
      
      /* Remove font size scaling from headings in editor - target the line */
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
      }
      
      /* Also target the header spans */
      .cm-header-1,
      .cm-header-2,
      .cm-header-3,
      .cm-header-4,
      .cm-header-5,
      .cm-header-6 {
        font-size: 1em !important;
      }
      
      /* Add purple highlight color to headings in preview */
      .markdown-preview-view h1,
      .markdown-preview-view h2,
      .markdown-preview-view h3,
      .markdown-preview-view h4,
      .markdown-preview-view h5,
      .markdown-preview-view h6 {
        color: #a882ff !important;
      }
      
      /* Add purple highlight color to headings in editor */
      .cm-line.HyperMD-header-1,
      .cm-line.HyperMD-header-2,
      .cm-line.HyperMD-header-3,
      .cm-line.HyperMD-header-4,
      .cm-line.HyperMD-header-5,
      .cm-line.HyperMD-header-6,
      .cm-header-1,
      .cm-header-2,
      .cm-header-3,
      .cm-header-4,
      .cm-header-5,
      .cm-header-6 {
        color: #a882ff !important;
      }
    `;
    const styleEl = document.createElement("style");
    styleEl.id = "astraea-style-tweaks";
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
  }
  onunload() {
    console.log("Astraea Style Tweaks unloaded");
    const styleEl = document.getElementById("astraea-style-tweaks");
    if (styleEl) {
      styleEl.remove();
    }
  }
};
