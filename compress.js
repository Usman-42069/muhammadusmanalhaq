const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      await processDirectory(fullPath);
    } else {
      const ext = path.extname(fullPath).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        const outPath = fullPath.replace(new RegExp(`\\${ext}$`, 'i'), '.webp');
        try {
          await sharp(fullPath)
            .resize({ width: 1200, withoutEnlargement: true })
            .webp({ quality: 75 })
            .toFile(outPath);
          console.log(`Optimized: ${outPath}`);
          if (fullPath !== outPath) {
            fs.unlinkSync(fullPath);
          }
        } catch (e) {
          console.error(`Error processing ${fullPath}:`, e);
        }
      }
    }
  }
}

processDirectory(path.join(__dirname, 'public', 'projects'))
  .then(() => console.log('All images optimized!'))
  .catch(console.error);
