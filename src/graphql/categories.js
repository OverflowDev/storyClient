import { gql } from "@apollo/client";

export const FETCH_CATEGORIES_QUERY = gql`
    query PostsQuery {
        getCategories {
            id
            name
        }
    }
`