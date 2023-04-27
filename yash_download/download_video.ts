import {createWriteStream, existsSync, mkdirSync, readFileSync, writeFileSync} from 'fs';
import {Innertube, UniversalCache, Utils} from 'youtubei.js';

const creds_path = '/Users/yash.bansal/workspace/Youtube comment/client_secrets.json';
const creds = existsSync(creds_path) ? JSON.parse(readFileSync(creds_path).toString()) : undefined;

// /opt/homebrew/bin/ts-node /Users/yash.bansal/workspace/insta/index.ts /Users/yash.bansal/workspace/insta/uploaded/abdevilliers17/out.mp4 Yash Bansal

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
(async () => {
  const args = process.argv.slice(2);
  console.log(args);
  const yt = await Innertube.create({cache: new UniversalCache(false)});

  const stream = await yt.download('uDYTr8jjDw0' as string, {
    type: 'video+audio', // Audio, video or video+audio
    quality: '720p', // Best, bestefficiency, 144p, 240p, 480p, 720p and so on.
    format: 'mp4' // Media container format
  });

  console.info('Downloading this song');

  const dir = `${process.cwd()}/downloaded`;

  if (!existsSync(dir)) {
    mkdirSync(dir);
  }

  const file = createWriteStream(`${dir}/final.mp4`);

  for await (const chunk of Utils.streamToIterable(stream)) {
    file.write(chunk);
  }

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

})();

/*
// uDYTr8jjDw0 - Youtube Id
 */