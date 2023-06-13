/**

Features:
x Ship placement:
    x Players are not allowed to place the same ship twice 
    x Players are able to select a ship to place
    x Players are able to switch axis of placement
    x Players are able to click on board to place ship
    x When players place ship, there is visual feedback on whether you can place the ship or not
    x When players are hovering over the board with a mouse, there is visual feedback of whether placement is legal
x Game play:
    x Players can click a square to get visual feedback on whether:
        1) The square was clicked
        2) The square had a ship or not
    x Players are not allowed to target their own board.
x UI:
    x Players are able to see a 11x11 grid of squares, with the first row and first column being labels that
        cannot be interacted with 

State:


Fleet structure #1:
Array of coordinate objects

Ship placement:
    x Players are able to hover over the board with a mouse, and get visual feedback of whether placement is legal
        - When a square is hovered, the onHover handler will run and pass in the square ID
        - The square ID, axis, and currentShip state will be used to check if the current placement is correct 
            - The above data will be used to generate a list of coordinates. After the list is generated
            each coordinate will be compared against:
                - The fleet 
                - An array of valid coordinates.
            - The ho
    x Players are able to click on board to place ship
        - When a square is clicked, the onClick handler will run and pass in the square ID
        - The square ID and currentShip state will be used to check if the current placement is correct 
    x Players are not allowed to place the same ship twice 
    x Players are able to select a ship to place
        - Game component will hold 'currentShip' state that determines which ship to place
    x Players are able to switch axis of placement
    x When players place ship, there is visual feedback on whether you can place the ship or not

note: for a feature like 'enemy ships sunk', which displays the enemy ships that are sunk, we have to 
loop through the array each time to find out whether the ids are sunk.

fleet: {
    'id': {
        id: 'A1',
        ship: 'carrier',
        targeted: false
    },
    }
        id: 'A2',
        ship: 'carrier',
        targeted: false
    },
    {
        id: 'A3',
        ship: 'carrier',
        targeted: false
    },
    {
        id: 'A4',
        ship: 'carrier',
        targeted: false
    },
    {
        id: 'A5',
        ship: 'carrier',
        targeted: false
    },
}

coordinates: [
    'A1', 'A2', etc
]

^ can do:

 */