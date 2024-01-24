import { ChangeEvent } from 'react'
/** LoginAdmin requires basic authorization with provided userName and password as base64 string */
export function getAdminBasicCredentials() {
  const username = 'admin@gmail.com'
  const password = 'admin'

  return btoa(`${username}:${password}`)
}

/**
 * Utility function used with the useRef hook to add a delay
 * for input value search.
 *
 * @param setSearchValue - Function to set the search value.
 * @param delay - Delay in milliseconds before updating the search value.
 */
let timeoutId: NodeJS.Timeout

export const handleSearchChange = (setSearchValue: (value: string) => void, delay: number) => {
  return (e: ChangeEvent<HTMLInputElement>) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      setSearchValue(e.target.value)
    }, delay)
  }
}
