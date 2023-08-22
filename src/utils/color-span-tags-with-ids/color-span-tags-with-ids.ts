export function colorSpanTagsWithIds(ids: string[] | undefined, color: string) {
  if(ids === undefined) return 
  ids.forEach(id => {
    const span = document.getElementById(id) as HTMLSpanElement
    span.style.border = "1px solid black"
    span.style.padding = "5px"
    span.style.borderRadius = "3px"
    span.style.backgroundColor = color
  })
}