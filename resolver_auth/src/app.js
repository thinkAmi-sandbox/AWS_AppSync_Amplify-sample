import Amplify, { Auth, API } from 'aws-amplify';
import awsconfig from './aws-exports';
import * as queries from "./graphql/queries";


const goButton = document.getElementById('goButton');
goButton.addEventListener('click', async () => {
  Amplify.configure(awsconfig);

  await API.graphql(
    {
      query: queries.getContext,
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    }
  ).then((event) => {
    console.log('ok');
    console.log(event.data.getContext);
    // =>
    // claims:
    // "{sub=xxx,
    //   cognito:groups=[member],  <= groupが設定されている場合のみ存在するキー
    //   event_id=xxx,
    //   token_use=access,
    //   scope=aws.cognito.signin.user.admin,
    //   auth_time=nnn,
    //   iss=https://cognito-idp.<region>.amazonaws.com/<region>_xxx,
    //   exp=xxx,
    //   iat=xxx,
    //   jti=xxx,
    //   client_id=xxx,
    //   username=foo}"
    //
    // headers:
    // "{x-forwarded-for=xxx.xxx.xxx.xxx, yyy.yyy.yyy.yyy,
    //   cloudfront-is-tablet-viewer=false,
    //   cloudfront-viewer-country=JP,
    //   pragma=no-cache,
    //   via=2.0 xxx.cloudfront.net (CloudFront),
    //   cloudfront-forwarded-proto=https,
    //   origin=http://localhost:8080,
    //   content-length=149,
    //   cache-control=no-cache,
    //   host=<host>.appsync-api.<region>.amazonaws.com,
    //   x-forwarded-proto=https,
    //   accept-language=ja,en-US;q=0.9,en;q=0.8,
    //   user-agent=Mozilla/5.0 ...,
    //   cloudfront-is-mobile-viewer=false,
    //   accept=application/json, text/plain, */*,
    //   cloudfront-is-smarttv-viewer=false,
    //   accept-encoding=gzip, deflate, br,
    //   referer=http://localhost:8080/,
    //   content-type=application/json; charset=UTF-8,
    //   x-amz-cf-id=xxx,
    //   x-amzn-trace-id=Root=xxx,
    //   authorization=xxx,
    //   cloudfront-is-desktop-viewer=true,
    //   x-forwarded-port=443}"
    //
    // identity:
    // "{sub=xxx,
    //   issuer=https://cognito-idp.<region>.amazonaws.com/<region>_xxx,
    //   username=foo,
    //   claims={...},
    //   sourceIp=[...],
    //   defaultAuthStrategy=ALLOW,
    //   groups=null}"
    //
    // request:
    //   実質headersしか入っていなかったので略

  }).catch((e) => {
    console.log('error!');
    console.log(e);
  });


});


// ロード時の処理
window.onload = async () => {
  Amplify.configure(awsconfig);
  await Auth.currentAuthenticatedUser()
    .then(user => showUsername(user))
    .catch(e => {
      console.log('load error:' + e);
      clearUserName();
    });
};


// サインイン処理
const loginButton = document.getElementById('signIn');
loginButton.addEventListener('click', async() => {
  Amplify.configure(awsconfig);

  const username = document.getElementById('user').value;

  await Auth.signIn(username, '11111111')
    .then( user => showUsername(user))
    .catch(e => console.log('SignIn Error: ' + e))
});


// パスワードの強制変更
const newPasswordButton = document.getElementById('newPw');
newPasswordButton.addEventListener('click', async() => {
  Amplify.configure(awsconfig);

  const username = document.getElementById('user').value;

  await Auth.signIn(username, '22222222')
    .then(async user => {
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        // パスワード変更が強制されるため、変更する
        await Auth.completeNewPassword(user, '11111111', {})
        // 変更できたら、ユーザー情報を表示
          .then(user => showUsername(user))
          // エラーが発生したら、内容を表示
          .catch(e => console.log('new password error: ' + e))
      }
      else {
        console.log('Oops! reason: ' + user.challengeName);
      }
    })
    .catch(e => console.log('before New password error: ' + e))
});


// サインアウト
const signOutButton = document.getElementById('signOut');
signOutButton.addEventListener('click', async() => {
  Amplify.configure(awsconfig);

  await Auth.signOut({ global: true })
    .then(data => {
      console.log('sign out! data :' + data);
      clearUserName();
    })
    .catch(e => console.log('SignOut Error: ' + e));
});


// ユーザ名の表示
const showUsername = (targetUser) => {
  console.log(targetUser.username);
  document.getElementById('signedInUser').innerText = targetUser.username;
};


// ユーザ名の非表示
const clearUserName = () => {
  document.getElementById('signedInUser').innerText = ''
};