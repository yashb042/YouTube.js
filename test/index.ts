import {AwesomeQR} from 'awesome-qr';

import fs from 'fs';


const background = fs.readFileSync('/Users/yash.bansal/Downloads/1500x900_343409-bmtc-1.jpg');
(async () => {
  const buffer = await new AwesomeQR({
    text: '',
    size: 500,
    backgroundImage: background,
    maskPattern : 100,
    colorDark: '#FF66FF',
  }).draw();

  // @ts-ignore
  fs.writeFileSync('qrcode5.png', buffer);
})();