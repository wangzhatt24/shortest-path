export default function createSpanAndFormat(content: string, padding: string, backgroundColor: string, border: string, borderRadius: string): HTMLSpanElement {
  const span = document.createElement("span")
  
  span.textContent = content
  span.style.padding = padding
  span.style.backgroundColor = backgroundColor
  span.style.border = border
  span.style.borderRadius = borderRadius

  return span
}