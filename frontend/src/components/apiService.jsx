/**
 * API Service for Ocular Disease Screening
 * Replace the base URL with your actual backend API endpoint
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

/**
 * Process retinal fundus image
 * @param {File} imageFile - The uploaded image file
 * @returns {Promise<Object>} Analysis results
 */
export const processRetinalImage = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch(`${API_BASE_URL}/analyze`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
};

/**
 * Get demo images list
 * @returns {Promise<Array>} List of demo images
 */
export const getDemoImages = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/demo-images`);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching demo images:', error);
    throw error;
  }
};

/**
 * Download analysis report
 * @param {string} analysisId - The analysis ID
 * @returns {Promise<Blob>} PDF report blob
 */
export const downloadReport = async (analysisId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/report/${analysisId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.error('Error downloading report:', error);
    throw error;
  }
};

