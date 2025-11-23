import Jimp from "jimp";

async function processImage() {
  try {
    const image = await Jimp.read("public/favicon.png");
    
    // Scan all pixels
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];
      const alpha = this.bitmap.data[idx + 3];

      // If pixel is white (or very close to white), make it transparent
      // Using a threshold of 230 to catch off-whites/artifacts
      if (red > 230 && green > 230 && blue > 230) {
        this.bitmap.data[idx + 3] = 0; // Set alpha to 0
      }
    });

    await image.writeAsync("public/favicon.png");
    console.log("Successfully removed white background from favicon.png");
  } catch (error) {
    console.error("Error processing image:", error);
    process.exit(1);
  }
}

processImage();
