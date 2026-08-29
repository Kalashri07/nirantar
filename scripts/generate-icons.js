import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '..', 'public');

const svg192 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192" width="192" height="192">
  <rect width="192" height="192" rx="40" fill="#102A43"/>
  <rect x="20" y="20" width="152" height="152" rx="28" fill="#1B3A57" stroke="#C9B69C" stroke-width="4"/>
  <g transform="translate(48, 48) scale(4)" fill="none" stroke="#F3EBDD" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
    <path d="M6 6h10"/>
    <path d="M6 10h10"/>
    <path d="M12 18l4-4"/>
    <path d="M16 14l-4-4"/>
  </g>
</svg>`;

const svg512 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="100" fill="#102A43"/>
  <rect x="52" y="52" width="408" height="408" rx="72" fill="#1B3A57" stroke="#C9B69C" stroke-width="10"/>
  <g transform="translate(128, 128) scale(10.66)" fill="none" stroke="#F3EBDD" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
    <path d="M6 6h10"/>
    <path d="M6 10h10"/>
    <path d="M12 18l4-4"/>
    <path d="M16 14l-4-4"/>
  </g>
</svg>`;

const svgMaskable = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" fill="#102A43"/>
  <g transform="translate(154, 154) scale(8.5)" fill="none" stroke="#F3EBDD" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
    <path d="M6 6h10"/>
    <path d="M6 10h10"/>
    <path d="M12 18l4-4"/>
    <path d="M16 14l-4-4"/>
  </g>
</svg>`;

async function generate() {
  fs.writeFileSync(path.join(publicDir, 'pwa-192x192.svg'), svg192);
  fs.writeFileSync(path.join(publicDir, 'pwa-512x512.svg'), svg512);

  await sharp(Buffer.from(svg192))
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'pwa-192x192.png'));

  await sharp(Buffer.from(svg512))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-512x512.png'));

  await sharp(Buffer.from(svg192))
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));

  await sharp(Buffer.from(svgMaskable))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'maskable-icon-512x512.png'));

  console.log('✅ Generated all PWA icons in PNG & SVG formats!');
}

generate().catch(console.error);
