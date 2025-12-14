import { Plugin } from 'obsidian';

export default class HeaderModifierPlugin extends Plugin {
    async onload() {
        console.log('Header Modifier Plugin loaded');
        this.addStyle();
    }

    onunload() {
        console.log('Header Modifier Plugin unloaded');
        const style = document.getElementById('header-modifier-style');
        if (style) style.remove();
    }

    addStyle() {
        const style = document.createElement('style');
        style.id = 'header-modifier-style';
        style.innerHTML = `
            /* Markdown preview headers */
            .markdown-preview-view h1,
            .markdown-preview-view h2,
            .markdown-preview-view h3,
            .markdown-preview-view h4,
            .markdown-preview-view h5,
            .markdown-preview-view h6 {
                font-size: 1em !important;
            }

            /* Editor headers (CodeMirror 6) */
            .cm-header-1,
            .cm-header-2,
            .cm-header-3,
            .cm-header-4,
            .cm-header-5,
            .cm-header-6 {
                font-size: 1em !important;
            }
        `;
        document.head.appendChild(style);
    }
}
