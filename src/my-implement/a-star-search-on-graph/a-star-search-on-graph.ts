import Graph from "../../data-structures/graph/Graph";
import GraphVertex from "../../data-structures/graph/GraphVertex";
import { GameData } from "../../main";
import getVertexCoordinates from "../../utils/getVertexCoordinates/getVertexCoordinates";
import { cellOperationCal } from "../greedy-search-on-graph/greedy-search-on-graph";

function h(currentVertex: GraphVertex, goalVertex: GraphVertex) {
  const [Xcv, Ycv] = getVertexCoordinates(currentVertex)
  const [Xg, Yg] = getVertexCoordinates(goalVertex)

  return Math.sqrt(Math.pow((Xcv - Xg), 2) + Math.pow((Ycv - Yg), 2))
}

function fN(gN: number, hN: number, cellOperationValue: number) {
  return gN + hN + cellOperationValue
}

export default function aStarSearchOnGraph(startingVertex: GraphVertex, goalVertex: GraphVertex, myGraph: Graph, gameData: GameData) {
  /**
   * Tại đỉnh hiện tại
   * Nếu là goal trả về đỉnh đã duyệt
   * Else
   * Tìm tất cả đỉnh kề (loại những đỉnh đã thăm)
   * Từng đỉnh kề bỏ vào hàm f(n)
   * Lấy đỉnh có giá trị f(n) nhỏ nhất
   */
  let shouldGoVertex = startingVertex
  const visitedVertexs: string[] = []
  let gN = 0

  while(true) {
    const currentVertex = shouldGoVertex
    visitedVertexs.push(currentVertex.getKey())
    gN++

    if(currentVertex.getKey() === goalVertex.getKey()) {
      return visitedVertexs
    }

    if(currentVertex.getNeighbors().length !== 0) {
      let neighbors = currentVertex.getNeighbors()
      neighbors = removeVisitedOnNeighbors(neighbors, visitedVertexs)
      // console.log(neighbors)
      shouldGoVertex = evaluateShouldGoVertex(neighbors, goalVertex, gN, gameData)
    }
  }
}

function removeVisitedOnNeighbors(neighbors: GraphVertex[], visitedVertexs: string[]) {
  return neighbors.filter(n => !visitedVertexs.includes(n.getKey()))
}

function evaluateShouldGoVertex(neighbors: GraphVertex[], goalVertex: GraphVertex, gN: number, gameData: GameData) {
  // trả về {vertex: vertex, h: number}
  const firstRound = neighbors.map(n => {
    return {
      vertex: n,
      h: h(n, goalVertex),
      cellOperationValue: cellOperationCal(n, gameData)
    }
  })
  // console.log(`first round: `, firstRound)
  // return {vertex: vertex, f: number}
  const secondRound = firstRound.map(o => {
    return {
      vertex: o.vertex,
      f: fN(gN, o.h, o.cellOperationValue)
    }
  })
  // console.log(`second round: `, secondRound)
  let min = secondRound[0]

  secondRound.forEach(o => {
    if(o.f < min.f) {
      min = o
    }
  })

  return min.vertex
}
