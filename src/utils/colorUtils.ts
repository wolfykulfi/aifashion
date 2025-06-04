import ColorThief from 'colorthief';
import nearestColor from 'nearest-color';

// Color name mapping
const colorNames = {
  black: '#000000',
  navy: '#000080',
  darkblue: '#00008B',
  mediumblue: '#0000CD',
  blue: '#0000FF',
  darkgreen: '#006400',
  green: '#008000',
  teal: '#008080',
  darkcyan: '#008B8B',
  deepskyblue: '#00BFFF',
  darkturquoise: '#00CED1',
  mediumspringgreen: '#00FA9A',
  lime: '#00FF00',
  springgreen: '#00FF7F',
  aqua: '#00FFFF',
  cyan: '#00FFFF',
  midnightblue: '#191970',
  dodgerblue: '#1E90FF',
  lightseagreen: '#20B2AA',
  forestgreen: '#228B22',
  seagreen: '#2E8B57',
  darkslategray: '#2F4F4F',
  limegreen: '#32CD32',
  mediumseagreen: '#3CB371',
  turquoise: '#40E0D0',
  royalblue: '#4169E1',
  steelblue: '#4682B4',
  darkslateblue: '#483D8B',
  mediumturquoise: '#48D1CC',
  indigo: '#4B0082',
  darkolivegreen: '#556B2F',
  cadetblue: '#5F9EA0',
  cornflowerblue: '#6495ED',
  rebeccapurple: '#663399',
  mediumaquamarine: '#66CDAA',
  dimgray: '#696969',
  slateblue: '#6A5ACD',
  olivedrab: '#6B8E23',
  slategray: '#708090',
  lightslategray: '#778899',
  mediumslateblue: '#7B68EE',
  lawngreen: '#7CFC00',
  chartreuse: '#7FFF00',
  aquamarine: '#7FFFD4',
  maroon: '#800000',
  purple: '#800080',
  olive: '#808000',
  gray: '#808080',
  skyblue: '#87CEEB',
  lightskyblue: '#87CEFA',
  blueviolet: '#8A2BE2',
  darkred: '#8B0000',
  darkmagenta: '#8B008B',
  saddlebrown: '#8B4513',
  darkseagreen: '#8FBC8F',
  lightgreen: '#90EE90',
  mediumpurple: '#9370DB',
  darkviolet: '#9400D3',
  palegreen: '#98FB98',
  darkorchid: '#9932CC',
  yellowgreen: '#9ACD32',
  sienna: '#A0522D',
  brown: '#A52A2A',
  darkgray: '#A9A9A9',
  lightblue: '#ADD8E6',
  greenyellow: '#ADFF2F',
  paleturquoise: '#AFEEEE',
  lightsteelblue: '#B0C4DE',
  powderblue: '#B0E0E6',
  firebrick: '#B22222',
  darkgoldenrod: '#B8860B',
  mediumorchid: '#BA55D3',
  rosybrown: '#BC8F8F',
  darkkhaki: '#BDB76B',
  silver: '#C0C0C0',
  mediumvioletred: '#C71585',
  indianred: '#CD5C5C',
  peru: '#CD853F',
  chocolate: '#D2691E',
  tan: '#D2B48C',
  lightgray: '#D3D3D3',
  thistle: '#D8BFD8',
  orchid: '#DA70D6',
  goldenrod: '#DAA520',
  palevioletred: '#DB7093',
  crimson: '#DC143C',
  gainsboro: '#DCDCDC',
  plum: '#DDA0DD',
  burlywood: '#DEB887',
  lightcyan: '#E0FFFF',
  lavender: '#E6E6FA',
  darksalmon: '#E9967A',
  violet: '#EE82EE',
  palegoldenrod: '#EEB8AA',
  lightcoral: '#F08080',
  khaki: '#F0E68C',
  aliceblue: '#F0F8FF',
  honeydew: '#F0FFF0',
  azure: '#F0FFFF',
  sandybrown: '#F4A460',
  wheat: '#F5DEB3',
  beige: '#F5F5DC',
  whitesmoke: '#F5F5F5',
  mintcream: '#F5FFFA',
  ghostwhite: '#F8F8FF',
  salmon: '#FA8072',
  antiquewhite: '#FAEBD7',
  linen: '#FAF0E6',
  lightgoldenrodyellow: '#FAFAD2',
  oldlace: '#FDF5E6',
  red: '#FF0000',
  fuchsia: '#FF00FF',
  magenta: '#FF00FF',
  deeppink: '#FF1493',
  orangered: '#FF4500',
  tomato: '#FF6347',
  hotpink: '#FF69B4',
  coral: '#FF7F50',
  darkorange: '#FF8C00',
  lightsalmon: '#FFA07A',
  orange: '#FFA500',
  lightpink: '#FFB6C1',
  pink: '#FFC0CB',
  gold: '#FFD700',
  peachpuff: '#FFDAB9',
  navajowhite: '#FFDEAD',
  moccasin: '#FFE4B5',
  bisque: '#FFE4C4',
  mistyrose: '#FFE4E1',
  blanchedalmond: '#FFEBCD',
  papayawhip: '#FFEFD5',
  lavenderblush: '#FFF0F5',
  seashell: '#FFF5EE',
  cornsilk: '#FFF8DC',
  lemonchiffon: '#FFFACD',
  floralwhite: '#FFFAF0',
  snow: '#FFFAFA',
  yellow: '#FFFF00',
  lightyellow: '#FFFFE0',
  ivory: '#FFFFF0',
  white: '#FFFFFF'
};

