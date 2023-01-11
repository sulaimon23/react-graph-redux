import gql from "graphql-tag";

export const LOG_IN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            user {
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
            token
        }
    }
`;
//
export const SIGN_UP = gql`
    mutation signup(
        $email: String!
        $password: String!
        $first_name: String!
        $last_name: String!
    ) {
        signup(
            email: $email
            password: $password
            first_name: $first_name
            last_name: $last_name
        ) {
            user {
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
            token
        }
    }
`;
