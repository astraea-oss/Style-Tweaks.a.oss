import { AstraeaSettings } from '../settings';

export function buildCSS(settings: AstraeaSettings): string {
    const css: string[] = [];

    // App Styling
    if (settings.generalFont) {
        css.push(`
body {
    --font-text: ${settings.generalFont} !important;
    --font-interface: ${settings.generalFont} !important;
}
        `);
    }

    if (settings.backgroundPrimary) {
        css.push(`
.theme-light, .theme-dark {
    --background-primary: ${settings.backgroundPrimary} !important;
}
        `);
    }

    if (settings.backgroundSecondary) {
        css.push(`
.theme-light, .theme-dark {
    --background-secondary: ${settings.backgroundSecondary} !important;
}
        `);
    }

    if (settings.borderColor) {
        css.push(`
.theme-light, .theme-dark {
    --background-modifier-border: ${settings.borderColor} !important;
}
        `);
    }

    if (settings.highlightColor) {
        css.push(`
::selection {
    background: ${settings.highlightColor} !important;
}
        `);
    }

    if (settings.indentText) {
        css.push(`
/* Indent regular paragraphs, exclude headers and code blocks */
.markdown-source-view.mod-cm6 .cm-line:not(.HyperMD-header):not(.HyperMD-codeblock) {
    padding-left: 1ch;
}

.markdown-preview-view p:not(.HyperMD-header) {
    padding-left: 1ch;
}

.markdown-reading-view p {
    padding-left: 1ch;
}
        `);
    }

    // Headers & Titles
    if (settings.headerTitleColor) {
        css.push(`
.markdown-preview-view h1, .markdown-preview-view h2, .markdown-preview-view h3,
.markdown-preview-view h4, .markdown-preview-view h5, .markdown-preview-view h6,
.markdown-source-view .cm-header {
    color: ${settings.headerTitleColor} !important;
}
        `);
    }

    if (settings.headerTitleFont) {
        css.push(`
.markdown-preview-view h1, .markdown-preview-view h2, .markdown-preview-view h3,
.markdown-preview-view h4, .markdown-preview-view h5, .markdown-preview-view h6,
.markdown-source-view .cm-header {
    font-family: ${settings.headerTitleFont} !important;
}
        `);
    }

    if (settings.headerTitleSize) {
        css.push(`
.markdown-preview-view h1, .markdown-source-view .cm-header-1 { font-size: calc(2em * ${settings.headerTitleSize}) !important; }
.markdown-preview-view h2, .markdown-source-view .cm-header-2 { font-size: calc(1.5em * ${settings.headerTitleSize}) !important; }
.markdown-preview-view h3, .markdown-source-view .cm-header-3 { font-size: calc(1.25em * ${settings.headerTitleSize}) !important; }
.markdown-preview-view h4, .markdown-source-view .cm-header-4 { font-size: calc(1.1em * ${settings.headerTitleSize}) !important; }
.markdown-preview-view h5, .markdown-source-view .cm-header-5 { font-size: calc(1em * ${settings.headerTitleSize}) !important; }
.markdown-preview-view h6, .markdown-source-view .cm-header-6 { font-size: calc(0.9em * ${settings.headerTitleSize}) !important; }
        `);
    }

    if (settings.headerFontWeight) {
        css.push(`
.markdown-preview-view h1, .markdown-preview-view h2, .markdown-preview-view h3,
.markdown-preview-view h4, .markdown-preview-view h5, .markdown-preview-view h6,
.markdown-source-view .cm-header {
    font-weight: ${settings.headerFontWeight} !important;
}
        `);
    }

    // Links
    if (settings.internalLinkColor) {
        css.push(`
.markdown-preview-view .internal-link,
.markdown-source-view .cm-hmd-internal-link {
    color: ${settings.internalLinkColor} !important;
}
        `);
    }

    if (settings.externalLinkColor) {
        css.push(`
.markdown-preview-view a.external-link,
.markdown-source-view .cm-url {
    color: ${settings.externalLinkColor} !important;
}
        `);
    }

    if (!settings.linkUnderline) {
        css.push(`
.markdown-preview-view a,
.markdown-source-view .cm-url,
.markdown-source-view .cm-hmd-internal-link {
    text-decoration: none !important;
}
        `);
    }

    // Code formatting - split inline vs fenced
    if (settings.codeNormalColor) {
        css.push(`
/* Fenced code blocks */
.markdown-preview-view pre > code,
.markdown-source-view .HyperMD-codeblock {
    color: ${settings.codeNormalColor} !important;
}
        `);
    }

    if (settings.backtickFont || settings.backtickBg) {
        css.push(`
/* Inline backticks only */
.markdown-source-view .cm-inline-code,
.markdown-preview-view :not(pre) > code {
    ${settings.backtickFont ? `color: ${settings.backtickFont} !important;` : ''}
    ${settings.backtickBg ? `background: ${settings.backtickBg} !important;` : ''}
}
        `);
    }

    // Code block cosmetics
    if (settings.hideFenceLines) {
        css.push(`
/* Hide fence lines in reading view */
.markdown-preview-view pre code {
    display: block;
}

/* Hide in source mode */
.markdown-source-view .HyperMD-codeblock-begin,
.markdown-source-view .HyperMD-codeblock-end {
    display: none;
}
        `);
    }

    // Language badge styling (injected via JS)
    if (settings.showCodeBlockBadge) {
        css.push(`
.astraea-lang-badge {
    position: absolute;
    top: 4px;
    right: 4px;
    padding: 2px 8px;
    font-size: 0.75em;
    font-family: var(--font-monospace);
    background: var(--background-secondary);
    color: var(--text-muted);
    border-radius: 4px;
    pointer-events: none;
    z-index: 1;
}

.markdown-preview-view pre,
.markdown-source-view .HyperMD-codeblock {
    position: relative;
}
        `);
    }

    // Typography
    if (settings.lineHeight) {
        css.push(`
.markdown-preview-view,
.markdown-source-view {
    line-height: ${settings.lineHeight} !important;
}
        `);
    }

    return css.join('\n');
}