const getColorName = nearestColor.from(colorNames);

export interface ColorInfo {
  hex: string;
  name: string;
  percentage: number;
}

export const analyzeColors = async (imageUrl: string): Promise<ColorInfo[]> => {
  const colorThief = new ColorThief();
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    
    img.onload = () => {
      try {
        // Get color palette (8 colors)
        const palette = colorThief.getPalette(img, 8);
        if (!palette || palette.length === 0) {
          return reject(new Error('No colors found in image.'));
        }

        // Draw image to canvas to access pixel data
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('Failed to get canvas context'));
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, img.width, img.height).data;

        // Helper to get distance between two colors
        function colorDistance(c1: number[], c2: number[]) {
          return Math.sqrt(
            Math.pow(c1[0] - c2[0], 2) +
            Math.pow(c1[1] - c2[1], 2) +
            Math.pow(c1[2] - c2[2], 2)
          );
        }

        // Count pixels closest to each palette color
        const counts = new Array(palette.length).fill(0);
        let totalPixels = 0;
        for (let i = 0; i < imageData.length; i += 4) {
          const r = imageData[i];
          const g = imageData[i + 1];
          const b = imageData[i + 2];
          const a = imageData[i + 3];
          // Ignore fully transparent pixels
          if (a === 0) continue;
          totalPixels++;
          // Find closest palette color
          let minDist = Infinity;
          let minIdx = 0;
          for (let j = 0; j < palette.length; j++) {
            const dist = colorDistance([r, g, b], palette[j]);
            if (dist < minDist) {
              minDist = dist;
              minIdx = j;
            }
          }
          counts[minIdx]++;
        }

        // Convert to hex and get percentages
        const colors = palette.map((color, index) => {
          const [r, g, b] = color;
          const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
          const name = getColorName(hex).name;
          const percentage = totalPixels > 0 ? Math.round((counts[index] / totalPixels) * 100) : 0;
          return {
            hex,
            name,
            percentage
          };
        });
        
        resolve(colors);
      } catch (error) {
        reject(new Error('Failed to analyze colors'));
      }
    };
    
    img.onerror = () => reject(new Error('Failed to load image for color analysis'));
    img.src = imageUrl;
  });
};