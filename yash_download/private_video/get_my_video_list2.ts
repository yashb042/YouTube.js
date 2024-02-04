import axios from 'axios';

(async () => {

  let pageToken = '';
  for (let i = 0; i < 7; i++) {
    const data = JSON.stringify({
      'filter': {
        'and': {
          'operands': [
            {
              'channelIdIs': {
                'value': 'UCbO39SKQs7hYvrFeHkoQStw'
              }
            },
            {
              'or': {
                'operands': [
                  {
                    'contentTypeIs': {
                      'value': 'CREATOR_CONTENT_TYPE_SHORTS'
                    }
                  },
                  {
                    'and': {
                      'operands': [
                        {
                          'not': {
                            'operand': {
                              'statusIs': {
                                'value': 'VIDEO_STATUS_PROCESSED'
                              }
                            }
                          }
                        },
                        {
                          'isShortsEligible': {}
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      'order': 'VIDEO_ORDER_DISPLAY_TIME_DESC',
      'pageSize': 100,
      'pageToken': pageToken,
      'mask': {
        'channelId': true,
        'videoId': true,
        'lengthSeconds': true,
        'livestream': {
          'all': true
        },
        'publicLivestream': {
          'all': true
        },
        'origin': true,
        'premiere': {
          'all': true
        },
        'publicPremiere': {
          'all': true
        },
        'status': true,
        'thumbnailDetails': {
          'all': true
        },
        'title': true,
        'draftStatus': true,
        'downloadUrl': true,
        'watchUrl': true,
        'shareUrl': true,
        'permissions': {
          'all': true
        },
        'features': {
          'all': true
        },
        'timeCreatedSeconds': true,
        'timePublishedSeconds': true,
        'privacy': true,
        'contentOwnershipModelSettings': {
          'all': true
        },
        'contentType': true,
        'publicShorts': {
          'all': true
        },
        'podcastRssMetadata': {
          'all': true
        },
        'videoLinkageShortsAttribution': {
          'all': true
        },
        'responseStatus': {
          'all': true
        },
        'statusDetails': {
          'all': true
        },
        'description': true,
        'metrics': {
          'all': true
        },
        'thumbnailEditorState': {
          'all': true
        },
        'titleFormattedString': {
          'all': true
        },
        'descriptionFormattedString': {
          'all': true
        },
        'titleDetails': {
          'all': true
        },
        'descriptionDetails': {
          'all': true
        },
        'audienceRestriction': {
          'all': true
        },
        'releaseInfo': {
          'all': true
        },
        'allRestrictions': {
          'all': true
        },
        'inlineEditProcessingStatus': true,
        'videoPrechecks': {
          'all': true
        },
        'shorts': {
          'all': true
        },
        'selfCertification': {
          'all': true
        },
        'videoResolutions': {
          'all': true
        },
        'scheduledPublishingDetails': {
          'all': true
        },
        'visibility': {
          'all': true
        },
        'privateShare': {
          'all': true
        },
        'sponsorsOnly': {
          'all': true
        },
        'unlistedExpired': true,
        'videoTrailers': {
          'all': true
        },
        'remix': {
          'isSource': true
        },
        'isPaygated': true
      },
      'context': {
        'client': {
          'clientName': 62,
          'clientVersion': '1.20240110.00.00',
          'hl': 'en',
          'gl': 'IN',
          'experimentsToken': '',
          'utcOffsetMinutes': 330,
          'userInterfaceTheme': 'USER_INTERFACE_THEME_LIGHT',
          'screenWidthPoints': 990,
          'screenHeightPoints': 959,
          'screenPixelDensity': 2,
          'screenDensityFloat': 2
        },
        'request': {
          'returnLogEntry': true,
          'internalExperimentFlags': [],
          'eats': 'AcIjWyEm9zm/J8HjtXwt9f6OFeKUbyzWhSfrtTxcwzoW1lsvn1oCuDZ6YQmTD4ZF8FKzwqCYtNYmKBXl/dBJx31p98cTfz7qi/SNGA==',
          'consistencyTokenJars': [
            {
              'encryptedTokenJarContents': 'AKreu9suP78pExuptUqVXQ0U8bm66vyfp1XAg3ClLuPNJLlVbhgY3SDC0OnZMXEt2T8HQjsmX-x6hrHFmEKbf7pyc-yUxIzzLHXr5YMglWPDBTcUMjU3GzK-CcyjzZvtO2h66pK_H6_I4meID7s1caf2i1x8nVnGYE2cr-c',
              'expirationSeconds': '600'
            }
          ]
        },
        'user': {
          'delegationContext': {
            'externalChannelId': 'UCbO39SKQs7hYvrFeHkoQStw',
            'roleType': {
              'channelRoleType': 'CREATOR_CHANNEL_ROLE_TYPE_OWNER'
            }
          },
          'serializedDelegationContext': 'EhhVQ2JPMzlTS1FzN2hZdnJGZUhrb1FTdHcqAggI'
        },
        'clientScreenNonce': 'MC4wODc5NTU5NzI1NzAzNjcxNA..'
      }
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://studio.youtube.com/youtubei/v1/creator/list_creator_videos?alt=json&key=AIzaSyBUPetSUmoZL-OhlxA7wSac5XinrygCqMo',
      headers: {
        'authority': 'studio.youtube.com',
        'accept': '*/*',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'authorization': 'SAPISIDHASH 1705311824_c619b6f4f602c63c6dea85d0b2cf7c737a9042be',
        'content-type': 'application/json',
        'cookie': 'VISITOR_INFO1_LIVE=L-EoRdoP1zY; mp_838c65c3e2afe9d50264505a75298594_mixpanel=%7B%22distinct_id%22%3A%20%22189d5b63dd715b3-01a8ff4026e8d5-1a525634-1d73c0-189d5b63dd82701%22%2C%22%24device_id%22%3A%20%22189d5b63dd715b3-01a8ff4026e8d5-1a525634-1d73c0-189d5b63dd82701%22%2C%22%24initial_referrer%22%3A%20%22%24direct%22%2C%22%24initial_referring_domain%22%3A%20%22%24direct%22%2C%22Platform%22%3A%20%22Extension%22%2C%22Is%20Logged%20In%22%3A%20false%2C%22Tier%22%3A%20%22Free%22%7D; NID=511=uKjlF-qc6cyeg7PN80xJpDyh6egtpeBbBNqAei97iPaGc8kPFhfSoRDxbfpKdIeAF0ewEFd4VRp4N39VWvuFB-YXW_uN3_2lMnZr6sMGd8MoC98wbQEttzij0f2iejbokF9NlB6lC7MIs9EaaVKA9Z7sWpBohFjKSdyq9Jhf89wvy974vbWw4uttHtQE25vz; VISITOR_PRIVACY_METADATA=CgJJThIEGgAgMA%3D%3D; YSC=1Ljhq0whSAo; wide=1; _gcl_au=1.1.431421350.1705249929; _ga=GA1.1.187287695.1705249929; _ga_VCGEPY40VB=GS1.1.1705249928.1.1.1705251491.0.0.0; PREF=tz=Asia.Calcutta&f4=4000000&f5=30000&f7=100; SID=fQhkcCXnYeEM6RB-yYvnqyKhpgnBcn4B_2KdR2g3hGfEQr-84WBuwxIq2CbpH-u26ku8-Q.; __Secure-1PSID=fQhkcCXnYeEM6RB-yYvnqyKhpgnBcn4B_2KdR2g3hGfEQr-8K-VojnMaMZ1VxJB6LVUzng.; __Secure-3PSID=fQhkcCXnYeEM6RB-yYvnqyKhpgnBcn4B_2KdR2g3hGfEQr-81KdPY-Uw0i-seTcjxugHww.; HSID=AAEMP_sInIFW32jLH; SSID=A-i-7Vfk0qCFzEdhC; APISID=Zh6DRpiKYqBHFetE/A2rYNnPH8fusFn3xp; SAPISID=BS8pfPMxB6mSwnLA/Aa0FqwA9Z72FOiRbi; __Secure-1PAPISID=BS8pfPMxB6mSwnLA/Aa0FqwA9Z72FOiRbi; __Secure-3PAPISID=BS8pfPMxB6mSwnLA/Aa0FqwA9Z72FOiRbi; __Secure-1PSIDTS=sidts-CjEBPVxjSmzo074G-eTyE7r47SZZNvII7vprhBVUt72dU5ItrERT5vXHrz6NmR-Iv5zTEAA; __Secure-3PSIDTS=sidts-CjEBPVxjSmzo074G-eTyE7r47SZZNvII7vprhBVUt72dU5ItrERT5vXHrz6NmR-Iv5zTEAA; LOGIN_INFO=AFmmF2swRgIhAI31PfO_6u95u02RhkVFQ4YsGFhhW_fky_sqDi5lqjueAiEA5stJ-xsykyu2nEpen5UXtDvCLXyexL46GYKyfCPpKx0:QUQ3MjNmeG1qRVB5cFd6WHVKVG13VVZScDBnMzdndmZPanZ6MFB0MlZrR013X1h3VExXZDFmZHE4LTJxdVltdjNKd1FUTmFVTWJJMUtURm92SkVRSHN5MzFTVEtqaVZKc2lERVRrVWtqelYzWkpKWEZTTEhTYUFQZi1SS3NMS3UyX0VXdldDaUZXYWlNX2hodl9lWEVCZmtGN2tLbHVycGpn; CONSISTENCY=AKreu9suP78pExuptUqVXQ0U8bm66vyfp1XAg3ClLuPNJLlVbhgY3SDC0OnZMXEt2T8HQjsmX-x6hrHFmEKbf7pyc-yUxIzzLHXr5YMglWPDBTcUMjU3GzK-CcyjzZvtO2h66pK_H6_I4meID7s1caf2i1x8nVnGYE2cr-c; SIDCC=ABTWhQHxLINcknKzshC0pz0om-ulhVC7VUEWqJNw4Ym1GCtE6MkZTDmbQ34HhxmvD5DAoZseVIg; __Secure-1PSIDCC=ABTWhQFrvQ4XrAewBygwFLJHJ_yNljtwDRVpzfKjaf3szOYV4C0BS1-HTreAiBa0Z64EkwUYC_fG; __Secure-3PSIDCC=ABTWhQHorNDs6-dGGzOFq74wX_0D208oakZc8aJALaR67Nr_XnnbyVM7Ws3yxOYBAwKh3lu68mo; SIDCC=ABTWhQHBJ0Tqg0mHscuKY6ZyrC0lOVdTWUUt-iXI4Ih1f77TnXrFhSzL4PzGM7grayy4GAuJzts; __Secure-1PSIDCC=ABTWhQEzPZr_R7sEXFxDBspAB0P990YjncOeTbu34TaFzYcAKlxixgTnEZYoPc_qGnSrgN-cV-rh; __Secure-3PSIDCC=ABTWhQHr0rctk_zc3oKJkHc92OgSz6mrqhorxbjyGAGDydpCDC2pd4Zd50XaiAr5i4Fb96mGst0',
        'origin': 'https://studio.youtube.com',
        'referer': 'https://studio.youtube.com/channel/UCbO39SKQs7hYvrFeHkoQStw/videos/short?filter=%5B%5D&sort=%7B%22columnType%22%3A%22date%22%2C%22sortOrder%22%3A%22DESCENDING%22%7D',
        'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        'sec-ch-ua-arch': '"arm"',
        'sec-ch-ua-bitness': '"64"',
        'sec-ch-ua-full-version': '"120.0.6099.216"',
        'sec-ch-ua-full-version-list': '"Not_A Brand";v="8.0.0.0", "Chromium";v="120.0.6099.216", "Google Chrome";v="120.0.6099.216"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-model': '""',
        'sec-ch-ua-platform': '"macOS"',
        'sec-ch-ua-platform-version': '"13.6.2"',
        'sec-ch-ua-wow64': '?0',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'x-client-data': 'CJS2yQEIorbJAQipncoBCLOIywEIlqHLAQiGoM0BCI/hzQEIhOLNAQjf680BCI3vzQEIg/DNAQiG8M0BCLHxzQEIp/LNAQiD9M0BGPTJzQEYyeHNARin6s0B',
        'x-goog-authuser': '4',
        'x-goog-visitor-id': 'CgtMLUVvUmRvUDF6WSjO_JOtBjIKCgJJThIEGgAgMA%3D%3D',
        'x-origin': 'https://studio.youtube.com',
        'x-youtube-ad-signals': 'dt=1705311823366&flash=0&frm&u_tz=330&u_his=15&u_h=1117&u_w=1728&u_ah=1085&u_aw=1728&u_cd=30&bc=31&bih=959&biw=990&brdim=0%2C37%2C0%2C37%2C1728%2C32%2C1728%2C1080%2C990%2C959&vis=1&wgl=true&ca_type=image',
        'x-youtube-client-name': '62',
        'x-youtube-client-version': '1.20240110.00.00',
        'x-youtube-delegation-context': 'EhhVQ2JPMzlTS1FzN2hZdnJGZUhrb1FTdHcqAggI',
        'x-youtube-page-cl': '597306812',
        'x-youtube-page-label': 'youtube.studio.web_20240110_00_RC00',
        'x-youtube-time-zone': 'Asia/Calcutta',
        'x-youtube-utc-offset': '330'
      },
      data: data
    };

    // Console.log(config);
    // @ts-ignore
    const response = await axios.request(config);
    pageToken = response.data.nextPageToken;
    // Console.log(pageToken);
    response.data.videos.forEach((video: { metrics: { viewCount: string; }; videoId: any; }) => {
      const viewCount = parseInt(video.metrics.viewCount);
      if (viewCount < 800) {
        console.log(`${video.videoId}`);
      }
    });
  }
})();
