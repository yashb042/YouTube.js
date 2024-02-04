import {Innertube, UniversalCache} from 'youtubei.js';
import {existsSync, readFileSync, writeFileSync} from 'fs';
// @ts-ignore
import {ReelItem, Video} from 'youtubei.js/dist/src/parser/classes/Video';

(async () => {

    // Const videoList = [ 'rv-SZSi9Rsg',
    //   'MkKE-EtrkLM',
    // ];

    const args = process.argv.slice(2);
    // console.log(args);
    // Const video_id = args[0] || 'https://www.youtube.com/shorts/gIh2UtezfPA';
    const yt = await Innertube.create({cache: new UniversalCache(false)});
    const creds_path = '/Users/yash.bansal/workspace/Character_Versus_Video_Generator/handler/upload/client_secrets_aarav.json';
    const creds = existsSync(creds_path) ? JSON.parse(readFileSync(creds_path).toString()) : undefined;


    yt.session.on('auth-pending', (data: any) => {
      console.info(`Hello!\nOn your phone or computer, go to ${data.verification_url} and enter the code ${data.user_code}`);
    });

    yt.session.on('auth', (data: any) => {
      writeFileSync(creds_path, JSON.stringify(data.credentials));
      console.info('Successfully signed in!');
    });

    yt.session.on('update-credentials', (data: any) => {
      writeFileSync(creds_path, JSON.stringify(data.credentials));
      console.info('Credentials updated!', data);
    });

    const videoList = await getVideoList(yt);
    await yt.session.signIn(creds);
    for (let i = 0; i < videoList.length; i++) {
      const video_id = videoList[i];
      const private_video = await yt.studio.updateVideoMetadata(video_id, {
        privacy: 'PRIVATE'
      });

    }
  }
)();

async function getVideoList(yt: Innertube): Promise<string[]> {
  const channel_id = 'UCbO39SKQs7hYvrFeHkoQStw';
  const channel = await yt.getChannel(channel_id);
  const videoList = await channel.getShorts();


  let videoPrivate = [];
  let firstPublicVideo = '';
  for (const video of videoList.videos) {
    const videoTypeCasted: Video = video as ReelItem; // Typecast s to Video
    if (videoTypeCasted.id === readFileSync('/Users/yash.bansal/workspace/YouTube.js/yash_download/private_video/last_video_id', 'utf-8').split('\n')[0]) {
      writeFileSync('/Users/yash.bansal/workspace/YouTube.js/yash_download/private_video/last_video_id', firstPublicVideo);
      break;
    }
    let views = videoTypeCasted.views.text;
    const viewCount = Number(views.split(' ')[0]);
    if (views.includes('K') || viewCount > 800) {
      if (firstPublicVideo === '') {
        firstPublicVideo = videoTypeCasted.id;
      }
      continue;
    }
    videoPrivate.push(videoTypeCasted.id);
  }

  console.info('Private videos:', videoPrivate);
  return videoPrivate;
}
