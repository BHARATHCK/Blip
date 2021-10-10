"use strict";

class ClipManager {
    static #listenId = undefined;
    static #lastContent = '';
    static _skipListening = true;

    static startListenClipboard() {
        console.log(`ClipManager.startListenClipboard()`);

        if (ClipManager.#listenId) return;

        ClipManager.#listenId = setInterval(function () {
            const clip = ClipManager.readTextClassic();
            console.log("CLIP ****** ", clip);
            if (!clip || clip.trim().length === 0 ||
                (ClipManager.#lastContent && clip.trim() === ClipManager.#lastContent.trim())) {
                return;
            }

            ClipManager.#lastContent = clip;

            // Skip the first time
            if (ClipManager._skipListening) {
                ClipManager._skipListening = false;
                return;
            }

            console.log("CLIP ***** ",ClipManager.#lastContent)

        }, 1000);
    }

    static stopListenClipboard() {
        console.log(`ClipManager.stopListenClipboard()`);
        if (!ClipManager.#listenId) return;
        clearInterval(ClipManager.#listenId);
        ClipManager.#listenId = undefined;
        ClipManager._skipListening = true;
    }

    static async writeText(text) {
        ClipManager.#lastContent = text;
        await navigator.clipboard.writeText(text);
    }

    static getLastContent() {
        return ClipManager.#lastContent;
    }

    static async readText() {
        return navigator.clipboard.readText();
    }

    static writeTextClassic(text) {
        // console.log(`ClipManager.writeTextClassic()`);
        let textArea = document.createElement("textarea");
        document.body.appendChild(textArea);
        textArea.value = text;
        textArea.select();
        if (!document.execCommand("cut")) {
            console.error("Copy Failure.");
        }
        textArea.blur();
        document.body.removeChild(textArea);

        // Update lastContent
        ClipManager.#lastContent = text;
    }

    static readTextClassic() {
        // console.log(`ClipManager.readTextClassic()`);
        let textArea = document.createElement("textarea");
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.value = '';
        if (!document.execCommand("paste")) {
            console.error("Read Failure.");
            return '';
        }
        var testContent = textArea.value || '';
        document.body.removeChild(textArea);
        return testContent.trim();
    }

    static writeImageClassic(src) {
        var img = document.createElement('img');
        img.src = src;

        img.onload = () => {
            window.getSelection().removeAllRanges();
            document.body.appendChild(img);
            var r = document.createRange();
            r.setStartBefore(img);
            r.setEndAfter(img);
            r.selectNode(img);
            var sel = window.getSelection();
            sel.addRange(r);
            document.execCommand('copy');
            document.body.removeChild(img);
            window.getSelection().removeAllRanges();
        }
    }
}