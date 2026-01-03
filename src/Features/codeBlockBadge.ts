/**
 * Adds language badges to code blocks in Reading View and Source Mode
 * (Live Preview already has built-in language badges)
 */

export function addLangBadges(): void {
    // Reading View - pre > code blocks
    document.querySelectorAll('.markdown-preview-view pre').forEach((pre) => {
        if (pre.querySelector('.astraea-lang-badge')) return; // Already has badge

        const codeEl = pre.querySelector('code');
        if (!codeEl) return;

        // Extract language from class (e.g., "language-typescript")
        const langMatch = codeEl.className.match(/language-(\S+)/);
        if (!langMatch) return;

        const lang = langMatch[1];
        const badge = createBadge(lang);
        pre.appendChild(badge);
    });

    // Source Mode - HyperMD-codeblock spans
    document.querySelectorAll('.markdown-source-view .HyperMD-codeblock-begin').forEach((beginEl) => {
        const container = beginEl.parentElement;
        if (!container || container.querySelector('.astraea-lang-badge')) return;

        // Extract language from the fence line text
        const fenceText = beginEl.textContent || '';
        const langMatch = fenceText.match(/^```(\S+)/);
        if (!langMatch) return;

        const lang = langMatch[1];
        const badge = createBadge(lang);
        
        // Position relative to the code block container
        container.style.position = 'relative';
        container.appendChild(badge);
    });
}

export function removeLangBadges(): void {
    document.querySelectorAll('.astraea-lang-badge').forEach(badge => {
        badge.remove();
    });
}

function createBadge(language: string): HTMLElement {
    const badge = document.createElement('div');
    badge.className = 'astraea-lang-badge';
    badge.textContent = language;
    return badge;
}