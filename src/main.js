// Main orchestrator for AnuuVT-Core

import { loadVRM, startLipSync } from './vrm_loader.js';
import { generateResponse } from './anuu_engine.js';
import { connectTwitchChat } from './twitch_listener.js';

// --- Configuration ---
// **IMPORTANT**: Replace 'YOUR_TWITCH_CHANNEL' with your Twitch channel name
const TWITCH_CHANNEL = 'YOUR_TWITCH_CHANNEL_HERE';
const VRM_MODEL_PATH = 'models/anuu.vrm'; // Path to your VRM model

// --- Main Application Logic ---

// 1. Get the canvas element
const canvas = document.getElementById('vrm-canvas');

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

    // Display the response on the page
    const responseDiv = document.getElementById('response');
    responseDiv.innerText = `[${user}] ${message}\n[Anuu] ${response.text}`;
}

// 4. Connect to Twitch chat if a channel is provided
if (TWITCH_CHANNEL !== 'YOUR_TWITCH_CHANNEL_HERE') {
    connectTwitchChat(TWITCH_CHANNEL, handleChatMessage);
} else {
    console.warn('Twitch channel not configured. Please edit src/main.js and set the TWITCH_CHANNEL variable.');
}
