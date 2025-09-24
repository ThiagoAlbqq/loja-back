interface AuthenticatedUser {
  id: string
  email: string
  roles: string[]
  iat: number
  exp: number
}
