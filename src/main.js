// Main orchestrator for AnuuVT-Core

import { loadVRM, startLipSync } from './vrm_loader.js';
import { generateResponse } from './anuu_engine.js';
import { connectTwitchChat } from './twitch_listener.js';

// --- Configuration ---
// **IMPORTANT**: Replace 'YOUR_TWITCH_CHANNEL' with your Twitch channel name
const TWITCH_CHANNEL = 'YOUR_TWITCH_CHANNEL_HERE';
const VRM_MODEL_PATH = './models/anuu.vrm'; // Path to your VRM model

// --- Main Application Logic ---

// 1. Get the canvas element
const canvas = document.getElementById('vrm-canvas');

// --- Debugging ---
function updateDebugPanel() {
    const debugList = document.getElementById('debug-list');
    if (window.anuuLoadStatus) {
        debugList.innerHTML = '';
        window.anuuLoadStatus.forEach(item => {
            const li = document.createElement('li');
            li.style.color = item.status === 'Success' ? 'lightgreen' : 'salmon';
            li.textContent = `${item.file}: ${item.status}`;
            if (item.status === 'Failed') {
                li.textContent += ` (${item.error})`;
            }
            debugList.appendChild(li);
        });
    }
}

// 2. Load the VRM model
loadVRM(VRM_MODEL_PATH, canvas).catch(console.error);

// 3. Define the chat handler
async function handleChatMessage(message, user) {
    console.log(`[Twitch] ${user}: ${message}`);

    // Generate a response from the Anuu engine
    const response = await generateResponse(message, user);
    console.log(`[Anuu] ${response.text}`);

    // Trigger avatar lip-sync
    startLipSync();

    // Update the debug panel with the latest status
    updateDebugPanel();
}

// 4. Connect to Twitch chat if a channel is provided
if (TWITCH_CHANNEL !== 'YOUR_TWITCH_CHANNEL_HERE') {
    connectTwitchChat(TWITCH_CHANNEL, handleChatMessage);
} else {
    console.warn('Twitch channel not configured. Please edit src/main.js and set the TWITCH_CHANNEL variable.');
    // For testing purposes, trigger the debug panel on load
    document.addEventListener('DOMContentLoaded', () => {
        // We call generateResponse to trigger the data loading and then update the panel
        generateResponse("test", "testuser").then(updateDebugPanel);
    });
}
