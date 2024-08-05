// src/api.js

const HOST = 'localhost';
const PORT = 5000;

const BASE_URL = `http://${HOST}:${PORT}`;

const headers = {
    'Content-Type': 'application/json',
    // Add any other default headers you need
};

export const fetchData = async (path) => {
    const url = `${BASE_URL}${path}`;
    try {
        const response = await fetch(url, { headers });
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

export const postData = async (path, body) => {
    const url = `${BASE_URL}${path}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers,
            body
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
