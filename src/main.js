// Main orchestrator for AnuuVT-Core

import { loadVRM } from './vrm_loader.js';
import { generateResponse } from './anuu_engine.js';
import { connectTwitchChat } from './twitch_listener.js';

// --- Configuration ---
const TWITCH_CHANNEL = 'YOUR_TWITCH_CHANNEL'; // <--- IMPORTANT: Replace with your Twitch channel
const VRM_MODEL_PATH = '../models/anuu.vrm'; // Path to your VRM model

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

    // TODO: Trigger avatar animation/lip-sync with the response text
}

// 4. Connect to Twitch chat
connectTwitchChat(TWITCH_CHANNEL, handleChatMessage);
