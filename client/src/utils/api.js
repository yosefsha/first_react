// src/api.js

const HOST = 'localhost';
const PORT = 5000;

const BASE_URL = `http://${HOST}:${PORT}`;


export const fetchData = async (path) => {
    const url = `${BASE_URL}${path}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

/**
 * @param {string} path
 * @param {object} body
 * @param {object} headers - Optional default is 'Content-Type': 'application/json'
 * @returns {Promise<object>}
 */

export const postData = async (path, body, headers) => {
    const url = `${BASE_URL}${path}`;
    for (const key in body) {
        if (body[key] === undefined) {
            delete body[key];
        }
    }
    const headersToUse = headers || {
        'Content-Type': 'application/json'
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: headersToUse['Content-Type'] == 'application/json' ? JSON.stringify(body) : body,
            headers: headersToUse
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

// Add other HTTP methods (PUT, DELETE, etc.) similarly
