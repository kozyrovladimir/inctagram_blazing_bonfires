import { gql } from '@/__generated__'

export const ADMIN_LOGIN = gql(`
  mutation LoginAdmin($email: String!, $password: String!) {
  loginAdmin(email: $email, password: $password) {
    logged
  }
}
`)
