# Image Compression Function

This code provides a function to compress an image file while maintaining its aspect ratio. The function takes in a file object, a maximum width, and a maximum height as input and returns a Blob object.

## Installation

No installation is necessary for this code. Simply copy and paste the function into your JavaScript file.

## Usage

To use the function, call it with the following parameters:

Replace `file` with a File object, `MAX_WIDTH` with the maximum width (in pixels) you want the compressed image to have, and `MAX_HEIGHT` with the maximum height (in pixels) you want the compressed image to have.

The function returns a Promise that resolves with a Blob object representing the compressed image.

## Examples

Here's an example of how to use the function:

```javascript
const file = new File(['image'], 'test.jpg', { type: 'image/jpeg' });
const MAX_WIDTH = 800;
const MAX_HEIGHT = 600;
compressImage(file, MAX_WIDTH, MAX_HEIGHT).then((blob) => {
  console.log(blob);
});
```

## Parameters
The compressImage function takes in the following parameters:

* `file`: A File object representing the image file to compress.
* `MAX_WIDTH`: A number representing the maximum width of the compressed image.
* `MAX_HEIGHT`: A number representing the maximum height of the compressed image.

## Return Value
The `compressImage` function returns a Promise that resolves to a compressed Blob object.

## Implementation Details
The `compressImage` function first creates a URL for the input file using the `createObjectURL` method. It then creates an `HTMLImageElement` and sets its source to the URL. If the image fails to load, the function rejects the Promise with an error message.

Once the image has loaded, the function calculates the new width and height for the compressed image while maintaining its aspect ratio using the `calculateSize` function. It then creates a new canvas element and sets its dimensions to the calculated width and height.

Next, the function draws the image onto the `canvas` using the drawImage method. It then calls the `toBlob` method on the canvas to create a compressed Blob object. The `toBlob` method takes in the MIME type of the output image (in this case, "image/jpeg") and a quality value between 0 and 1.

If the toBlob method is successful, the function resolves the Promise with the compressed Blob object. If not, it rejects the Promise with an error message.

The `calculateSize` function takes in an HTMLImageElement, a maximum width, and a maximum height as input and returns a tuple of the new width and height for the compressed image while maintaining its aspect ratio. The function first sets the width and height variables to the image's natural width and height.

It then checks if the width is greater than the height. If so, it checks if the width is greater than the maximum width. If it is, it calculates the new height based on the maximum width and the original aspect ratio and sets the width to the maximum width. If the height is greater than the maximum height, it calculates the new width based on the maximum height and the original aspect ratio and sets the height to the maximum height.

If the height is greater than the width, the function performs the same calculations but using the height instead of the width.

The function returns a tuple of the new width and height values.

## Contributing
Feel free to contribute to this code by opening an issue or submitting a pull request.
