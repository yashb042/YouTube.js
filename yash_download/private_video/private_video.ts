import {Innertube, UniversalCache} from 'youtubei.js';
import {existsSync, readFileSync, writeFileSync} from 'fs';


(async () => {

  const videoList = [ 'rv-SZSi9Rsg',
    'MkKE-EtrkLM',
    'nVqySW6OoX4',
    'Zid-JuKGBA8',
    'cJ4bag_UR-E',
    '-1d0CsLtB9Y',
    'E_grJSUWaR0',
    'boN5cigair4',
    'z9uT84c4sHw',
    'Tha5ivacv4M',
    'MUFjs4eFqWc',
    'Nm3JiJXNJfo',
    'YKGeNdsraFQ',
    '3oQX5rZCLqI',
    'SxCeIPZIY0Q',
    'RryAaeN5dUc',
    'OvLTjgjzRms',
    '81N_WkiD3nE',
    'lbg1XNtgJQc',
    '9cCl-n9oS-k',
    'v6H37Qu1lXo',
    'y-L00CdTB88',
    'recGY3lK8tU',
    '5LXtTo8CLuk',
    'LTJEqQweiZA',
    'XLGJkhOW0Fk',
    'G3kuzcbOdss',
    'VH-QJAo2hso',
    'y9hzbHBivYg',
    '2a54VGmOqZw',
    'y82PBI__Csw',
    '5Bpz1hZjf7A',
    'QFBiNLFzLyA',
    'H3UEeL7BekY',
    'c1xxEAhBeE4',
    'SJ4oVdu3IUY',
    'AiBeGRkR31k',
    'kBXufe69_JE',
    'uf5MdZVzX3E',
    '9godNB2lrDs',
    'nzLeK541818',
    'o5QTAM-DaQ4',
    'd1MlvJlhXFE',
    '_5oVTDHxx18',
    'ynjDjkyeOnY',
    'bbyxFrBPCbU',
    'HKBLlU-yojY',
    'Q9V9aZAETtU',
    'gNQ1qqQmW2Y',
    'NfcQir0CacQ',
    'ajBsWa-xphE',
    'nqNtHfOMy6g',
    'YbU3_1am9oU',
    'yUEmjzZqDxw',
    'S7sESSkNkmM',
    '7x3OfiNmjm4',
    'JlG-GIdL96Y',
    'xacvhtmLKFU',
    'uAGGFR6hgb8',
    'YcTstosevTI',
    'Gi3tUITsPRU',
    'EbGUGFVpRpE',
    'USvgZNjLR8g',
    'zOmWNy1VfvQ',
    'eQifEvgiSqE',
    'q3tzbjahiTQ',
    'nKCbOpsqncE',
    'HMpOKUpiGFE',
    'uh9I0I_x4Xw',
    'IDWsgii5AHY',
    'ZIZy8MHn0pQ',
    'gtCJVfoNzLo',
    '4Nk4iDGaDKM',
    '269v8hEWgC8',
    'cY4UvEkQtcM',
    'ijO2HOc__QA',
    'Gj6SysXjy3Y',
    'XKm_1UbgQNI',
    'pWMOR8Npxfo',
    'WyrgozJDGS8',
    'B-7ICsD2XzQ',
    '_97prgj8JxI'
  ];

  const args = process.argv.slice(2);
  console.log(args);
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

  await yt.session.signIn(creds);
  for (let i = 0; i < videoList.length; i++) {
    const video_id = videoList[i];
    const private_video = await yt.studio.updateVideoMetadata(video_id, {
      privacy: 'PRIVATE'
    });

  }
}
)();
