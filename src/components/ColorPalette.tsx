import React from 'react';
import type { ColorInfo } from '../utils/colorUtils';

interface ColorPaletteProps {
  colors: ColorInfo[];
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ colors }) => {
  // Sort colors in descending order of percentage
  const sortedColors = [...colors].sort((a, b) => b.percentage - a.percentage);
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Color Palette</h3>
      <div className="grid gap-3">
        {sortedColors.map((color, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div 
              className="w-12 h-12 rounded-lg shadow-inner"
              style={{ backgroundColor: color.hex }}
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {color.name}
              </p>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-gray-500">{color.hex}</p>
                <span className="text-gray-300">•</span>
                <p className="text-sm text-gray-500">{color.percentage}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPalette