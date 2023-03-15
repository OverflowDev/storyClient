import { gql } from "@apollo/client";

export const FETCH_POSTS_QUERY = gql`
    query PostsQuery {
        getPosts {
            id
            title
            content
            username
            category
            # imageurl
            createdAt
        }
    }
`
export const FETCH_POST_QUERY = gql`
    query PostQuery($postId: ID!) {
        getPost(postId: $postId) {
            id
            title
            content
            username
            category
            # imageurl
            createdAt
        }
    }
`

export const CREATE_POST_MUTATION = gql`
    mutation createPost(
        $title: String!, 
        $content: String!, 
        $category: ID!
        ) {
        createPost(
            postInput: {
            title: $title 
            content: $content
            category: $category
            }
        ) {
            id
            title
            content
            category
            username
            createdAt
        }
    }
`


export const DELETE_POST_MUTATION = gql`
    mutation DeletePostMutation($postId: ID!) {
        deletePost(postId: $postId) {
            id
        }
    }
`