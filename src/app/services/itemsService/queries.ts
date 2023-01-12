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

export const ADD_ITEM = gql`
  mutation createItem($name: String!, $description: String!) {
    createItem(name: $name,description: $description) {
            _id
            uuid
            name
            description
            created_at
            updated_at
      }
  }
`;

export const DELETE_ITEM = gql`
  mutation deleteItem($uuid: ID!) {
    deleteItem(uuid: $uuid){
        uuid
    }
  }
`;

export const VERIFY = gql`
  mutation verifyMe($token: String!) {
    verifyMe(token: $token){
        _id
        uuid
        first_name
        last_name
        email
        email_verified_at
        email_verification_token
        created_at
        updated_at
        }
  }
`;

export const SEND_MAIL = gql`
  mutation resendVerificationEmail {
    resendVerificationEmail{
        message
    }
  }
`;

export const UPDATE_ITEM = gql`
  mutation updateItem($name: String!, $description: String!,$uuid: ID!) {
    updateItem(name: $name,description: $description, uuid: $uuid){
        uuid
    }
  }
`;