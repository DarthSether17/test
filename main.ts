function CreateRandomMaze () {
    tiles.setCurrentTilemap(tilemap`level3`)
    // Hard coded tilemap size before realizing there's a tilemap extension that lets you see the tilemap size.
    tilemapLastRow = 35
    tileMapLastCol = 35
    // Create the cursor sprite
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
    // Check if the cursor sprite exists
    if (cursor) {
        // Place the cursor sprite on the tilemap
        tiles.placeOnTile(cursor, tiles.getTileLocation(0, 0))
        // Set the cursor sprite image (adjust as needed)
        cursor.setImage(img`
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
        // Make the cursor sprite movable
        controller.moveSprite(cursor, 150, 150)
    } else {
        // Log an error message if the cursor sprite creation fails
        console.log("Cursor sprite not created!")
    }
    scene.cameraFollowSprite(cursor)
    visitedLocations = [cursor.tilemapLocation()]
    while (visitedLocations.length > 0) {
        currentCell = visitedLocations.pop()
        tiles.placeOnTile(cursor, currentCell)
        tiles.setTileAt(currentCell, img`MazeFloor`)
        candidateLocations = adjacentPathCandidateLocations()
        branchingFrom = cursor.tilemapLocation()
        while (candidateLocations.length > 0) {
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
    mazeFloorTiles = tiles.getTilesByType(img`MazeFloor`)
    randomMazeTile = tiles.getTileLocation(0, 0)
    while (randomMazeTile.row < tilemapLastRow / 1.5 || randomMazeTile.column < tileMapLastCol / 1.5) {
        randomMazeTile = mazeFloorTiles._pickRandom()
    }
    tiles.setTileAt(randomMazeTile, img`Treasure Chest`)
    wallTiles = tiles.getTilesByType(assets.tile`transparency16`)
    for (let value of wallTiles) {
        tiles.setTileAt(value, img`Lava`)
        tiles.setWallAt(value, true)
    }
}
// Not being able to have a location (type: Generic Object) as a parameter sucks. We'll just use the location of a global variable sprite to follow with the camera as the maze is being built.
function adjacentPathCandidateLocations () {
    let tileMapLastCol2 = 0
    let tilemapLastRow2 = 0
    adjacentLocations = []
    currentLocation = cursor2.tilemapLocation()
    if (currentLocation.row > 0 && cursor2.tileKindAt(TileDirection.Top, assets.tile`transparency16`)) {
        adjacentLocations.push(tiles.getTileLocation(currentLocation.column, currentLocation.row - 1))
    }
    if (currentLocation.row < tilemapLastRow2 && cursor2.tileKindAt(TileDirection.Bottom, assets.tile`transparency16`)) {
        adjacentLocations.push(tiles.getTileLocation(currentLocation.column, currentLocation.row + 1))
    }
    if (currentLocation.column > 0 && cursor2.tileKindAt(TileDirection.Left, assets.tile`transparency16`)) {
        adjacentLocations.push(tiles.getTileLocation(currentLocation.column - 1, currentLocation.row))
    }
    if (currentLocation.column < tileMapLastCol2 && cursor2.tileKindAt(TileDirection.Right, assets.tile`transparency16`)) {
        adjacentLocations.push(tiles.getTileLocation(currentLocation.column + 1, currentLocation.row))
    }
    return adjacentLocations
}
function adjacentOccupiedCount () {
    currentLocation = cursor2.tilemapLocation()
    if (cursor2.tileKindAt(TileDirection.Top, img`MazeFloor`)) {
        count += 1
    }
    if (cursor2.tileKindAt(TileDirection.Left, img`MazeFloor`)) {
        count += 1
    }
    if (cursor2.tileKindAt(TileDirection.Bottom, img`MazeFloor`)) {
        count += 1
    }
    if (cursor2.tileKindAt(TileDirection.Right, img`MazeFloor`)) {
        count += 1
    }
    return count
}
let count = 0
let cursor2: Sprite = null
let currentLocation: tiles.Location = null
let adjacentLocations: tiles.Location[] = []
let wallTiles: tiles.Location[] = []
let randomMazeTile: tiles.Location = null
let mazeFloorTiles: tiles.Location[] = []
let branchingFrom: tiles.Location = null
let candidateLocations: tiles.Location[] = []
let currentCell: tiles.Location = null
let visitedLocations: tiles.Location[] = []
let cursor: Sprite = null
let tileMapLastCol = 0
let tilemapLastRow = 0
let delay = false
let visitedLocations2: number[] = []
let count2 = 0
CreateRandomMaze()
delay = game.ask("Press A to watch it build")
