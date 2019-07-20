import Amplify, {API} from 'aws-amplify';
import awsconfig from './aws-exports';
import * as queries from "./graphql/queries";
import * as mutations from "./graphql/mutations";


const queryButton = document.getElementById('query');
queryButton.addEventListener('click', () => {
  console.log('Run Query!');
  Amplify.configure(awsconfig);
  API.graphql(
    {
      query: queries.getTodo,
      authMode: 'AWS_IAM',
      variables: {
        title: "Hello, title!"
      }
    }
  ).then((data) => {
    console.log(data);
  })
    .catch((e) => {
      console.log('error!');
      console.log(e)
    });
});


const mutationButton = document.getElementById('mutation');
mutationButton.addEventListener('click', () => {
  console.log('Run Mutation!');

  const title = document.getElementById('title').value;
  Amplify.configure(awsconfig);
  API.graphql(
    {
      query: mutations.createTodo,
      authMode: 'AWS_IAM',
      variables: {
        input: {
          title: title,
          content: "hello"
        }
      }
    }
  ).then((data) => {
    console.log(data);
  })
    .catch((e) => {
      console.log('error!');
      console.log(e)
    });
});