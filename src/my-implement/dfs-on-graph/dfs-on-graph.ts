import GraphVertex from "../../data-structures/graph/GraphVertex";
import Stack from "../../data-structures/stack/Stack";

export default function dfsOnGraph(startingVertex: GraphVertex, goalVertex: GraphVertex) {
  // tạo một stack
  // tạo một mảng visitedVertexs
  // bỏ starting vertex vào stack
  // while myStack . is not empty
  // currentVertex = stack.pop
  // nếu currentVertex có đỉnh kề thì thêm vào ĐẦU stack
  // chú ý thêm: ví dụ kiểm tra kề là đỉnh 1, 2, 3 thì thêm là 3, 2, 1
  // log ra visitedvertexs

  const myStack = new Stack()
  const visitedVertexs: string[] = []
  let currentVertex: GraphVertex

  myStack.push(startingVertex)

  while (!myStack.isEmpty()) {
    currentVertex = myStack.pop()

    // kiểm tra nếu đỉnh hiện tại đã được thăm
    if (vertexIsVisited(visitedVertexs, currentVertex)) {
      continue
    } else {
      // thêm currentVertex vào đầu mảng thăm
      visitedVertexs.push(currentVertex.getKey())

      // nếu đỉnh hiện tại là goal thì log ra
      if(currentVertex.getKey() === goalVertex.getKey()) {
        return visitedVertexs
      }

      // nếu currentVertex có đỉnh kề thì thêm vào đầu stack
      const currentVertexNeighbors = currentVertex.getNeighbors()
      if (currentVertexNeighbors.length !== 0) {
        for (let i = currentVertexNeighbors.length - 1; i >= 0; i--) {
          myStack.push(currentVertexNeighbors[i])
        }
      }
    }
  }
}

function vertexIsVisited(visitedVertex: string[], vertex: GraphVertex) {
  const isVisited = visitedVertex.find(vt => vt === vertex.getKey())
  return isVisited ? true : false
}