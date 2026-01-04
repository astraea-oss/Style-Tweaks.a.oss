import { AstraeaSettings } from '../settings';

export function buildCSS(settings: AstraeaSettings): string {
    const css: string[] = [];

    // App Styling
    if (settings.generalFontColor) {
        css.push(`
    /* General text colour - every mode */
    body,
    .app-container,
    .markdown-preview-view,
    .markdown-reading-view,
    .markdown-source-view .cm-line,
    .cm-s-obsidian .cm-line,
    .markdown-source-view.is-live-preview .cm-line,
    .cm-content,
    .view-content,
    .inline-title,
    .markdown-rendered p {
        color: ${settings.generalFontColor} !important;
    }
        `);
    }

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
/* Reading View */
.markdown-preview-view h1, .markdown-preview-view h2, .markdown-preview-view h3,
.markdown-preview-view h4, .markdown-preview-view h5, .markdown-preview-view h6,
/* Source Mode */
.markdown-source-view .cm-header,
/* Live Preview */
.cm-s-obsidian .HyperMD-header,
.cm-line.HyperMD-header-1, .cm-line.HyperMD-header-2, .cm-line.HyperMD-header-3,
.cm-line.HyperMD-header-4, .cm-line.HyperMD-header-5, .cm-line.HyperMD-header-6,
/* File Title */
.inline-title {
    color: ${settings.headerTitleColor} !important;
}
        `);
    }

    if (settings.headerTitleFont) {
        css.push(`
/* Reading View */
.markdown-preview-view h1, .markdown-preview-view h2, .markdown-preview-view h3,
.markdown-preview-view h4, .markdown-preview-view h5, .markdown-preview-view h6,
/* Source Mode */
.markdown-source-view .cm-header,
/* Live Preview */
.cm-s-obsidian .HyperMD-header,
.cm-line.HyperMD-header-1, .cm-line.HyperMD-header-2, .cm-line.HyperMD-header-3,
.cm-line.HyperMD-header-4, .cm-line.HyperMD-header-5, .cm-line.HyperMD-header-6,
/* File Title */
.inline-title {
    font-family: ${settings.headerTitleFont} !important;
}
        `);
    }

    // Make all headers same size as body text by default
    if (!settings.enableHeaderSizing) {
        css.push(`
/* Reading View */
.markdown-preview-view h1, .markdown-preview-view h2, .markdown-preview-view h3,
.markdown-preview-view h4, .markdown-preview-view h5, .markdown-preview-view h6 {
    font-size: 1em !important;
    line-height: inherit !important;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
}

/* Source Mode */
.markdown-source-view .cm-header-1,
.markdown-source-view .cm-header-2,
.markdown-source-view .cm-header-3,
.markdown-source-view .cm-header-4,
.markdown-source-view .cm-header-5,
.markdown-source-view .cm-header-6 {
    font-size: 1em !important;
    line-height: inherit !important;
}

/* Live Preview - THIS WAS MISSING */
.cm-s-obsidian .HyperMD-header-1,
.cm-s-obsidian .HyperMD-header-2,
.cm-s-obsidian .HyperMD-header-3,
.cm-s-obsidian .HyperMD-header-4,
.cm-s-obsidian .HyperMD-header-5,
.cm-s-obsidian .HyperMD-header-6 {
    font-size: 1em !important;
    line-height: inherit !important;
}

/* CM6 Editor (Live Preview) */
.cm-line.HyperMD-header-1,
.cm-line.HyperMD-header-2,
.cm-line.HyperMD-header-3,
.cm-line.HyperMD-header-4,
.cm-line.HyperMD-header-5,
.cm-line.HyperMD-header-6 {
    font-size: 1em !important;
    line-height: inherit !important;
}
        `);
    }

    // Only apply sizing if enabled AND a multiplier is set
    if (settings.enableHeaderSizing && settings.headerTitleSize) {
        css.push(`
/* Reading View */
.markdown-preview-view h1 { font-size: calc(2em * ${settings.headerTitleSize}) !important; }
.markdown-preview-view h2 { font-size: calc(1.5em * ${settings.headerTitleSize}) !important; }
.markdown-preview-view h3 { font-size: calc(1.25em * ${settings.headerTitleSize}) !important; }
.markdown-preview-view h4 { font-size: calc(1.1em * ${settings.headerTitleSize}) !important; }
.markdown-preview-view h5 { font-size: calc(1em * ${settings.headerTitleSize}) !important; }
.markdown-preview-view h6 { font-size: calc(0.9em * ${settings.headerTitleSize}) !important; }

/* Source Mode */
.markdown-source-view .cm-header-1 { font-size: calc(2em * ${settings.headerTitleSize}) !important; }
.markdown-source-view .cm-header-2 { font-size: calc(1.5em * ${settings.headerTitleSize}) !important; }
.markdown-source-view .cm-header-3 { font-size: calc(1.25em * ${settings.headerTitleSize}) !important; }
.markdown-source-view .cm-header-4 { font-size: calc(1.1em * ${settings.headerTitleSize}) !important; }
.markdown-source-view .cm-header-5 { font-size: calc(1em * ${settings.headerTitleSize}) !important; }
.markdown-source-view .cm-header-6 { font-size: calc(0.9em * ${settings.headerTitleSize}) !important; }

/* Live Preview - CM6 */
.cm-line.HyperMD-header-1 { font-size: calc(2em * ${settings.headerTitleSize}) !important; }
.cm-line.HyperMD-header-2 { font-size: calc(1.5em * ${settings.headerTitleSize}) !important; }
.cm-line.HyperMD-header-3 { font-size: calc(1.25em * ${settings.headerTitleSize}) !important; }
.cm-line.HyperMD-header-4 { font-size: calc(1.1em * ${settings.headerTitleSize}) !important; }
.cm-line.HyperMD-header-5 { font-size: calc(1em * ${settings.headerTitleSize}) !important; }
.cm-line.HyperMD-header-6 { font-size: calc(0.9em * ${settings.headerTitleSize}) !important; }

.cm-s-obsidian .HyperMD-header-1 { font-size: calc(2em * ${settings.headerTitleSize}) !important; }
.cm-s-obsidian .HyperMD-header-2 { font-size: calc(1.5em * ${settings.headerTitleSize}) !important; }
.cm-s-obsidian .HyperMD-header-3 { font-size: calc(1.25em * ${settings.headerTitleSize}) !important; }
.cm-s-obsidian .HyperMD-header-4 { font-size: calc(1.1em * ${settings.headerTitleSize}) !important; }
.cm-s-obsidian .HyperMD-header-5 { font-size: calc(1em * ${settings.headerTitleSize}) !important; }
.cm-s-obsidian .HyperMD-header-6 { font-size: calc(0.9em * ${settings.headerTitleSize}) !important; }
        `);
    }

    if (settings.headerFontWeight) {
        css.push(`
/* Reading View */
.markdown-preview-view h1, .markdown-preview-view h2, .markdown-preview-view h3,
.markdown-preview-view h4, .markdown-preview-view h5, .markdown-preview-view h6,
/* Source Mode */
.markdown-source-view .cm-header,
/* Live Preview */
.cm-s-obsidian .HyperMD-header,
.cm-line.HyperMD-header-1, .cm-line.HyperMD-header-2, .cm-line.HyperMD-header-3,
.cm-line.HyperMD-header-4, .cm-line.HyperMD-header-5, .cm-line.HyperMD-header-6,
/* File Title */
.inline-title {
    font-weight: ${settings.headerFontWeight} !important;
}
        `);
    }

    // Links
    if (settings.internalLinkColor) {
        css.push(`
/* Internal links - Reading View */
.markdown-preview-view .internal-link {
    color: ${settings.internalLinkColor} !important;
}

/* Internal links - Source Mode (raw markdown) */
.markdown-source-view:not(.is-live-preview) .cm-hmd-internal-link {
    color: ${settings.internalLinkColor} !important;
}

/* Internal links - Live Preview (rendered links) */
.markdown-source-view.is-live-preview span.cm-hmd-internal-link,
.markdown-source-view.is-live-preview span.cm-hmd-internal-link a,
.markdown-source-view.is-live-preview span.cm-hmd-internal-link a.cm-underline {
    color: ${settings.internalLinkColor} !important;
}
        `);
    }

    if (settings.externalLinkColor) {
        css.push(`
/* External links - Reading View */
.markdown-preview-view a.external-link {
    color: ${settings.externalLinkColor} !important;
}

/* External links - Source Mode (raw markdown, not Live Preview) - exclude code blocks */
.markdown-source-view:not(.is-live-preview) .cm-line:not(.HyperMD-codeblock) .cm-link,
.markdown-source-view:not(.is-live-preview) .cm-line:not(.HyperMD-codeblock) .cm-url {
    color: ${settings.externalLinkColor} !important;
}

/* External links - Live Preview (rendered links) */
.markdown-source-view.is-live-preview span.cm-link:not(.cm-hmd-internal-link),
.markdown-source-view.is-live-preview span.cm-link:not(.cm-hmd-internal-link) a,
.markdown-source-view.is-live-preview span.cm-link:not(.cm-hmd-internal-link) a.cm-underline {
    color: ${settings.externalLinkColor} !important;
}

/* External links - Live Preview rendered in markdown-rendered context */
.markdown-rendered .external-link {
    color: ${settings.externalLinkColor} !important;
}
        `);
    }

    if (!settings.linkUnderline) {
        css.push(`
/* Remove underlines - Reading View */
.markdown-preview-view a {
    text-decoration: none !important;
}

/* Remove underlines - Source Mode */
.markdown-source-view .cm-url,
.markdown-source-view .cm-hmd-internal-link {
    text-decoration: none !important;
}

/* Remove underlines - Live Preview rendered links */
.markdown-source-view.is-live-preview span.cm-link a,
.markdown-source-view.is-live-preview span.cm-hmd-internal-link a,
.markdown-source-view.is-live-preview a.cm-underline {
    text-decoration: none !important;
}
        `);
    }

    // Code formatting - split inline vs fenced
    if (settings.codeBlockBgColor) {
        css.push(`
/* Fenced code blocks background - Reading View */
.markdown-preview-view pre {
    background: ${settings.codeBlockBgColor} !important;
}

/* Fenced code blocks background - Source Mode */
.markdown-source-view .HyperMD-codeblock-bg {
    background: ${settings.codeBlockBgColor} !important;
}

/* Fenced code blocks background - Live Preview */
.cm-s-obsidian pre.HyperMD-codeblock,
.HyperMD-codeblock-begin,
.HyperMD-codeblock-end,
.HyperMD-codeblock {
    background: ${settings.codeBlockBgColor} !important;
}
        `);
    }

    if (settings.backtickFont || settings.backtickBg) {
        css.push(`
/* Inline backticks only - Reading View */
.markdown-preview-view :not(pre) > code {
    ${settings.backtickFont ? `color: ${settings.backtickFont} !important;` : ''}
    ${settings.backtickBg ? `background: ${settings.backtickBg} !important;` : ''}
}

/* Inline backticks only - Source Mode */
.markdown-source-view .cm-inline-code {
    ${settings.backtickFont ? `color: ${settings.backtickFont} !important;` : ''}
    ${settings.backtickBg ? `background: ${settings.backtickBg} !important;` : ''}
}

/* Inline backticks only - Live Preview */
.cm-s-obsidian span.cm-inline-code {
    ${settings.backtickFont ? `color: ${settings.backtickFont} !important;` : ''}
    ${settings.backtickBg ? `background: ${settings.backtickBg} !important;` : ''}
}
        `);
    }

    // Language badge styling (injected via JS)
    if (settings.showCodeBlockBadge) {
        css.push(`
/* Language badge - top right */
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

/* Don't interfere with copy button - let it position dynamically */
.markdown-preview-view pre,
.markdown-source-view .HyperMD-codeblock {
    position: relative;
}
        `);
    }

    // Fix separator spacing to match between Live Preview and Reading View
    css.push(`
/* Horizontal rule (---) spacing normalization */
/* Reading View */
.markdown-preview-view hr {
    margin-top: 1.5em !important;
    margin-bottom: 1.5em !important;
}

/* Source Mode (not Live Preview) */
.markdown-source-view:not(.is-live-preview) hr,
.markdown-source-view:not(.is-live-preview) .cm-line .HyperMD-hr {
    margin-top: 1.5em !important;
    margin-bottom: 1.5em !important;
}

/* Live Preview - the actual HR line */
.markdown-source-view.is-live-preview .cm-line:has(.cm-hr),
.markdown-source-view.is-live-preview .cm-line .cm-hr,
.cm-editor .cm-line:has(hr) {
    margin-top: 1.5em !important;
    margin-bottom: 1.5em !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
}

/* Live Preview - HR element itself */
.markdown-source-view.is-live-preview hr,
.cm-editor hr {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
}
    `);

    // Typography
    if (settings.lineHeight) {
        css.push(`
/* Apply line height to all text content */
.markdown-preview-view,
.markdown-preview-view p,
.markdown-source-view .cm-line,
.markdown-reading-view,
body {
    line-height: ${settings.lineHeight} !important;
}
        `);
    }

    return css.join('\n');
}