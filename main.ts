namespace SpriteKind {
    export const location = SpriteKind.create()
}
function occupation (num: number) {
    if (true) {
    	
    }
}
scene.onHitWall(SpriteKind.location, function (sprite, location) {
    touching = 1
})
function MakeMap (Mazy: number, Direction: number, length: number, extraNum: number, overlap: boolean) {
    location.setKind(SpriteKind.location)
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
            location = direction
            touching = 0
            occupation(1)
        }
    } else if (Direction == 1) {
        for (let index = 0; index < length; index++) {
            direction = currentLocation.getNeighboringLocation(CollisionDirection.Top)
            location = direction
            touching = 0
            occupation(1)
        }
    } else if (Direction == 2) {
        for (let index = 0; index < length; index++) {
            direction = currentLocation.getNeighboringLocation(CollisionDirection.Right)
            location = direction
            touching = 0
            occupation(1)
        }
    } else {
        for (let index = 0; index < length; index++) {
            direction = currentLocation.getNeighboringLocation(CollisionDirection.Bottom)
            location = direction
            touching = 0
            occupation(1)
        }
    }
}
let direction: tiles.Location = null
let length = 0
let maniness = 0
let currentLocation: tiles.Location = null
let location: Sprite = null
let touching = 0
tiles.setCurrentTilemap(tilemap`level17`)
MakeMap(game.askForNumber("How mazy?", 1), randint(0, 4), randint(0, 15), 1, true)
