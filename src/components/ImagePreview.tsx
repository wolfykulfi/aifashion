import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface ImagePreviewProps {
  preview: string | null;
  fileName: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ preview, fileName }) => {
  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
      {preview ? (
        <div className="relative aspect-square w-full">
          <img 
            src={preview} 
            alt={fileName} 
            className="object-contain w-full h-full p-2"
          />
        </div>
      ) : (
        <div className="flex items-center justify-center aspect-square bg-gray-100">
          <ImageIcon className="h-12 w-12 text-gray-400" />
        </div>
      )}
    </div>
  );
};

export default ImagePreview;