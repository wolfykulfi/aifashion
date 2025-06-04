import imageCompression from 'browser-image-compression';

export interface ProcessedImage {
  file: File;
  preview: string;
  dimensions: {
    width: number;
    height: number;
  };
}

export const processImage = async (file: File): Promise<ProcessedImage> => {
  // Validate file type
  if (!file.type.startsWith('image/')) {
    throw new Error('Please select an image file');
  }

  // Compression options
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: 'image/jpeg'
  };

  try {
    // Compress the image
    const compressedFile = await imageCompression(file, options);
    
    // Generate preview URL
    const preview = await imageCompression.getDataUrlFromFile(compressedFile);
    
    // Get image dimensions
    const dimensions = await new Promise<{ width: number; height: number }>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height
        });
      };
      img.onerror = () => reject(new Error('Failed to load image dimensions'));
      img.src = preview;
    });

    return {
      file: compressedFile,
      preview,
      dimensions
    };
  } catch (error) {
    throw new Error('Failed to process image. Please try again.');
  }
};