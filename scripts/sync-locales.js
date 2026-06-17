/**
 * Sync locale JSON files from HTML source text.
 *
 * Workflow:
 * 1. Edit Spanish text directly in the HTML (data-i18n-key elements).
 * 2. Run: npm run i18n:sync
 * 3. es.json is rebuilt from HTML; en.json / fr.json get new/changed keys
 *    filled with the updated Spanish until you provide proper translations.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LOCALES_DIR = path.join(ROOT, 'assets', 'locales');
const HTML_FILES = [
    path.join(ROOT, 'index.html'),
    ...fs.readdirSync(path.join(ROOT, 'pages'))
        .filter(file => file.endsWith('.html'))
        .map(file => path.join(ROOT, 'pages', file))
];

function setNested(obj, keyPath, value) {
    const parts = keyPath.split('.');
    let current = obj;
    for (let i = 0; i < parts.length - 1; i += 1) {
        if (!current[parts[i]] || typeof current[parts[i]] !== 'object') {
            current[parts[i]] = {};
        }
        current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
}

function flattenLocale(obj, prefix = '', result = {}) {
    Object.entries(obj || {}).forEach(([key, value]) => {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            flattenLocale(value, fullKey, result);
        } else {
            result[fullKey] = String(value);
        }
    });
    return result;
}

function unflattenLocale(flatMap) {
    const nested = {};
    Object.entries(flatMap).forEach(([key, value]) => setNested(nested, key, value));
    return nested;
}

function normalizeText(text) {
    return text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function findTagBounds(html, keyIndex) {
    const tagStart = html.lastIndexOf('<', keyIndex);
    if (tagStart === -1) {
        return null;
    }

    const openEnd = html.indexOf('>', keyIndex);
    if (openEnd === -1) {
        return null;
    }

    const openTag = html.slice(tagStart, openEnd + 1);
    const tagNameMatch = openTag.match(/^<([a-z0-9]+)/i);
    if (!tagNameMatch) {
        return null;
    }

    const tagName = tagNameMatch[1].toLowerCase();
    const voidTags = new Set(['input', 'img', 'br', 'meta', 'link', 'hr', 'source']);
    if (voidTags.has(tagName)) {
        return { tagName, openTag, openEnd, closeStart: -1, closeEnd: -1, isVoid: true };
    }

    const closeToken = `</${tagName}>`;
    const closeStart = html.toLowerCase().indexOf(closeToken, openEnd + 1);
    if (closeStart === -1) {
        return null;
    }

    return {
        tagName,
        openTag,
        openEnd,
        closeStart,
        closeEnd: closeStart + closeToken.length,
        isVoid: false
    };
}

function extractStringsFromHtml(html) {
    const strings = {};

    const titleMatch = html.match(/<title[^>]*data-i18n-key="([^"]+)"[^>]*>([\s\S]*?)<\/title>/i);
    if (titleMatch) {
        strings[titleMatch[1]] = normalizeText(titleMatch[2]);
    }

    const keyRegex = /data-i18n-key="([^"]+)"/g;
    let match;

    while ((match = keyRegex.exec(html)) !== null) {
        const key = match[1];
        const keyIndex = match.index;
        const bounds = findTagBounds(html, keyIndex);
        if (!bounds) {
            continue;
        }

        const { openTag, openEnd, closeStart, isVoid } = bounds;
        const attrNameMatch = openTag.match(/data-i18n-attr="([^"]+)"/i);
        const attrName = attrNameMatch ? attrNameMatch[1] : null;

        if (attrName) {
            const attrPattern = new RegExp(`${attrName}="([^"]*)"`, 'i');
            const attrMatch = openTag.match(attrPattern);
            if (attrMatch && attrMatch[1]) {
                strings[key] = normalizeText(attrMatch[1]);
            }
            continue;
        }

        if (isVoid) {
            continue;
        }

        const innerHtml = html.slice(openEnd + 1, closeStart);
        const text = normalizeText(innerHtml);
        if (text) {
            strings[key] = text;
        }
    }

    return strings;
}

function collectHtmlStrings() {
    const collected = {};

    HTML_FILES.forEach(filePath => {
        const html = fs.readFileSync(filePath, 'utf8');
        const pageStrings = extractStringsFromHtml(html);
        Object.assign(collected, pageStrings);
    });

    return collected;
}

function loadLocale(lang) {
    const filePath = path.join(LOCALES_DIR, `${lang}.json`);
    if (!fs.existsSync(filePath)) {
        return {};
    }
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function saveLocale(lang, data) {
    const filePath = path.join(LOCALES_DIR, `${lang}.json`);
    fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

function syncLocales() {
    const htmlStrings = collectHtmlStrings();
    const previousEs = flattenLocale(loadLocale('es'));
    const nextEs = { ...previousEs, ...htmlStrings };
    const nextEsNested = unflattenLocale(nextEs);

    saveLocale('es', nextEsNested);

    const changedKeys = Object.keys(htmlStrings).filter(
        key => previousEs[key] != null && previousEs[key] !== htmlStrings[key]
    );
    const newKeys = Object.keys(htmlStrings).filter(key => previousEs[key] == null);

    ['en', 'fr'].forEach(lang => {
        const current = flattenLocale(loadLocale(lang));
        const next = { ...current };

        newKeys.forEach(key => {
            next[key] = htmlStrings[key];
        });

        changedKeys.forEach(key => {
            next[key] = htmlStrings[key];
        });

        saveLocale(lang, unflattenLocale(next));
    });

    console.log(`Synced ${Object.keys(htmlStrings).length} strings from HTML into locale files.`);
    if (newKeys.length) {
        console.log(`New keys (${newKeys.length}): ${newKeys.join(', ')}`);
    }
    if (changedKeys.length) {
        console.log(`Updated keys (${changedKeys.length}): ${changedKeys.join(', ')}`);
        console.log('English/French were refreshed with the new Spanish source text.');
        console.log('Replace those entries in en.json / fr.json when proper translations are ready.');
    }
}

syncLocales();
