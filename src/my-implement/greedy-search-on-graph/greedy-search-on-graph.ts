import Graph from "../../data-structures/graph/Graph";
import GraphVertex from "../../data-structures/graph/GraphVertex";
import getVertexCoordinates from "../../utils/getVertexCoordinates/getVertexCoordinates";

function h(currentVertex: GraphVertex, goalVertex: GraphVertex) {
  const [Xcv, Ycv] = getVertexCoordinates(currentVertex)
  const [Xg, Yg] = getVertexCoordinates(goalVertex)

  return Math.sqrt(Math.pow((Xcv - Xg),2) + Math.pow((Ycv - Yg), 2))
}


export default function greedySearchOnGraph(startingVertex: GraphVertex, goalVertex: GraphVertex, myGraph: Graph) {
  /**
   * Tại đỉnh hiện tại
   * Nếu là goal trả về đỉnh đã duyệt
   * Else
   * Tìm tất cả đỉnh kề (loại những đỉnh đã thăm)
   * Từng đỉnh kề bỏ vào hàm h(n)
   * Lấy đỉnh có giá trị h(n) nhỏ nhất
   */
  let shouldGoVertex = startingVertex
  const visitedVertexs: string[] = []

  while(true) {
    const currentVertex = shouldGoVertex
    visitedVertexs.push(currentVertex.getKey())

    if(currentVertex.getKey() === goalVertex.getKey()) {
      return visitedVertexs
    }

    if(currentVertex.getNeighbors().length !== 0) {
      let neighbors = currentVertex.getNeighbors()
      neighbors = removeVisitedOnNeighbors(neighbors, visitedVertexs)
      // console.log(neighbors);
      shouldGoVertex = evaluateShouldGoVertex(neighbors, goalVertex)
    }
  }
}

function removeVisitedOnNeighbors(neighbors: GraphVertex[], visitedVertexs: string[]) {
  return neighbors.filter(n => !visitedVertexs.includes(n.getKey()))
}

function evaluateShouldGoVertex(neighbors: GraphVertex[], goalVertex: GraphVertex) {
  // return vertex
  const firstRound = neighbors.map(n => {
    return {
      vertex: n,
      h: h(n, goalVertex)
    }
  })

  let min = firstRound[0]

  firstRound.forEach(o => {
    if(o.h < min.h) {
      min = o
    }
  })

  return min.vertex
}
