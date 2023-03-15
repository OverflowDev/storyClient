import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id
            username
            createdAt
            token
        }
    }
`

export const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            id
            username
            createdAt
            token
        }
    }
`