import * as v from 'valibot'

export function vRequired(errorMessage: string) {
  return v.pipe(
    v.nullable(v.string()),
    v.custom((val) => !!val, errorMessage),
  )
}

export function vRequiredMultiple(errorMessage: string, min = 1) {
  return v.pipe(
    v.array(v.string()),
    v.minLength(min, errorMessage),
  )
}