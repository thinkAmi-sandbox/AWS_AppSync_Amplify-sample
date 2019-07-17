import Amplify, {Auth} from 'aws-amplify';
import awsconfig from './aws-exports';


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


// aws-exports.js に従って、サインイン処理
const loginButton = document.getElementById('signIn');
loginButton.addEventListener('click', async () => {
  await signInUsingCognito(true);
});


// 既存Cognitoを明示的に指定してサインイン処理
const signInWithExistingButton = document.getElementById('signInWithExisting');
signInWithExistingButton.addEventListener('click', async() => {
  await signInUsingCognito(false);
});


const signInUsingCognito = async (use_aws_exports) => {
  if (use_aws_exports) {
    Amplify.configure(awsconfig);
  }
  else {
    Amplify.configure({
      Auth: {
        // TODO replace for your environment
        identityPoolId: 'xxx',
        region: 'us-east-1',
        userPoolId: 'us-east-1_ZTS1WF17W',
        userPoolWebClientId: 'xxx',
      }
    });
  }

  const username = document.getElementById('user').value;

  await Auth.signIn(username, '11111111')
    .then( user => {
      showUsername(user);
      document.getElementById('message').innerText = ''
    })
    .catch(e => {
      console.log(Object.keys(e));
      console.log(e['message']);
      document.getElementById('message').innerText = e['message'];
    })
};


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
  console.log(targetUser);
  document.getElementById('signedInUser').innerText = targetUser.username;
};


// ユーザ名の非表示
const clearUserName = () => {
  document.getElementById('signedInUser').innerText = ''
};


