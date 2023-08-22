export function colorVertexByVertexId(id: string, color: string) {
  const catchVertex = document.getElementById(id) as HTMLDataElement

  catchVertex.style.backgroundColor = color
}

export function colorVisitedVertexsByVertexId(vertexs: string[] | undefined, color: string) {
  if(vertexs === undefined) return
  vertexs.forEach(v => colorVertexByVertexId(v, color))
}