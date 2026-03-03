type ArrayToMapResult<T, K extends keyof T, V extends keyof T> = {
  [Key in T[K] & PropertyKey]: Extract<T, Record<K, Key>>[V]
}

/**
 * 객체 배열을 특정 키와 값으로 매핑된 단일 객체로 변환합니다.
 */
export function arrayToMap<T, K extends keyof T, V extends keyof T>(
  array: readonly T[],
  keyField: K,
  valueField: V,
): ArrayToMapResult<T, K, V> {
  return Object.fromEntries(
    array.map((item) => [item[keyField], item[valueField]]),
  ) as ArrayToMapResult<T, K, V>
}
