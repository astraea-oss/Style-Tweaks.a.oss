import { Plugin } from 'obsidian';

export default class HeaderModifierPlugin extends Plugin {
    onload() {
        console.log('Header Modifier Plugin loaded');
    }

    onunload() {
        console.log('Header Modifier Plugin unloaded');
    }
}
