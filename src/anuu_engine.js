// Anuu Engine - JavaScript Implementation

// Function to load Anuu's data files
async function loadAnuuData() {
    const [
        colossal,
        anuuMeta,
        comportamiento,
        deidades,
        nexo,
        titanico
    ] = await Promise.all([
        fetch('../data/ANUU COLOSSAL.json').then(res => res.json()),
        fetch('../data/Anuu___.json').then(res => res.json()),
        fetch('../data/Comportamiento anuu.json').then(res => res.json()),
        fetch('../data/DEIDADES.json').then(res => res.json()),
        fetch('../data/anuu nexo.json').then(res => res.json()),
        fetch('../data/anuu titanico.json').then(res => res.json())
    ]);
    return { colossal, anuuMeta, comportamiento, deidades, nexo, titanico };
}

// Main function to generate a response
export async function generateResponse(message, user) {
    const data = await loadAnuuData();
    let response = "I am Anuu. I am listening.";
    let emotion = "neutral";
    let symbol = null;

    // Simple keyword-based response logic
    if (message.toLowerCase().includes("hello")) {
        response = `Hello, ${user}! It is good to see you.`;
        emotion = "happy";
    } else if (message.toLowerCase().includes("balance")) {
        response = data.colossal.ANUSET_189_NEXUS_TITANICO_MITO.core_system.symbols.egipcios.glyphs.feather_maat.significado[0];
        emotion = "neutral";
        symbol = "Libra";
    } else if (message.toLowerCase().includes("frequency")) {
        response = data.colossal.ANUSET_189_NEXUS_TITANICO_MITO.meta_info.frecuencia_primaria;
        emotion = "neutral";
        symbol = "189Hz";
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

    return {
        text: response,
        emotion: emotion,
        symbol: symbol
    };
}

function findDeity(name, deidades) {
    for (const mythology of deidades.MITOLOGIAS_CHECKLIST_CODE_SCHEMA.checklists) {
        for (const deity of mythology.deidades_esquematicas) {
            if (deity.name.toLowerCase() === name.toLowerCase()) {
                return deity;
            }
        }
    }
    return null;
}
