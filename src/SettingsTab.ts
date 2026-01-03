import { App, PluginSettingTab, Setting, Modal } from 'obsidian';
import AstraeaPlugin from './main';
import { DEFAULT_SETTINGS } from './settings';

export class AstraeaSettingTab extends PluginSettingTab {
    plugin: AstraeaPlugin;

    constructor(app: App, plugin: AstraeaPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();

        containerEl.createEl('h2', { text: 'Astraea Theme Settings' });

        // Plugin toggle
        new Setting(containerEl)
            .setName('Enable plugin')
            .setDesc('Toggle the entire plugin on/off')
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.pluginEnabled)
                .onChange(async (value) => {
                    this.plugin.settings.pluginEnabled = value;
                    await this.plugin.saveSettings();
                })
            );

        // Export/Import/Reset buttons
        new Setting(containerEl)
            .setName('Manage settings')
            .setDesc('Export, import, or reset your theme configuration')
            .addButton(button => button
                .setButtonText('Export')
                .onClick(() => this.exportSettings())
            )
            .addButton(button => button
                .setButtonText('Import')
                .onClick(() => this.importSettings())
            )
            .addButton(button => button
                .setButtonText('Reset to defaults')
                .setWarning()
                .onClick(() => this.resetSettings())
            );

        containerEl.createEl('h3', { text: 'App Styling' });

        new Setting(containerEl)
            .setName('General font')
            .setDesc('Font family for the entire app (leave empty for default)')
            .addText(text => text
                .setPlaceholder('e.g., Inter, Roboto, Arial')
                .setValue(this.plugin.settings.generalFont)
                .onChange(async (value) => {
                    this.plugin.settings.generalFont = value;
                    await this.plugin.saveSettings();
                })
            );

        new Setting(containerEl)
            .setName('Background primary')
            .setDesc('Main background color')
            .addColorPicker(color => color
                .setValue(this.plugin.settings.backgroundPrimary || '#ffffff')
                .onChange(async (value) => {
                    this.plugin.settings.backgroundPrimary = value;
                    await this.plugin.saveSettings();
                })
            )
            .addExtraButton(button => button
                .setIcon('reset')
                .setTooltip('Clear color')
                .onClick(async () => {
                    this.plugin.settings.backgroundPrimary = '';
                    await this.plugin.saveSettings();
                    this.display();
                })
            );

        new Setting(containerEl)
            .setName('Background secondary')
            .setDesc('Secondary background color (sidebars, etc.)')
            .addColorPicker(color => color
                .setValue(this.plugin.settings.backgroundSecondary || '#f5f5f5')
                .onChange(async (value) => {
                    this.plugin.settings.backgroundSecondary = value;
                    await this.plugin.saveSettings();
                })
            )
            .addExtraButton(button => button
                .setIcon('reset')
                .setTooltip('Clear color')
                .onClick(async () => {
                    this.plugin.settings.backgroundSecondary = '';
                    await this.plugin.saveSettings();
                    this.display();
                })
            );

        new Setting(containerEl)
            .setName('Border color')
            .setDesc('Color for borders and dividers')
            .addColorPicker(color => color
                .setValue(this.plugin.settings.borderColor || '#e0e0e0')
                .onChange(async (value) => {
                    this.plugin.settings.borderColor = value;
                    await this.plugin.saveSettings();
                })
            )
            .addExtraButton(button => button
                .setIcon('reset')
                .setTooltip('Clear color')
                .onClick(async () => {
                    this.plugin.settings.borderColor = '';
                    await this.plugin.saveSettings();
                    this.display();
                })
            );

        new Setting(containerEl)
            .setName('Highlight color')
            .setDesc('Text selection highlight color')
            .addColorPicker(color => color
                .setValue(this.plugin.settings.highlightColor || '#b3d4fc')
                .onChange(async (value) => {
                    this.plugin.settings.highlightColor = value;
                    await this.plugin.saveSettings();
                })
            )
            .addExtraButton(button => button
                .setIcon('reset')
                .setTooltip('Clear color')
                .onClick(async () => {
                    this.plugin.settings.highlightColor = '';
                    await this.plugin.saveSettings();
                    this.display();
                })
            );

        new Setting(containerEl)
            .setName('Indent paragraphs')
            .setDesc('Add single-space indent to regular text (excludes headers and code blocks)')
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.indentText)
                .onChange(async (value) => {
                    this.plugin.settings.indentText = value;
                    await this.plugin.saveSettings();
                })
            );

        containerEl.createEl('h3', { text: 'Headers & Titles' });

        new Setting(containerEl)
            .setName('Header & title color')
            .setDesc('Color for all headers (h1-h6)')
            .addColorPicker(color => color
                .setValue(this.plugin.settings.headerTitleColor || '#000000')
                .onChange(async (value) => {
                    this.plugin.settings.headerTitleColor = value;
                    await this.plugin.saveSettings();
                })
            )
            .addExtraButton(button => button
                .setIcon('reset')
                .setTooltip('Clear color')
                .onClick(async () => {
                    this.plugin.settings.headerTitleColor = '';
                    await this.plugin.saveSettings();
                    this.display();
                })
            );

        new Setting(containerEl)
            .setName('Header & title font')
            .setDesc('Font family for headers (leave empty for default)')
            .addText(text => text
                .setPlaceholder('e.g., Georgia, Times New Roman')
                .setValue(this.plugin.settings.headerTitleFont)
                .onChange(async (value) => {
                    this.plugin.settings.headerTitleFont = value;
                    await this.plugin.saveSettings();
                })
            );

        new Setting(containerEl)
            .setName('Header & title size multiplier')
            .setDesc('Adjust header sizes (e.g., 1.1 for 110%, leave empty for default)')
            .addText(text => text
                .setPlaceholder('e.g., 1.1')
                .setValue(this.plugin.settings.headerTitleSize)
                .onChange(async (value) => {
                    this.plugin.settings.headerTitleSize = value;
                    await this.plugin.saveSettings();
                })
            );

        new Setting(containerEl)
            .setName('Header font weight')
            .setDesc('Font weight for headers')
            .addDropdown(dropdown => dropdown
                .addOption('normal', 'Normal')
                .addOption('bold', 'Bold')
                .addOption('100', '100 (Thin)')
                .addOption('200', '200')
                .addOption('300', '300 (Light)')
                .addOption('400', '400 (Normal)')
                .addOption('500', '500 (Medium)')
                .addOption('600', '600 (Semi-bold)')
                .addOption('700', '700 (Bold)')
                .addOption('800', '800')
                .addOption('900', '900 (Black)')
                .setValue(this.plugin.settings.headerFontWeight)
                .onChange(async (value) => {
                    this.plugin.settings.headerFontWeight = value;
                    await this.plugin.saveSettings();
                })
            );

        containerEl.createEl('h3', { text: 'Links' });

        new Setting(containerEl)
            .setName('Internal link color')
            .setDesc('Color for internal wiki links')
            .addColorPicker(color => color
                .setValue(this.plugin.settings.internalLinkColor || '#7c3aed')
                .onChange(async (value) => {
                    this.plugin.settings.internalLinkColor = value;
                    await this.plugin.saveSettings();
                })
            )
            .addExtraButton(button => button
                .setIcon('reset')
                .setTooltip('Clear color')
                .onClick(async () => {
                    this.plugin.settings.internalLinkColor = '';
                    await this.plugin.saveSettings();
                    this.display();
                })
            );

        new Setting(containerEl)
            .setName('External link color')
            .setDesc('Color for external hyperlinks')
            .addColorPicker(color => color
                .setValue(this.plugin.settings.externalLinkColor || '#2563eb')
                .onChange(async (value) => {
                    this.plugin.settings.externalLinkColor = value;
                    await this.plugin.saveSettings();
                })
            )
            .addExtraButton(button => button
                .setIcon('reset')
                .setTooltip('Clear color')
                .onClick(async () => {
                    this.plugin.settings.externalLinkColor = '';
                    await this.plugin.saveSettings();
                    this.display();
                })
            );

        new Setting(containerEl)
            .setName('Link underline')
            .setDesc('Show underline on links')
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.linkUnderline)
                .onChange(async (value) => {
                    this.plugin.settings.linkUnderline = value;
                    await this.plugin.saveSettings();
                })
            );

        containerEl.createEl('h3', { text: 'Code Formatting' });

        new Setting(containerEl)
            .setName('Code block text color')
            .setDesc('Color for text in fenced code blocks')
            .addColorPicker(color => color
                .setValue(this.plugin.settings.codeNormalColor || '#000000')
                .onChange(async (value) => {
                    this.plugin.settings.codeNormalColor = value;
                    await this.plugin.saveSettings();
                })
            )
            .addExtraButton(button => button
                .setIcon('reset')
                .setTooltip('Clear color')
                .onClick(async () => {
                    this.plugin.settings.codeNormalColor = '';
                    await this.plugin.saveSettings();
                    this.display();
                })
            );

        new Setting(containerEl)
            .setName('Inline backtick text color')
            .setDesc('Color for inline `code` text')
            .addColorPicker(color => color
                .setValue(this.plugin.settings.backtickFont || '#e11d48')
                .onChange(async (value) => {
                    this.plugin.settings.backtickFont = value;
                    await this.plugin.saveSettings();
                })
            )
            .addExtraButton(button => button
                .setIcon('reset')
                .setTooltip('Clear color')
                .onClick(async () => {
                    this.plugin.settings.backtickFont = '';
                    await this.plugin.saveSettings();
                    this.display();
                })
            );

        new Setting(containerEl)
            .setName('Inline backtick background')
            .setDesc('Background color for inline `code`')
            .addColorPicker(color => color
                .setValue(this.plugin.settings.backtickBg || '#fee2e2')
                .onChange(async (value) => {
                    this.plugin.settings.backtickBg = value;
                    await this.plugin.saveSettings();
                })
            )
            .addExtraButton(button => button
                .setIcon('reset')
                .setTooltip('Clear color')
                .onClick(async () => {
                    this.plugin.settings.backtickBg = '';
                    await this.plugin.saveSettings();
                    this.display();
                })
            );

        containerEl.createEl('h3', { text: 'Code Block Cosmetics' });

        new Setting(containerEl)
            .setName('Hide fence lines')
            .setDesc('Hide the opening and closing ``` lines in code blocks')
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.hideFenceLines)
                .onChange(async (value) => {
                    this.plugin.settings.hideFenceLines = value;
                    await this.plugin.saveSettings();
                })
            );

        new Setting(containerEl)
            .setName('Show language badge')
            .setDesc('Display language badge in code blocks (Reading View & Source Mode)')
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.showCodeBlockBadge)
                .onChange(async (value) => {
                    this.plugin.settings.showCodeBlockBadge = value;
                    await this.plugin.saveSettings();
                })
            );

        containerEl.createEl('h3', { text: 'Typography' });

        new Setting(containerEl)
            .setName('Line height')
            .setDesc('Line height for text (e.g., 1.6, leave empty for default)')
            .addText(text => text
                .setPlaceholder('e.g., 1.6')
                .setValue(this.plugin.settings.lineHeight)
                .onChange(async (value) => {
                    this.plugin.settings.lineHeight = value;
                    await this.plugin.saveSettings();
                })
            );
    }

    exportSettings() {
        const data = JSON.stringify(this.plugin.settings, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'astraea-settings.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    async importSettings() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;

            const text = await file.text();
            try {
                const imported = JSON.parse(text);
                this.plugin.settings = Object.assign({}, DEFAULT_SETTINGS, imported);
                await this.plugin.saveSettings();
                this.display();
            } catch (err) {
                console.error('Failed to import settings:', err);
            }
        };
        input.click();
    }

    resetSettings() {
        new ConfirmResetModal(this.app, async () => {
            this.plugin.settings = Object.assign({}, DEFAULT_SETTINGS);
            await this.plugin.saveSettings();
            this.display();
        }).open();
    }
}

class ConfirmResetModal extends Modal {
    onConfirm: () => void;

    constructor(app: App, onConfirm: () => void) {
        super(app);
        this.onConfirm = onConfirm;
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.createEl('h2', { text: 'Reset to defaults?' });
        contentEl.createEl('p', { 
            text: 'This will reset all Astraea settings to their default values. This action cannot be undone.' 
        });

        const buttonContainer = contentEl.createDiv({ cls: 'modal-button-container' });
        
        buttonContainer.createEl('button', { text: 'Cancel' })
            .addEventListener('click', () => this.close());
        
        const confirmBtn = buttonContainer.createEl('button', { 
            text: 'Reset', 
            cls: 'mod-warning' 
        });
        confirmBtn.addEventListener('click', () => {
            this.onConfirm();
            this.close();
        });
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}