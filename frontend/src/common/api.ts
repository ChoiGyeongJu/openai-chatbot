import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchOpenAIResponse = async (message: string): Promise<string> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/chat`, { message });
    return response.data.message;
  } catch (error) {
    throw new Error('Fetch Fail');
  }
};
