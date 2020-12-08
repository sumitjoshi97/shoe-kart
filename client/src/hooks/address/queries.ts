import gql from 'graphql-tag'

export const fetchAddressQuery = gql`
  query {
    userInfo {
      address {
        street
        locality
        city
        state
        landmark
        contactNumber
      }
    }
  }
`

export const addAddressMutation = gql`
  mutation($address: AddressInput!) {
    addUserInfo(address: $address) {
      _id
    }
  }
`

export const updateAddressMutation = gql`
  mutation($address: UpdateAddressInput!) {
    updateUserInfo(address: $address) {
      _id
    }
  }
`
