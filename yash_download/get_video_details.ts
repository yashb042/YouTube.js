import {Innertube, UniversalCache, YTNodes} from 'youtubei.js';
import {existsSync, readFileSync, writeFileSync} from 'fs';
// @ts-ignore
import Video from 'youtubei.js/dist/src/parser/classes/Video';


const creds_path = '/Users/yash.bansal/workspace/Youtube comment/client_secrets.json';
const creds = existsSync(creds_path) ? JSON.parse(readFileSync(creds_path).toString()) : undefined;


(async () => {
  const args = process.argv.slice(2);
  console.log(args);
  const yt = await Innertube.create({cache: new UniversalCache(false)});

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

  await yt.session.signIn(creds);

  const channel = await yt.getChannel('UC-91UA-Xy2Cvb98deRXuggA');

  if (channel.header?.is(YTNodes.C4TabbedHeader)) {
    console.info('Viewing channel:', channel?.header?.author.name);
    console.info('Family Safe:', channel.metadata.is_family_safe);
  }

  console.info('\nVideos:');
  const videos = await channel.getVideos();

  for (const video of videos.videos) {
    console.info('stop');
    console.info('Video:', video.title.toString());
    console.info(video.as(Video).id);
  }

  // console.info('\nPopular videos:');
  // const popular_videos = await videos.applyFilter('Popular');
  // for (const video of popular_videos.videos) {
  //     console.info('Video:', video.title.toString());
  // }
})();