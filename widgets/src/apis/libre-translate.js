import axios from 'axios';

const api = axios.create({
    baseURL: 'https://libretranslate.de'
});

const libreTranslate = {
    api: api,

    /**
    * Returns array of objects in the following format:
    *   [
    *       {
    *           "code": "string",
    *           "name": "string"
    *       }
    *   ]
    *   @returns {Promise<Array>} Array of objects describing supported languages.
    */
    getLanguages: async () => {
        const response = await api.get('/languages');
        if (response.status !== 200) {
            throw new Error(response.data.error);
        }
        return response.data;
    },

    /**
    * Detect language using text sample.
    * @param {string} text Text sample used to detect language.
    * @return {Promise<string>} Language code.
    */
    detectLanguage: async (text) => {
        const response = await api.post('/detect', {
            q: text
        });
        if (response.status !== 200) {
            throw new Error(response.data.error);
        }
        return response.data[0].language;
    },

    /**
    * Translated specified text from source to target language.
    * @param {string} text Text to translage.
    * @param {string} source Source language code.
    * @param {string} target Target language code.
    * @return {Promise<string>} Translated text.
    */
    translate: async (text, source, target) => {
        const data = {
            q: text,
            source: source,
            target: target
        }
        const response = await api.post('/translate', data);
        if (response.status !== 200) {
            throw new Error(response.data.error);
        }
        return response.data.translatedText;
    }
};

export default libreTranslate;