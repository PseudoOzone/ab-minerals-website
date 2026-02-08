import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const inputPath = join(rootDir, 'public', 'logo-abm.png');

// Generate different sizes
const sizes = [
  { size: 32, output: join(rootDir, 'src', 'app', 'icon.png') },
  { size: 180, output: join(rootDir, 'src', 'app', 'apple-icon.png') },
  { size: 192, output: join(rootDir, 'public', 'icon-192.png') },
  { size: 512, output: join(rootDir, 'public', 'icon-512.png') },
];

async function generateFavicons() {
  for (const { size, output } of sizes) {
    await sharp(inputPath)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(output);
    console.log(`Generated ${size}x${size}: ${output}`);
  }
  console.log('Done!');
}

generateFavicons().catch(console.error);
