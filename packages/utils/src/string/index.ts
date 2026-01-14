/**
 * 첫글자를 대문자로 바꾼다.
 */
export function capitalizeFirstLetter(str: string) {
  if (!str) {
    return ''
  }

  return str.charAt(0).toUpperCase() + str.slice(1)
}
