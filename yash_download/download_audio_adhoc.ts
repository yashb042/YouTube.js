import {createWriteStream, existsSync, mkdirSync, readFileSync} from 'fs';
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


  const videos = [ 'https://www.youtube.com/shorts/Fmr8IiHC8bU',
    'https://www.youtube.com/shorts/F8_q_zJm67U',
    'https://www.youtube.com/shorts/SLa9hNUOxjU',
    'https://www.youtube.com/shorts/nIXl7vQlaiA',
    'https://www.youtube.com/shorts/n_sqCejA-uk',
    'https://www.youtube.com/shorts/pXq9qYw5FcU' ];
  for (let i = 0; i < videos.length; i++) {
    const video_id = videos[i];
    const base_path = '/Users/yash.bansal/workspace/Character_Versus_Video_Generator/test/girls';

    const videoId = getVideoId(video_id);
    const stream = await yt.download(videoId, {
      type: 'video+audio', // Audio, video or video+audio
      quality: 'bestefficiency', // Best, bestefficiency, 144p, 240p, 480p, 720p and so on.
      format: 'mp4' // Media container format
    });

    console.info('Downloading this song');

    if (!existsSync(base_path)) {
      mkdirSync(base_path);
    }

    let video_name = '';
    const basicInfo = await yt.getBasicInfo(videoId);

    if (basicInfo.basic_info && basicInfo.basic_info.title) {
      video_name = basicInfo.basic_info.title.toString();
      console.info('Video name:', video_name);
    }

    // Video_name = video_name.split('#')[0];
    try {
      const file = createWriteStream(`${base_path}/${video_name}.mp4`);

      for await (const chunk of Utils.streamToIterable(stream)) {
        file.write(chunk);
      }
    } catch (e) {
      console.error(e);
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
