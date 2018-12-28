import { REMOTE_URL } from './constants/';

export const config = () => {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  fetch(`${REMOTE_URL}/weixin/getsignature`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: window.location.href.split('#')[0],
    }),
  })
    .then(res => res.json().then((json) => {
      window.wx.config({
        appId: json.appId,
        timestamp: json.timestamp,
        nonceStr: json.nonceStr,
        signature: json.signature,
        jsApiList: [
          'chooseImage',
          'previewImage',
          'uploadImage',
          'downloadImage',
        ],
      });
    }));
};
