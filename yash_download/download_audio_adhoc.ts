import {createWriteStream, existsSync, mkdirSync, readFileSync, writeFileSync} from 'fs';
import {Innertube, UniversalCache, Utils} from 'youtubei.js';
import url from 'url';

const creds_path = '/Users/yash.bansal/workspace/Youtube comment/client_secrets.json';
const creds = existsSync(creds_path) ? JSON.parse(readFileSync(creds_path).toString()) : undefined;

// /opt/homebrew/bin/ts-node /Users/yash.bansal/workspace/insta/index.ts /Users/yash.bansal/workspace/insta/uploaded/abdevilliers17/out.mp4 Yash Bansal

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
(async () => {
  const yt = await Innertube.create({cache: new UniversalCache(false)});

  //https://youtube.com/shorts/_5Y7EnyzBRY?feature=share

  // const videos = [ 'https://www.youtube.com/shorts/2AVMulISMlo', 'https://www.youtube.com/shorts/fCtrM8XR4ps', 'https://www.youtube.com/shorts/iKvOk4tRc6o', 'https://www.youtube.com/shorts/9Lm2mPXy52M', 'https://www.youtube.com/shorts/ncIq6e56YmM' ];
  const videos = [ 'https://www.youtube.com/watch?v=IYFrmr_GFck' ];
  const output_video_name = 'video_7.mp4';
  for (let i = 0; i < videos.length; i++) {
    const video_id = videos[i];
    const base_path = '/Users/yash.bansal/workspace/YouTube.js/downloaded/song_audios';

    const stream = await yt.download(getVideoId(video_id), {
      type: 'video+audio', // Audio, video or video+audio
      quality: 'bestefficiency', // Best, bestefficiency, 144p, 240p, 480p, 720p and so on.
      format: 'mp4' // Media container format
    });

    console.info('Downloading this song');

    if (!existsSync(base_path)) {
      mkdirSync(base_path);
    }

    const file = createWriteStream(`${base_path}/${output_video_name}`);

    for await (const chunk of Utils.streamToIterable(stream)) {
      file.write(chunk);
    }
  }
})();


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function getVideoId(youtubeUrl): string {
  const parsedUrl = url.parse(youtubeUrl);
  const query = parsedUrl.query || '';
  let videoIdMatch;
  if ((parsedUrl.host === 'www.youtube.com' || parsedUrl.host === 'www.youtube.com') && parsedUrl.pathname != null && parsedUrl.pathname.includes('/watch')) {
    videoIdMatch = query.match(/v=([^&]+)/);
    if (videoIdMatch) {
      return videoIdMatch[1];
    }
  } else if ((parsedUrl.host === 'youtube.com' || parsedUrl.host === 'www.youtube.com') && parsedUrl.pathname != null && parsedUrl.pathname.includes('/shorts')) {
    videoIdMatch = parsedUrl.pathname.split('/')[2];
    if (videoIdMatch) {
      return videoIdMatch;
    }
  }
  return '';
}
