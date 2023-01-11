import gql from "graphql-tag";

export const GET_ITEMS = gql`
  query getItems($page: Int!, $count: Int!) {
    getItems(page: $page,count: $count) {
        items {
            _id
            uuid
            name
            description
            created_at
            updated_at
        }
      }
  }
`;
