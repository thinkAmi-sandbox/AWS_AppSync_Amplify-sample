// eslint-disable
// this is an auto generated file. This will be overwritten

export const listBoards = `query ListBoards($limit: Int, $nextToken: String) {
  listBoards(limit: $limit, nextToken: $nextToken) {
    items {
      key
      author
      content
    }
    nextToken
  }
}
`;
export const getNoneDatasource = `query GetNoneDatasource {
  getNoneDatasource {
    comment
  }
}
`;
export const getByPipeline = `query GetByPipeline($id: String!) {
  getByPipeline(id: $id) {
    id
    title
    author_id
    author_name
  }
}
`;
