import { useState } from 'react';
import axios from 'axios';

const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', 'f20d0d5a468630de2f68100f349f6705');

    try {
      setUploading(true);
      const response = await axios.post('https://api.imghippo.com/v1/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setImageUrl(response.data.url);
      setUploading(false);
      return response;
    } catch (err) {
      setError(err);
      setUploading(false);
      throw err;
    }
  };

  return { uploadImage, uploading, error, imageUrl };
};

export default useImageUpload;