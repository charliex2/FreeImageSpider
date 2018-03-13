const request = require("request");
const fs = require("fs");

const url =
  "https://unsplash.com/napi/photos?page=1&per_page=2&order_by=latest";
const options = {
  url,
  headers: {
    authorization:
      "Client-ID c94869b36aa272dd62dfaeefed769d4115fb3189a9d1ec88ed457207747be626"
  }
};

request(options, (error, response, body) => {
  let images = JSON.parse(body);
  for (const image of images) {
    console.log(image);
    request(image.urls.raw).pipe(
      fs.createWriteStream("images/" + image.id + ".jpg")
    );
  }
});
