import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
    mutation register(
        $name: String!
        $username: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                name: $name
                username: $username
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id
            name
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