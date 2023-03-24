const BOARD_SIZE = 8;
const MOVES = [
  [1, 2],
  [1, -2],
  [-1, 2],
  [-1, -2],
  [2, 1],
  [2, -1],
  [-2, 1],
  [-2, -1]
]

function knightMoves(start, end) {
  const queue = [];
  const board = Array(BOARD_SIZE).fill(null)
    .map(() => Array(BOARD_SIZE).fill(null));
  if (isValidPos(start)) {
    queue.push(start);
    board[start[0]][start[1]] = start;
  };
  while (queue.length) {
    const pos = queue.shift();
    if (isEqual(pos, end)) {
      return getPath(board, pos);
    }
    for (const nextPos of getNextMoves(board, pos)) {
      queue.push(nextPos);
      board[nextPos[0]][nextPos[1]] = pos;
    }
  }
  return [];
}

function isValidPos(pos) {
  const [x, y] = pos;
  return (x >= 0 && x < BOARD_SIZE) &&
         (y >= 0 && y < BOARD_SIZE);
}

function isEqual(pos1, pos2) {
  const [x1, y1] = pos1;
  const [x2, y2] = pos2;
  return (x1 === x2) && (y1 === y2)
}

function getNextMoves(board, pos) {
  const [x, y] = pos;
  const nextMoves = [];
  for (const move of MOVES) {
    const newPos = [x + move[0], y + move[1]];
    if (isValidPos(newPos) && board[newPos[0]][newPos[1]] === null) {
      nextMoves.push(newPos);
    }
  }
  return nextMoves;
}

function getPath(board, end) {
  const path = [];
  let currPos = end;
  while (!isEqual(board[currPos[0]][currPos[1]], currPos)) {
    path.push(currPos);
    currPos = board[currPos[0]][currPos[1]];
  }
  path.push(currPos);
  return path.reverse();
}

console.log(knightMoves([0, 0], [1, 2]));
console.log(knightMoves([0, 0], [3, 3]));
console.log(knightMoves([3, 3], [0, 0]));