import { capitalize, pascalCase } from 'es-toolkit/string'

/**
 * 첫글자를 대문자로 바꾼다.
 */
export const capitalizeFirstLetter = (str: string) => capitalize(str)

/**
 * 파스칼 케이스로 변환한다.
 */
export const toPascalCase = (str: string) => pascalCase(str)
