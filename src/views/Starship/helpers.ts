import { coords } from '../../types'

export const getPathLength = (startPoint: coords, endPoint: coords): number => Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2))

export const getNewPoint = (startPoint: coords, endPoint: coords, speed: number): coords => {
    if (!speed) {
        return startPoint
    }
    if (startPoint.x === endPoint.x && startPoint.y === endPoint.y) {
        return startPoint
    }
    const oldPathLength = getPathLength(startPoint, endPoint)
    const newPathLength = oldPathLength > speed ? oldPathLength - speed : 1
    const x = endPoint.x + newPathLength * (startPoint.x - endPoint.x) / oldPathLength
    const y = endPoint.y + newPathLength * (startPoint.y - endPoint.y) / oldPathLength
    return { x, y }
}
