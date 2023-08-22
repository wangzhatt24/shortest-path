import Graph from "../../data-structures/graph/Graph";
import GraphVertex from "../../data-structures/graph/GraphVertex";
import Queue from "../../data-structures/queue/Queue";


/**
 * Triển khai hàm tìm kiếm theo chiều rộng trên graph
 * Bắt đầu từ một đỉnh của đồ thị 
 * Sử dụng Queue
 */

//@ts-ignore
export default function bfsOnGraph(graph: Graph, startingVertex: GraphVertex, goalVertex: GraphVertex) {
  // console.log(`graph: ${graph}`)
  // console.log(`startingVertex:`)
  // console.log(startingVertex)
  // console.log(`goalVertex:`)
  // console.log(goalVertex)

  // tạo một queue
  // tạo một mảng chứa id các đỉnh đã được thăm
  // bỏ đỉnh start dô đầu queue
  // nếu còn queue (while)
  // currentVertex = đầu queue
  // nếu id của vertex đã được thăm thì continue
  // chưa thăm thì
  // bỏ nó dô mảng thăm 
  // so sánh với goal nếu đúng thì dừng và trả về mảng
  // nếu currentV có đỉnh kề
  // bỏ đỉnh kề dô sau queue

  const myQueue = new Queue()
  const visitedVertex: string[] = []
  let currentVertex: GraphVertex

  myQueue.enqueue(startingVertex)
  
  while(!myQueue.isEmpty()) {
    currentVertex = myQueue.dequeue()

    // Kiểm tra xem đỉnh này đã thăm hay chưa
    if(vertexIsVisited(visitedVertex, currentVertex)) {
      // Thăm rồi thì bỏ qua
      continue
    } else {
      // Chưa được thăm
      visitedVertex.push(currentVertex.getKey())

      // nếu đỉnh hiện tại là goal thì log ra
      if(currentVertex.getKey() === goalVertex.getKey()) {
        return visitedVertex
      }

      // đỉnh hiện tại có đỉnh kề
      const currentVertexNeighbors = currentVertex.getNeighbors()
      if(currentVertexNeighbors.length !== 0) {
        // bỏ những đỉnh kề vào queue
        pushVertexsToQueue(myQueue, currentVertexNeighbors)
      }
    }
  }
}

function vertexIsVisited(visitedVertex: string[], vertex: GraphVertex) {
  const isVisited = visitedVertex.find(vt => vt === vertex.getKey())
  return isVisited ? true : false
}

function pushVertexsToQueue(myQueue: Queue, currentVertexNeighbors: GraphVertex[]) {
  currentVertexNeighbors.forEach(cvn => myQueue.enqueue(cvn))
}
