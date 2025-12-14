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
    console.log("Header Modifier Plugin loaded");
    this.addStyle();
  }
  onunload() {
    console.log("Header Modifier Plugin unloaded");
  }
  addStyle() {
    const style = document.createElement("style");
    style.id = "header-modifier-style";
    style.innerHTML = `
            /* All headers have same font size */
            .cm-s-obsidian .cm-header,
            .markdown-preview-view h1,
            .markdown-preview-view h2,
            .markdown-preview-view h3,
            .markdown-preview-view h4,
            .markdown-preview-view h5,
            .markdown-preview-view h6 {
                font-size: 1em !important;
            }
        `;
    document.head.appendChild(style);
  }
};
