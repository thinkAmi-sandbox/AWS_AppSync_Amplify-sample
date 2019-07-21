// eslint-disable
// this is an auto generated file. This will be overwritten

export const none = `subscription None {
  none {
    title
    content
  }
}
`;
export const titleOnly = `subscription TitleOnly($title: String!) {
  titleOnly(title: $title) {
    title
    content
  }
}
`;
export const all = `subscription All($title: String!, $content: String) {
  all(title: $title, content: $content) {
    title
    content
  }
}
`;
