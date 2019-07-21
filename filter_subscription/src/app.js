import Amplify, { API } from 'aws-amplify';
import awsconfig from './aws-exports';
import * as mutations from "./graphql/mutations";
import * as subscriptions from "./graphql/subscriptions";


// データ作成
const creteButton = document.getElementById('create');
creteButton.addEventListener('click', () => {
  Amplify.configure(awsconfig);
  API.graphql(
    {
      query: mutations.createBlog,
      authMode: 'API_KEY',
      variables: {
        input: {
          title: document.getElementById('title').value,
          content: document.getElementById('content').value,
        }
      }
    }
  ).then((data) => {
    console.log('created: target data.');
    console.log(data);
  })
    .catch((e) => {
      console.log('mutation error');
      console.log(e)
    });
});


// --------------------------
// Subscriptions
// --------------------------

// non filter
const nonFilterButton = document.getElementById('none');
nonFilterButton.addEventListener('click', () => {
  Amplify.configure(awsconfig);

  console.log('subscribe(none): start...');

  const client = API.graphql(
    {
      query: subscriptions.none,
      authMode: 'API_KEY',
    }
  ).subscribe({
    next: (data) => {
      console.log('subscribed: none');
      console.log(data);
      // 一回通知を受け取ったら、それ以降は受け取らないようにする
      client.unsubscribe();
      console.log('finish: none');
    },
    error: (err) => {
      console.log(err);
      client.unsubscribe();
      console.log('sub error (none)');
    },
    close: () => console.log('sub done')
  })
});


// title filter
const titleFilterButton = document.getElementById('title_only');
titleFilterButton.addEventListener('click', () => {
  Amplify.configure(awsconfig);

  console.log('subscribe(title): start...');

  const client = API.graphql(
    {
      query: subscriptions.titleOnly,
      authMode: 'API_KEY',
      variables: {
        title: "foo"
      }
    }
  ).subscribe({
    next: (data) => {
      console.log('subscribed: title');
      console.log(data);
      client.unsubscribe();
      console.log('finish: title');
    },
    error: (err) => {
      console.log(err);
      client.unsubscribe();
      console.log('sub error (title)');
    },
    close: () => console.log('sub done')
  })
});


const allButton = document.getElementById('all');
allButton.addEventListener('click', () => {
  Amplify.configure(awsconfig);

  console.log('subscribe(all): start...');

  const client = API.graphql(
    {
      query: subscriptions.all,
      authMode: 'API_KEY',
      variables: {
        title: "foo",
        content: "bar"
      }
    }
  ).subscribe({
    next: (data) => {
      console.log('subscribed: all');
      console.log(data);
      client.unsubscribe();
      console.log('finish: all');
    },
    error: (err) => {
      console.log(err);
      client.unsubscribe();
      console.log('sub error (all)');
    },
    close: () => console.log('sub done')
  })
});
