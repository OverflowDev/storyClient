import { gql } from "@apollo/client";

export const FETCH_POSTS_QUERY = gql`
    query PostsQuery {
        getPosts {
            id
            title
            content
            chapter
            name
            username
            category
            imageUrl
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
            chapter
            name
            username
            category
            imageUrl
            createdAt
        }
    }
`

// export const CREATE_POST_MUTATION = gql`
//     mutation CreatePost(
//         $title: String!, 
//         $content: String!, 
//         $category: ID!,
//         $image: Upload!
//         ) {
//         createPost(
//             postInput: {
//             title: $title 
//             content: $content
//             category: $category
//             image: $image
//             }
//         ) {
//             id
//             title
//             content
//             category
//             username
//             imageUrl
//             createdAt
//         }
//     }
// `
export const CREATE_POST_MUTATION = gql`
    mutation CreatePost($postInput: PostInput!) {
        createPost(postInput: $postInput) {
            id
            title
            content
            chapter
            category
            name
            username
            imageUrl
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
