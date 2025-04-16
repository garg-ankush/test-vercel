import { useState } from 'react';

export default function TranslationApp() {
  const [inputText, setInputText] = useState('');
  const [translation, setTranslation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to translate');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Note: In a real application, you would call your backend which would handle the Claude API call
      // This is a placeholder for the API call structure
      const response = await fetch('your-backend-api-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          targetLanguage: 'hindi'
        }),
      });

      if (!response.ok) {
        throw new Error('Translation failed');
      }

      const data = await response.json();
      setTranslation(data.translation);
    } catch (err) {
      setError('Error translating text. Please try again.');
      console.error('Translation error:', err);
      
      // For demo purposes, simulate a successful response
      // Remove this in your actual implementation
      setTimeout(() => {
        if (inputText.toLowerCase().includes('hello')) {
          setTranslation('नमस्ते');
        } else if (inputText.toLowerCase().includes('how are you')) {
          setTranslation('आप कैसे हैं?');
        } else if (inputText.toLowerCase().includes('i am coming')) {
          setTranslation('मैं आ रहा हूँ।');
        } else if (inputText.toLowerCase().includes('thank you')) {
          setTranslation('धन्यवाद');
        } else {
          setTranslation(`[${inputText} का हिंदी अनुवाद]`);
        }
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">English to Hindi Translator</h1>
      
      <div className="mb-4">
        <label htmlFor="inputText" className="block text-sm font-medium text-gray-700 mb-1">
          Enter English Text
        </label>
        <textarea
          id="inputText"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type English text here..."
        />
      </div>
      
      <button
        onClick={handleTranslate}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
      >
        {loading ? 'Translating...' : 'Translate to Hindi'}
      </button>
      
      {error && (
        <div className="mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {translation && (
        <div className="mt-6">
          <h2 className="text-lg font-medium text-gray-700 mb-2">Hindi Translation:</h2>
          <div className="p-3 bg-gray-100 rounded-md">
            <p className="text-lg">{translation}</p>
          </div>
        </div>
      )}
      
      <p className="mt-6 text-xs text-gray-500 text-center">
        Powered by Claude API
      </p>
    </div>
  );
}