/**
 * 금액 입력 핸들러 (숫자, 콤마, 소수점, 음수 처리)
 */
export function onInputAmount(
  e: React.FormEvent<HTMLInputElement>,
  integerPartLength: number = 9,
  allowDecimals: boolean = true,
) {
  const input = e.currentTarget
  const originalValue = input.value
  const cursorPosition = input.selectionStart || 0

  // 1. 숫자, 소수점, 마이너스 부호만 남기기
  let rawValue = originalValue.replace(/[^\d.-]/g, '')

  // 2. 마이너스 부호 처리 (맨 앞에만 위치하도록 보정)
  const isNegative = rawValue.startsWith('-')
  rawValue = rawValue.replace(/-/g, '')
  if (isNegative) rawValue = '-' + rawValue

  // 3. 소수점 처리
  if (!allowDecimals) {
    rawValue = rawValue.split('.')[0] ?? ''
  } else {
    const parts = rawValue.split('.')
    if (parts.length > 2) {
      rawValue = parts[0] + '.' + parts.slice(1).join('')
    }
  }

  // 4. 정수부와 소수부 분리
  const parts = rawValue.split('.')
  let integerPart = parts[0] ?? ''
  let decimalPart = parts[1]

  // --- 핵심: -0 및 선행 0 처리 로직 ---
  const sign = integerPart.startsWith('-') ? '-' : ''
  let absInteger = integerPart.replace(/^-/, '')

  // absInteger가 0으로 시작하고 그 뒤에 숫자가 더 있다면 (예: 01, 05) 앞의 0 제거
  if (absInteger.length > 1 && absInteger.startsWith('0')) {
    absInteger = absInteger.replace(/^0+/, '') || '0'
  }

  // 정수부 길이 제한
  if (absInteger.length > integerPartLength) {
    absInteger = absInteger.slice(0, integerPartLength)
  }

  // 최종 정수부 조립 (입력 중인 '-' 또는 '-0' 상태 유지)
  integerPart = sign + absInteger

  // 소수부 2자리 제한
  if (decimalPart !== undefined && decimalPart.length > 2) {
    decimalPart = decimalPart.slice(0, 2)
  }

  // 5. 최종 포맷팅 (콤마 추가)
  // absInteger가 비어있는 경우는 사용자가 "-"만 입력한 상태임
  const formattedInteger =
    absInteger === '' && isNegative
      ? '-'
      : sign + absInteger.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  const formattedValue =
    decimalPart !== undefined
      ? `${formattedInteger}.${decimalPart}`
      : formattedInteger

  // 6. 커서 위치 계산
  const charsBeforeCursor = originalValue
    .slice(0, cursorPosition)
    .replace(/[^\d-]/g, '').length

  input.value = formattedValue

  let newCursorPos = 0
  let charCount = 0

  for (
    let i = 0;
    i < formattedValue.length && charCount < charsBeforeCursor;
    i++
  ) {
    const char = formattedValue[i]
    if (char && /[\d-]/.test(char)) {
      charCount++
    }
    newCursorPos = i + 1
  }

  if (originalValue[cursorPosition - 1] === '.') {
    newCursorPos = formattedValue.indexOf('.') + 1
  }

  input.setSelectionRange(newCursorPos, newCursorPos)
}

/**
 * 키다운 핸들러 (입력 제한)
 */
export function onKeyDownAmount(
  e: React.KeyboardEvent<HTMLInputElement>,
  allowDecimals: boolean = true,
  integerPartLength: number = 9,
) {
  const input = e.currentTarget
  const cursorPosition = input.selectionStart || 0
  const value = input.value

  const allowedKeys = [
    'Backspace',
    'Tab',
    'ArrowLeft',
    'ArrowRight',
    'Delete',
    'Enter',
    allowDecimals && '.',
    '-',
  ]

  if (e.ctrlKey || e.metaKey) return

  // 마이너스 부호: 맨 앞이고 아직 없을 때만 허용
  if (e.key === '-') {
    if (cursorPosition !== 0 || value.includes('-')) {
      e.preventDefault()
    }
    return
  }

  // 소수점 중복 체크
  if (e.key === '.' && value.includes('.')) {
    e.preventDefault()
    return
  }

  // 숫자 및 허용 키 체크
  if (!allowedKeys.includes(e.key) && !(e.key >= '0' && e.key <= '9')) {
    e.preventDefault()
    return
  }

  // 정수부 길이 체크
  const absValue = value.replace(/^-/, '').replaceAll(',', '')
  const dotIndex = absValue.indexOf('.')
  const integerPart = dotIndex === -1 ? absValue : absValue.slice(0, dotIndex)

  if (
    e.key >= '0' &&
    e.key <= '9' &&
    integerPart.length >= integerPartLength &&
    (value.indexOf('.') === -1 || cursorPosition <= value.indexOf('.'))
  ) {
    e.preventDefault()
  }
}
