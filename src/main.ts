import { Plugin } from 'obsidian';

export default class HeaderModifierPlugin extends Plugin {
    async onload() {
        console.log('Header Modifier Plugin loaded');
        this.addStyle();
    }

    onunload() {
        console.log('Header Modifier Plugin unloaded');
    }

    addStyle() {
        const style = document.createElement('style');
        style.id = 'header-modifier-style';
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
}
