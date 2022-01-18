// ==UserScript==
// @name         ChangeSpeed
// @namespace    https://github.com/MarcoPeraza/UserScripts/
// @version      1.0
// @description  Change HTML Video Speed with Ctrl + Alt + +/- . All videos on page will play at the same speed.
// @author       Marco
// @match        *://*/*
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle(`
#changeSpeedOverlay {
    border-radius: 15px;
    position: fixed;
    top: 5px;
    right: 5px;
    padding: 30px;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10000;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 30px;
    font-weight: bold;
    display: flex;
}
`)

function ChangeSpeed_Main() {
    'use strict';

    var currentSpeed = 1;

    function displaySpeed() {
        document.getElementById('changeSpeedOverlay')?.remove();
        var overlay = document.createElement('div');
        overlay.id = 'changeSpeedOverlay';
        overlay.innerHTML = "&#x23e9&#xfe03 " + currentSpeed.toFixed(2);
        document.body.appendChild(overlay);
        setTimeout(() => overlay.remove(), 2000);
    }

    function applySpeed() {
        document.getElementsByTagName('video')?.forEach?.(vid => {
            vid.playbackRate = currentSpeed;
        });
    }

    document.addEventListener('keydown', zEvent => {
        if (zEvent.ctrlKey && zEvent.altKey && (zEvent.key === '=' || zEvent.key === '-')) { // = is + without holding shift
            currentSpeed += (zEvent.key === '=') ? 0.25 : -0.25;
            applySpeed();
            displaySpeed();
        }
    });

    // Set all videos to current speed when they are played
    document.addEventListener('play', (event) => {
        applySpeed();
    }, {capture: true});

    // Set speed for any elements that loaded before the above event was set up
    applySpeed();
}
ChangeSpeed_Main();