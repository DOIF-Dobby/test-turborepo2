export default function (source) {
  // this.resourceQuery로 ?raw 확인
  if (this.resourceQuery && this.resourceQuery.includes('raw')) {
    // 문자열로 export
    return `export default ${JSON.stringify(source)}`
  }

  // ?raw가 없으면 원본 그대로 반환 (다음 로더로 전달)
  return source
}
