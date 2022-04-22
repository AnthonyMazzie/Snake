# Snake

Inside of the snake folder there are two implementations of the snake game.

One using a grid, and one using the HTML canvas stroke method to represent the snake using a line.

Snake Implementation #1
In the Snake line implementation, the snake body is held in a “stroke” line created by the HTML canvas method. The game can be controlled using the Start, Right and Left buttons. If the user presses start, the game is started, timer is started, and the start button is changed to “Stop”. The user can then press the “Stop” button to stop the game. If the game is stopped, a user can press “Start”, “Right” or “Left” to start the game back up.
•	Snake can move up, down, left, right in this implementation.
•	Border detection is fully functional in this implementation.
•	The buttons are fully functional in this implementation.
•	Collision detection is not fully functional in this implementation.


Snake Implementation #2
The Snake grid implementation can be controlled using the arrow keys or WSAD, whichever the user prefers. The snake body is held in an array. There are “apples” on the grid for the snake to eat. If a snake eats an apple, another is placed at a random (x, y) position on the grid. Each time the snake eats an apple, the array grows larger. If the snake collides with its own body or hits the border, the game is over. The game has three difficulties: easy, medium, and hard that change based on how many apples the player has eaten.
•	Snake can move up, down, left, right in this implementation.
•	Collision detection is fully functional in this implementation.
•	The buttons are not fully functional in this implementation (Arrow keys and WSAD work)
