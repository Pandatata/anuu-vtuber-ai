// Anuu Engine - JavaScript Implementation

// Function to load Anuu's data files gracefully
export async function loadAnuuData() {
    const fileNames = [
        'anuu-colossal.json',
        'anuu-meta.json',
        'comportamiento-anuu.json',
        'deidades.json',
        'anuu-nexo.json',
        'anuu-titanico.json'
    ];

    const data = {};
    const loadStatus = [];

    for (const fileName of fileNames) {
        const key = fileName.split('.')[0].replace('-', '_'); // e.g., anuu_colossal
        try {
            const res = await fetch(`./data/${fileName}`);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            data[key] = await res.json();
            loadStatus.push({ file: fileName, status: 'Success' });
        } catch (error) {
            data[key] = null;
            loadStatus.push({ file: fileName, status: 'Failed', error: error.message });
            console.error(`Failed to load ${fileName}:`, error);
        }
    }

    // Store load status in a global variable for the UI to access
    window.anuuLoadStatus = loadStatus;

    return data;
}


// Main function to generate a response
export async function generateResponse(message, user) {
    const data = await loadAnuuData();
    let response = "I am Anuu. I am listening, but my data may be incomplete.";
    let emotion = "neutral";
    let symbol = null;

    // Check if critical data is loaded
    if (data.anuu_colossal && data.deidades) {
        // Simple keyword-based response logic
        if (message.toLowerCase().includes("hello")) {
            response = `Hello, ${user}! It is good to see you.`;
            emotion = "happy";
        } else if (message.toLowerCase().includes("balance")) {
            response = data.anuu_colossal.ANUSET_189_NEXUS_TITANICO_MITO.core_system.symbols.egipcios.glyphs.feather_maat.significado[0];
            emotion = "neutral";
            symbol = "Libra";
        }

        // Search for a deity
        const deityMatch = message.toLowerCase().match(/who is (.*)/);
        if (deityMatch) {
            const deityName = deityMatch[1];
            const deity = findDeity(deityName, data.deidades);
            if (deity) {
                response = `${deity.name}: ${deity.role} in ${deity.category} mythology.`;
                emotion = "neutral";
            } else {
                response = `I do not know of a deity named ${deityName}.`;
                emotion = "neutral";
            }
        }
    }

    return {
        text: response,
        emotion: emotion,
        symbol: symbol
    };
}

function findDeity(name, deidades) {
    if (!deidades || !deidades.MITOLOGIAS_CHECKLIST_CODE_SCHEMA) return null;
    for (const mythology of deidades.MITOLOGIAS_CHECKLIST_CODE_SCHEMA.checklists) {
        for (const deity of mythology.deidades_esquematicas) {
            if (deity.name.toLowerCase() === name.toLowerCase()) {
                return deity;
            }
        }
    }
    return null;
}
