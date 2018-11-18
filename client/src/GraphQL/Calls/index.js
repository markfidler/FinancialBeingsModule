import gql from 'graphql-tag';


export const FINANCIAL_BEINGS = gql`
  query FB {
  financialBeings_FinancialBeings {
    id
    type
    kind
    name
    slug
    avatar
    creator
    status {
      status
      reason
    }
    updatedOn
    createdOn
    team
    admins {
      adminId
    }
  }
}
`;

export const FB_BY_NAME = gql`
query financialBeingsByPartialName {
  financialBeingsByPartialName(name: "2") {
    id
    name
    kind
  }
}
`;
