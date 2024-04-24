// src/api.js
async function fetchUserCards(title, username) {
    try {
        const response = await fetch(`/sessions/details/${title}`, {
            headers: {
                'Content-Type': 'application/json',
                'Username': username
            },
        });
        if (!response.ok) {throw new Error(`HTTP error! Status: ${response.status}`);}
        return await response.json();
    } catch (error) {
        console.error("Error fetching user cards:", error);
        throw error;
    }
}

async function addToBank(title, userName, cardId) {
    try {
        const response = await fetch(`/sessions/${title}/bank`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName, cardId }),
        });
        if (!response.ok) {throw new Error('Failed to add card to bank');}
        return await response.json();
    } catch (error) {
        console.error('Error moving card to bank:', error);
        throw error;
    }
}

async function addToProperty(title, userName, cardId){
    try {
        const response = await fetch(`/sessions/${title}/property`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName, cardId }),
        });
        if (!response.ok) {throw new Error('Failed to add card to property');}
        return await response.json();
    } catch (error) {
        console.error('Error moving card to property:', error);
    }
}

export { fetchUserCards, addToBank, addToProperty };
