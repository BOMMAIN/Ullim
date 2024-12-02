// services/vision.ts
export const detectTextFromImage = async (file: File) => {
    const apiKey = process.env.REACT_APP_GOOGLE_CLOUD_API_KEY;
    const visionApiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
  
    try {
      const base64Image = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
  
      const response = await fetch(visionApiUrl, {
        method: 'POST',
        body: JSON.stringify({
          requests: [{
            image: { content: base64Image.split(',')[1] },
            features: [{ type: "TEXT_DETECTION" }]
          }]
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      const result = await response.json();
    console.log('Vision API Response:', JSON.stringify(result, null, 2)); //디버깅
      return result.responses[0]?.textAnnotations[0]?.description || '';
    } catch (error) {
      console.error('Vision API Error Details:', error); // 상세 에러 로깅
      throw error;
    }
  };

const urlToFile = async (url: string): Promise<File> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], 'image.jpg', { type: 'image/jpeg' });
  };
  

export const analyzeImage = async (imageUrl: string) => {
    const file = await urlToFile(imageUrl);
    return detectTextFromImage(file);
};