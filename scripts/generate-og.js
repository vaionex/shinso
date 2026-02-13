import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';

const svg = readFileSync('static/og.svg', 'utf-8');

await sharp(Buffer.from(svg))
  .resize(1200, 630)
  .png({ quality: 95 })
  .toFile('static/og.png');

console.log('Generated static/og.png');
