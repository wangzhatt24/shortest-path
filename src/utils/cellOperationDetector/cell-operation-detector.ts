import GraphVertex from "../../data-structures/graph/GraphVertex";
import { GameData } from "../../main";
import { removeV_ } from "../remove-v_/remove-v_";

export function isIncreaseVertex(currentVertex: GraphVertex, gameData: GameData) {
  //1:2 => Tìm trong mảng gameData increase point 
  const id = removeV_(currentVertex.getKey())

  for(let i = 0; i < gameData.increasePoints.length; i++) {
    if(gameData.increasePoints[i].id === id) {
      return true
    }
  }
  
  return false
}

export function isDecreaseVertex(currentVertex: GraphVertex, gameData: GameData) {
  const id = removeV_(currentVertex.getKey())

  for(let i = 0; i < gameData.decreasePoints.length; i++) {
    if(gameData.decreasePoints[i].id === id) {
      return true
    }
  }
  
  return false
}