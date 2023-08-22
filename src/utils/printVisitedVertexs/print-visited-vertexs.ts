export function printVisitedVertexs(ids: string[] | undefined, color: string, printTo: HTMLDivElement) {
  if(ids === undefined) return
  
  ids.forEach(id => {
    const span = document.createElement("span")
    span.textContent = id
    span.style.padding = "5px"
    span.style.backgroundColor = color
    span.style.borderRadius = "3px"

    printTo.appendChild(span)
  })
}