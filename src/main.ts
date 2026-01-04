import { Plugin } from 'obsidian';
import { AstraeaSettings, DEFAULT_SETTINGS } from './settings';
import { AstraeaSettingTab } from './SettingsTab';
import { buildCSS } from './features/_css';
import { addLangBadges, removeLangBadges } from './features/codeBlockBadge';

export default class AstraeaPlugin extends Plugin {
    settings: AstraeaSettings;
    private styleEl: HTMLStyleElement | null = null;

    async onload() {
        await this.loadSettings();

        // Add settings tab
        this.addSettingTab(new AstraeaSettingTab(this.app, this));

        // Apply initial styles
        this.applyStyles();

        // Register code block badge handler
        if (this.settings.showCodeBlockBadge) {
            this.registerEvent(
                this.app.workspace.on('layout-change', () => addLangBadges())
            );
            // Initial badge injection
            addLangBadges();
        }
    }

    onunload() {
        // Clean removal of injected styles
        this.removeStyles();
        // Remove all language badges
        removeLangBadges();
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
        this.applyStyles();
        
        // Handle badge toggle
        if (this.settings.showCodeBlockBadge) {
            addLangBadges();
        } else {
            removeLangBadges();
        }
    }

    applyStyles() {
        if (!this.settings.pluginEnabled) {
            this.removeStyles();
            return;
        }

        // Remove existing style element if present
        this.removeStyles();

        // Create and inject new style element
        this.styleEl = document.createElement('style');
        this.styleEl.id = 'astraea-custom-styles';
        this.styleEl.textContent = buildCSS(this.settings);
        document.head.appendChild(this.styleEl);
    }

    removeStyles() {
        if (this.styleEl) {
            this.styleEl.remove();
            this.styleEl = null;
        }
    }
}