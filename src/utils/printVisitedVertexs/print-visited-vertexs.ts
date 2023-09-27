export function printVisitedVertexs(ids: string[] | undefined, color: string, printTo: HTMLDivElement) {
  if(ids === undefined) return
  const p = document.createElement("p")
  p.textContent = `Số đỉnh đã duyệt ${ids.length}`
  printTo.appendChild(p)

  ids.forEach(id => {
    const span = document.createElement("span")
    span.textContent = id
    span.style.padding = "5px"
    span.style.backgroundColor = color
    span.style.borderRadius = "3px"

    printTo.appendChild(span)
  })
}