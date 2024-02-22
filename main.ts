namespace SpriteKind {
    export const builder = SpriteKind.create()
}
function occupation3 (num: number) {
    if (num == 0) {
        tiles.setTileAt(currentLocation, assets.tile`myTile`)
        direction = tiles.getTileLocation(currentLocation.x + 1, currentLocation.y)
    } else {
    	
    }
}
scene.onHitWall(SpriteKind.builder, function (sprite, location) {
    touching = 1
})
function MakeMap (Mazy: number, Direction: number, length: number, extraNum: number, overlap: boolean) {
    place = sprites.create(img`
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
        `, SpriteKind.builder)
    currentLocation = tiles.getTileLocation(17, 17)
    maniness = Mazy
    if (maniness <= 3) {
        length = length
    } else if (maniness <= 6) {
        for (let index = 0; index < 2; index++) {
            length = length
        }
    } else if (maniness > 6) {
        for (let index = 0; index < 3; index++) {
            length = length
        }
    } else {
        length = 0
    }
    if (Direction == 0) {
        for (let index = 0; index < length; index++) {
            direction = currentLocation.getNeighboringLocation(CollisionDirection.Left)
            tiles.placeOnTile(place, currentLocation)
            touching = 0
            occupation1(touching)
        }
    } else if (Direction == 1) {
        for (let index = 0; index < length; index++) {
            direction = currentLocation.getNeighboringLocation(CollisionDirection.Top)
            tiles.placeOnTile(place, currentLocation)
            touching = 0
            occupation2(touching)
        }
    } else if (Direction == 2) {
        for (let index = 0; index < length; index++) {
            direction = currentLocation.getNeighboringLocation(CollisionDirection.Right)
            tiles.placeOnTile(place, currentLocation)
            touching = 0
            occupation3(touching)
        }
    } else {
        for (let index = 0; index < length; index++) {
            direction = currentLocation.getNeighboringLocation(CollisionDirection.Bottom)
            tiles.placeOnTile(place, currentLocation)
            touching = 0
            occupation4(touching)
        }
    }
}
function occupation1 (num: number) {
    if (num == 0) {
        tiles.setTileAt(currentLocation, assets.tile`myTile`)
        direction = tiles.getTileLocation(currentLocation.x - 1, currentLocation.y)
    } else {
    	
    }
}
function occupation4 (num: number) {
    if (num == 0) {
        tiles.setTileAt(currentLocation, assets.tile`myTile`)
        direction = tiles.getTileLocation(currentLocation.x, currentLocation.y + 1)
    } else {
    	
    }
}
function occupation2 (num: number) {
    if (num == 0) {
        tiles.setTileAt(currentLocation, assets.tile`myTile`)
        direction = tiles.getTileLocation(currentLocation.x, currentLocation.y - 1)
    } else {
    	
    }
}
let length = 0
let maniness = 0
let place: Sprite = null
let touching = 0
let direction: tiles.Location = null
let currentLocation: tiles.Location = null
tiles.setCurrentTilemap(tilemap`level17`)
MakeMap(game.askForNumber("How mazy?", 1), randint(0, 4), randint(0, 15), 1, true)
