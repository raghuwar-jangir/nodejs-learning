const { Buffer } = require("buffer");
// While the Buffer module is available within the global scope,
//  the Node documentation still recommends importing it explicitly

const buffer = Buffer.alloc(5, "a"); //<Buffer 61 61 61 61 61> // ascii hexadecimal

const bufferFromStr = Buffer.from("Raghu"); //<Buffer 52 61 67 68 75>

const mixBuffer = Buffer.concat([buffer, bufferFromStr]); //<Buffer 61 61 61 61 61 52 61 67 68 75>

mixBuffer.toString(); //aaaaaRaghu
