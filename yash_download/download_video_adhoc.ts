import {createWriteStream, existsSync, mkdirSync, readFileSync, writeFileSync} from 'fs';
import {Innertube, UniversalCache, Utils} from 'youtubei.js';
import * as url from 'url';


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
(async () => {
  const yt = await Innertube.create({cache: new UniversalCache(false)});
  const video_id = 'https://www.youtube.com/watch?v=kZx3E77pvPQ';
  const base_path = '/Users/yash.bansal/workspace/YouTube.js/downloaded';
  const output_video_name = 'goku.mp4';
  const [ stream ] = await Promise.all([ yt.download(getVideoId(video_id), {
    type: 'video+audio', // Audio, video or video+audio
    quality: 'bestefficiency', // Best, bestefficiency, 144p, 240p, 480p, 720p and so on.
    format: 'mp4' // Media container format
  }) ]);

  console.info('Downloading this video');

  const dir = `${base_path}`;

  if (!existsSync(dir)) {
    mkdirSync(dir);
  }

  const file = createWriteStream(`${dir}/${output_video_name}`);

  for await (const chunk of Utils.streamToIterable(stream)) {
    file.write(chunk);
  }
})();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function getVideoId(youtubeUrl): string {
  const parsedUrl = url.parse(youtubeUrl);
  const query = parsedUrl.query || '';
  let videoIdMatch;
  if (parsedUrl.host === 'www.youtube.com' && parsedUrl.pathname != null && parsedUrl.pathname.includes('/watch')) {
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