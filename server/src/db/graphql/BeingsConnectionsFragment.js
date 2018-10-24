const gql = require('graphql-tag');

const BEINGS_CONNECTIONS_FRAGMENT = gql`{
    edges {
        node {
            id
            type
            kind
            name
            slug
            avatar
            status {
                status
                reason
                createdAt
            }
            updatedAt
            createdAt
            team {
                id
                name
                slug
                owner
                status {
                    status
                    reason
                    createdAt
                }
                createdAt
                profile {
                    avatar
                    banner
                    description
                    motto
                    updatedAt
                }
                members {
                    role
                    email
                    member {
                        alias
                        authId
                    }
                    status {
                        id
                        status
                        reason
                        createdAt
                    }
                }
            }
            parent {
                id
                type
                kind
                name
                slug
                avatar
                status {
                    status
                    reason
                    createdAt
                }
                updatedAt
                createdAt
                team {
                    id
                    name
                    slug
                    owner
                    status {
                        status
                        reason
                        createdAt
                    }
                    createdAt
                    profile {
                        avatar
                        banner
                        description
                        motto
                        updatedAt
                    }
                    members {
                        role
                        email
                        member {
                            alias
                            authId
                        }
                        status {
                            id
                            status
                            reason
                            createdAt
                        }
                    }
                }
            }
        }
    }
}`;

module.exports = BEINGS_CONNECTIONS_FRAGMENT;
