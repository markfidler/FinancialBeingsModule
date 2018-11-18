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
  financialBeings_FinancialBeingsByPartialName(name: "2") {
    id
    name
    kind
  }
}
`;

export const FB_BY_ID = gql`
query financialBeingsByID {
  financialBeings_FinancialBeingsByID(id: $id) {
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
