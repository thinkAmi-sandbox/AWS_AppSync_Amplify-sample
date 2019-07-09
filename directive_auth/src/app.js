import Amplify, {API, Auth} from 'aws-amplify';
import awsconfig from './aws-exports';
import * as queries from './graphql/queries';


// @auth系のディレクティブがないQueryを実行
const queryButton = document.getElementById('listTodo');
queryButton.addEventListener('click', async () => {
  Amplify.configure(awsconfig);

  await API.graphql(
    {
      query: queries.listTodos,
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    }
  ).then((event) => {
      console.log('ok');
      console.log(event.data.listTodos.items[0]);
  }).catch((e) => {
    console.log('error!');
    console.log(e);
  });
});


// @aws_auth をQuery自体に付けた場合
const awsAuthButton = document.getElementById('awsAuth');
awsAuthButton.addEventListener('click', async () => {
  Amplify.configure(awsconfig);

  await API.graphql(
    {
      query: queries.awsAuth,
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    }
  ).then((event) => {
    console.log('ok');
    console.log(event.data.awsAuth.items[0]);
  }).catch((e) => {
    console.log('error!');
    console.log(e);
  });
});

// @aws_auth をFieldに付けた場合
const awsAuthFieldButton = document.getElementById('awsAuthField');
awsAuthFieldButton.addEventListener('click', async () => {
  Amplify.configure(awsconfig);

  await API.graphql(
    {
      query: queries.awsAuthField,
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    }
  ).then((event) => {
    console.log('ok');
    console.log(event.data.awsAuthField.items[0]);
  }).catch((e) => {
    console.log('error!');
    console.log(e);
  });
});


// 複数Authで、@aws_api_keyとaws_cognito_user_poolsを付けた場合
const awsCognitoButton = document.getElementById('awsCognito');
awsCognitoButton.addEventListener('click', async () => {
  Amplify.configure(awsconfig);

  await API.graphql(
    {
      query: queries.awsCognito,
      authMode: 'API_KEY'
      // authMode: 'AMAZON_COGNITO_USER_POOLS'
    }
  ).then((event) => {
    console.log('ok');
    console.log(event.data.awsCognito.items[0]);
  }).catch((e) => {
    console.log('error!');
    console.log(e);
  });
});


// Multi Authで、@aws_api_keyとaws_cognito_user_poolsを付け、fieldの一部が許可されていない場合
const awsCognitoWithoutDescriptionButton = document.getElementById('awsCognitoWithoutDescription');
awsCognitoWithoutDescriptionButton.addEventListener('click', async () => {
  Amplify.configure(awsconfig);

  await API.graphql(
    {
      query: queries.awsCognitoWithoutDescription,
      authMode: 'API_KEY'
      // authMode: 'AMAZON_COGNITO_USER_POOLS'
    }
  ).then((event) => {
    console.log('ok');
    console.log(event.data.awsCognito.items[0]);
  }).catch((e) => {
    console.log('error!');
    console.log(e);
  });
});


// Multi Authで、デフォルト認証である @aws_cognito_user_pools がない場合に、デフォルト認証の方でアクセスする場合
const awsWithoutDefaultButton = document.getElementById('awsWithoutDefault');
awsWithoutDefaultButton.addEventListener('click', async () => {
  Amplify.configure(awsconfig);

  await API.graphql(
    {
      query: queries.awsWithoutDefault,
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    }
  ).then((event) => {
    console.log('ok');
    console.log(event.data.awsWithoutDefault.items[0]);
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