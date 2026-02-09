export function triggerChange(element: HTMLInputElement, value: string) {
  element.setCustomValidity('')
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    'value',
  )?.set
  nativeInputValueSetter?.call(element, value)
  element.dispatchEvent(new Event('input', { bubbles: true }))
}
