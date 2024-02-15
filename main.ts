function CreateRandomMaze () {
    tiles.setCurrentTilemap(tilemap`level4`)
    // Hard coded tilemap size before realizing there's a tilemap extension that lets you see the tilemap size.
    tilemapLastRow = 19
    tileMapLastCol = 19
    cursor = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player)
    tiles.placeOnTile(cursor, tiles.getTileLocation(0, 0))
    scene.cameraFollowSprite(cursor)
    visitedLocations = [cursor.tilemapLocation()]
    while (visitedLocations.length > 0) {
        currentCell = visitedLocations.pop()
        tiles.placeOnTile(cursor, currentCell)
        tiles.setTileAt(currentCell, img`
            d d d d d d d 1 1 d d d d d d d 
            d d d d d d d 1 1 d d d d d d d 
            d d d d d d d 1 1 d d d d d d d 
            d d d d d d d 1 1 d d d d d d d 
            d d d d d d d 1 1 d d d d d d d 
            d d d d d d d 1 1 d d d d d d d 
            d d d d d d d 1 1 d d d d d d d 
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            d d d d d d d 1 1 d d d d d d d 
            d d d d d d d 1 1 d d d d d d d 
            d d d d d d d 1 1 d d d d d d d 
            d d d d d d d 1 1 d d d d d d d 
            d d d d d d d 1 1 d d d d d d d 
            d d d d d d d 1 1 d d d d d d d 
            d d d d d d d 1 1 d d d d d d d 
            `)
        candidateLocations = adjacentPathCandidateLocations()
        branchingFrom = cursor.tilemapLocation()
        while (candidateLocations.length > 0) {
            let delay = 0
            if (delay) {
                pause(40)
            }
            tiles.placeOnTile(cursor, candidateLocations.removeAt(randint(0, candidateLocations.length - 1)))
            if (adjacentOccupiedCount() == 1) {
                visitedLocations.push(branchingFrom)
                visitedLocations.push(cursor.tilemapLocation())
                break;
            }
        }
    }
    randomMazeTile = tiles.getTileLocation(0, 0)
    mazeFloorTiles = img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `
    while (randomMazeTile.row < tilemapLastRow / 1.5 || randomMazeTile.column < tileMapLastCol / 1.5) {
        randomMazeTile = mazeFloorTiles._pickRandom()
    }
    wallTiles = tiles.getTilesByType(assets.tile`transparency16`)
    for (let value of wallTiles) {
        tiles.setTileAt(value, img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
        tiles.setWallAt(value, true)
    }
}
// Not being able to have a location (type: Generic Object) as a parameter sucks. We'll just use the location of a global variable sprite to follow with the camera as the maze is being built.
function adjacentPathCandidateLocations () {
    adjacentLocations = []
    currentLocation = cursor.tilemapLocation()
    if (currentLocation.row > 0 && cursor.tileKindAt(TileDirection.Top, assets.tile`transparency16`)) {
        adjacentLocations.push(tiles.getTileLocation(currentLocation.column, currentLocation.row - 1))
    }
    if (currentLocation.row < tilemapLastRow && cursor.tileKindAt(TileDirection.Bottom, assets.tile`transparency16`)) {
        adjacentLocations.push(tiles.getTileLocation(currentLocation.column, currentLocation.row + 1))
    }
    if (currentLocation.column > 0 && cursor.tileKindAt(TileDirection.Left, assets.tile`transparency16`)) {
        adjacentLocations.push(tiles.getTileLocation(currentLocation.column - 1, currentLocation.row))
    }
    if (currentLocation.column < tileMapLastCol && cursor.tileKindAt(TileDirection.Right, assets.tile`transparency16`)) {
        adjacentLocations.push(tiles.getTileLocation(currentLocation.column + 1, currentLocation.row))
    }
    return adjacentLocations
}
function adjacentOccupiedCount () {
    count = 0
    currentLocation = cursor.tilemapLocation()
    if (cursor.tileKindAt(TileDirection.Top, img`MazeFloor`)) {
        count += 1
    }
    if (cursor.tileKindAt(TileDirection.Left, img`MazeFloor`)) {
        count += 1
    }
    if (cursor.tileKindAt(TileDirection.Bottom, img`MazeFloor`)) {
        count += 1
    }
    if (cursor.tileKindAt(TileDirection.Right, img`MazeFloor`)) {
        count += 1
    }
    return count
}
let count = 0
let currentLocation: tiles.Location = null
let adjacentLocations: tiles.Location[] = []
let wallTiles: tiles.Location[] = []
let mazeFloorTiles: Image = null
let randomMazeTile: tiles.Location = null
let branchingFrom: tiles.Location = null
let candidateLocations: tiles.Location[] = []
let currentCell: tiles.Location = null
let visitedLocations: tiles.Location[] = []
let cursor: Sprite = null
let tileMapLastCol = 0
let tilemapLastRow = 0
CreateRandomMaze()
