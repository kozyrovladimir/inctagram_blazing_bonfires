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

export const handleInputChange = (setSearchValue: (value: string) => void, delay: number) => {
  return (e: ChangeEvent<HTMLInputElement>) => {
    // 2. If i add another symbol -> previous timeout is cleared, and new added
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    // 1. If i add symbol to input -> creates timeoutId, add delay
    timeoutId = setTimeout(() => {
      setSearchValue(e.target.value)
    }, delay)
  }
}
