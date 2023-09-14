import Graph from "../../data-structures/graph/Graph";
import GraphVertex from "../../data-structures/graph/GraphVertex";
import Stack from "../../data-structures/stack/Stack";

interface dlsOnGraphReturn {
  founded: boolean;
  visitedVertexs: string[];
}

function dlsOnGraph(startingVertex: GraphVertex, goalVertex: GraphVertex, level: number, myGraph: Graph): dlsOnGraphReturn {
  // tạo một stack
  // tạo một mảng visitedVertexs
  // bỏ starting vertex vào stack
  // while myStack . is not empty
  // currentVertex = stack.pop
  // nếu currentVertex có đỉnh kề và chưa vượt khỏi level hiện tại
  // chú ý thêm: ví dụ kiểm tra kề là đỉnh 1, 2, 3 thì thêm là 3, 2, 1
  // log ra visitedvertexs

  const myStack = new Stack()
  const visitedVertexs: string[] = []
  let currentVertex: GraphVertex

  myStack.push(startingVertex)

  while (!myStack.isEmpty()) {
    currentVertex = myStack.pop()
    // thêm currentVertex vào đầu mảng thăm
    visitedVertexs.push(currentVertex.getKey())
    // kiểm tra nếu đỉnh hiện tại đã được thăm
    // thì bỏ qua đỉnh này
    // kiểm tra nếu đỉnh hiện tại vượt ra khỏi level thì 
    // bỏ qua đỉnh này

    // nếu đỉnh hiện tại là goal thì log ra
    if (currentVertex.getKey() === goalVertex.getKey()) {
      return {
        founded: true,
        visitedVertexs: visitedVertexs
      }
    }

    // nếu currentVertex có đỉnh kề thì thêm vào đầu stack
    const currentVertexNeighbors = currentVertex.getNeighbors()
    if (currentVertexNeighbors.length !== 0) {
      for (let i = currentVertexNeighbors.length - 1; i >= 0; i--) {
        checkAndPushToStack(currentVertexNeighbors[i], level, myStack, myGraph, visitedVertexs)
      }
    }
  }

  return {
    founded: false,
    visitedVertexs: visitedVertexs
  }
}

function checkAndPushToStack(currentVertex: GraphVertex, level: number, myStack: Stack, myGraph: Graph, visitedVertexs: string[]) {
  if (verterIsOutOfLevel(currentVertex, level, myGraph) === false && vertexIsVisited(visitedVertexs, currentVertex) === false) {
    myStack.push(currentVertex)
  }
}

function vertexIsVisited(visitedVertex: string[], vertex: GraphVertex) {
  const isVisited = visitedVertex.find(vt => vt === vertex.getKey())
  return isVisited ? true : false
}

export default function idsOnGraph(startingVertex: GraphVertex, goalVertex: GraphVertex, myGraph: Graph) {
  let currentLevel = 0
  let dlsResult = dlsOnGraph(startingVertex, goalVertex, currentLevel, myGraph)
  while(dlsResult.founded === false) {
    currentLevel = currentLevel + 1
    dlsResult = dlsOnGraph(startingVertex, goalVertex, currentLevel, myGraph)
  }

  return {
    visitedVertexs: dlsResult.visitedVertexs,
    atLevel: currentLevel
  }
}

function verterIsOutOfLevel(currentVertex: GraphVertex, level: number, myGraph: Graph) {
  for (let l = 0; l <= level; l++) {
    //@ts-ignore
    if (myGraph.level[`level_${l}`].includes(currentVertex.getKey())) {
      return false
    }
  }

  return true
}