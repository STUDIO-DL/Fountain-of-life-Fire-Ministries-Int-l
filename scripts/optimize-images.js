const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imagesDir = path.join(__dirname, '..', 'src', 'images');

const galleryPhotos = ['photo1.jpg', 'photo2.jpg', 'photo3.jpg', 'photo4.jpg', 'photo5.jpg'];

async function optimizeGalleryPhoto(filename) {
    const inputPath = path.join(imagesDir, filename);
    const baseName = path.basename(filename, '.jpg');
    const webpPath = path.join(imagesDir, `${baseName}.webp`);

    const image = sharp(inputPath);
    const metadata = await image.metadata();
    const shouldResize = metadata.width > 800;

    let pipeline = sharp(inputPath).rotate();
    if (shouldResize) {
        pipeline = pipeline.resize({
            width: 800,
            withoutEnlargement: true,
            fit: 'inside'
        });
    }

    await pipeline
        .jpeg({ quality: 82, mozjpeg: true })
        .toFile(`${inputPath}.tmp`);

    await sharp(`${inputPath}.tmp`)
        .webp({ quality: 80 })
        .toFile(webpPath);

    fs.renameSync(`${inputPath}.tmp`, inputPath);

    return {
        file: filename,
        jpegKb: (fs.statSync(inputPath).size / 1024).toFixed(1),
        webpKb: (fs.statSync(webpPath).size / 1024).toFixed(1)
    };
}

async function optimizeVisionPhoto() {
    const filename = 'IMG-20240807-WA0040.jpg';
    const inputPath = path.join(imagesDir, filename);
    const webpPath = path.join(imagesDir, 'IMG-20240807-WA0040.webp');

    await sharp(inputPath)
        .rotate()
        .resize(720, 720, { fit: 'cover', position: 'centre' })
        .jpeg({ quality: 82, mozjpeg: true })
        .toFile(`${inputPath}.tmp`);

    await sharp(`${inputPath}.tmp`)
        .webp({ quality: 80 })
        .toFile(webpPath);

    fs.renameSync(`${inputPath}.tmp`, inputPath);

    return {
        file: filename,
        jpegKb: (fs.statSync(inputPath).size / 1024).toFixed(1),
        webpKb: (fs.statSync(webpPath).size / 1024).toFixed(1)
    };
}

async function optimizeHeroBackground() {
    const pngPath = path.join(imagesDir, 'imgSucursal.png');
    const jpgPath = path.join(imagesDir, 'imgSucursal.jpg');
    const webpPath = path.join(imagesDir, 'imgSucursal.webp');

    const resized = sharp(pngPath).rotate().resize({
        width: 1400,
        withoutEnlargement: true,
        fit: 'inside'
    });

    await resized.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(jpgPath);
    await resized.clone().webp({ quality: 82 }).toFile(webpPath);
    await resized.clone().png({ compressionLevel: 9, palette: true }).toFile(`${pngPath}.tmp`);
    fs.renameSync(`${pngPath}.tmp`, pngPath);

    return {
        file: 'imgSucursal',
        pngKb: (fs.statSync(pngPath).size / 1024).toFixed(1),
        jpegKb: (fs.statSync(jpgPath).size / 1024).toFixed(1),
        webpKb: (fs.statSync(webpPath).size / 1024).toFixed(1)
    };
}

async function main() {
    console.log('Optimizing gallery photos...');
    for (const photo of galleryPhotos) {
        const result = await optimizeGalleryPhoto(photo);
        console.log(`  ${result.file}: JPEG ${result.jpegKb} KB, WebP ${result.webpKb} KB`);
    }

    console.log('Optimizing vision photo...');
    const vision = await optimizeVisionPhoto();
    console.log(`  ${vision.file}: JPEG ${vision.jpegKb} KB, WebP ${vision.webpKb} KB`);

    console.log('Optimizing hero background...');
    const hero = await optimizeHeroBackground();
    console.log(`  ${hero.file}: PNG ${hero.pngKb} KB, JPEG ${hero.jpegKb} KB, WebP ${hero.webpKb} KB`);

    console.log('Done.');
}

main().catch(error => {
    console.error(error);
    process.exit(1);
});
