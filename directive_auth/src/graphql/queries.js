// eslint-disable
// this is an auto generated file. This will be overwritten

export const getTodo = `query GetTodo($id: ID!) {
  getTodo(id: $id) {
    id
    name
    description
  }
}
`;
export const listTodos = `query ListTodos(
  $filter: ModelTodoFilterInput
  $limit: Int
  $nextToken: String
) {
  listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
    }
    nextToken
  }
}
`;


export const awsAuth = `query awsAuth(
  $filter: ModelTodoFilterInput
  $limit: Int
  $nextToken: String
) {
  awsAuth(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
    }
    nextToken
  }
}
`;

export const awsAuthField = `query awsAuthField(
  $filter: ModelTodoFilterInput
  $limit: Int
  $nextToken: String
) {
  awsAuthField(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
    }
    nextToken
  }
}
`;

export const awsCognito = `query awsCognito(
  $filter: ModelTodoFilterInput
  $limit: Int
  $nextToken: String
) {
  awsCognito(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
    }
    nextToken
  }
}
`;

export const awsWithoutDescription = `query awsWithoutDescription(
  $filter: ModelTodoFilterInput
  $limit: Int
  $nextToken: String
) {
  awsWithoutDescription(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
    }
    nextToken
  }
}
`;

export const awsWithoutDefault = `query awsWithoutDefault(
  $filter: ModelTodoFilterInput
  $limit: Int
  $nextToken: String
) {
  awsWithoutDefault(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
    }
    nextToken
  }
}
`;
