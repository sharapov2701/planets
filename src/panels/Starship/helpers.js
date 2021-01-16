export const getPathLength = (startPoint, endPoint) => Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2))

export const getNewPoint = (startPoint, endPoint, speed) => {
    if (!speed) {
        return endPoint
    }
    const oldPathLength = getPathLength(startPoint, endPoint)
    const newPathLength = oldPathLength > speed ? oldPathLength - speed : 1
    const x = endPoint.x + newPathLength * (startPoint.x - endPoint.x) / oldPathLength
    const y = endPoint.y + newPathLength * (startPoint.y - endPoint.y) / oldPathLength
    return { x, y }
}