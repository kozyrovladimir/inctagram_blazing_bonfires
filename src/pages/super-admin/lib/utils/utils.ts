// LoginAdmin requires basic authorization with provided userName and password as base64 string
export function getAdminBasicCredentials() {
  const username = 'admin@gmail.com'
  const password = 'admin'

  return btoa(`${username}:${password}`)
}
