export interface AstraeaSettings {
    // Plugin control
    pluginEnabled: boolean;

    // App styling
    generalFont: string;
    backgroundPrimary: string;
    backgroundSecondary: string;
    borderColor: string;
    highlightColor: string;
    indentText: boolean;

    // Editor & Reader - Headers & Titles
    headerTitleColor: string;
    headerTitleFont: string;
    headerTitleSize: string;
    headerFontWeight: string;

    // Links
    internalLinkColor: string;
    externalLinkColor: string;
    linkUnderline: boolean;

    // Back-tick formatting
    codeNormalColor: string;
    backtickFont: string;
    backtickBg: string;

    // Code block cosmetics
    hideFenceLines: boolean;
    showCodeBlockBadge: boolean;

    // Typography
    lineHeight: string;
}

export const DEFAULT_SETTINGS: AstraeaSettings = {
    // Plugin control
    pluginEnabled: true,

    // App styling
    generalFont: '',
    backgroundPrimary: '',
    backgroundSecondary: '',
    borderColor: '',
    highlightColor: '',
    indentText: false,

    // Editor & Reader - Headers & Titles
    headerTitleColor: '',
    headerTitleFont: '',
    headerTitleSize: '',
    headerFontWeight: 'bold',

    // Links
    internalLinkColor: '',
    externalLinkColor: '',
    linkUnderline: true,

    // Back-tick formatting
    codeNormalColor: '',
    backtickFont: '',
    backtickBg: '',

    // Code block cosmetics
    hideFenceLines: false,
    showCodeBlockBadge: false,

    // Typography
    lineHeight: '',
};