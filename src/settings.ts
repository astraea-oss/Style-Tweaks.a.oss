export interface AstraeaSettings {
    // Plugin control
    pluginEnabled: boolean;

    // App styling
    generalFontSize: string;
    generalFontColor: string;
    generalFont: string;
    backgroundPrimary: string;
    backgroundSecondary: string;
    borderColor: string;
    highlightColor: string;
    indentText: boolean;

    // Editor & Reader - Headers & Titles
    headerTitleColor: string;
    headerTitleFont: string;
    enableHeaderSizing: boolean;
    headerTitleSize: string;
    headerFontWeight: string;

    // Links
    internalLinkColor: string;
    externalLinkColor: string;
    linkUnderline: boolean;

    // Back-tick formatting
    codeBlockBgColor: string;
    backtickFont: string;
    backtickBg: string;

    // Code block cosmetics
    showCodeBlockBadge: boolean;

    // Typography
    lineHeight: string;
}

export const DEFAULT_SETTINGS: AstraeaSettings = {
    // Plugin control
    pluginEnabled: true,

    // App styling
    generalFontSize: '',
    generalFontColor: '',
    generalFont: '',
    backgroundPrimary: '',
    backgroundSecondary: '',
    borderColor: '',
    highlightColor: '',
    indentText: false,

    // Editor & Reader - Headers & Titles
    headerTitleColor: '',
    headerTitleFont: '',
    enableHeaderSizing: false,
    headerTitleSize: '1',
    headerFontWeight: 'bold',

    // Links
    internalLinkColor: '',
    externalLinkColor: '',
    linkUnderline: true,

    // Back-tick formatting
    codeBlockBgColor: '',
    backtickFont: '',
    backtickBg: '',

    // Code block cosmetics
    showCodeBlockBadge: false,

    // Typography
    lineHeight: '',
};