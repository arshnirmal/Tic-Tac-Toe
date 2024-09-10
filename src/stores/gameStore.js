import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
    isGameOver: false
  }),
  getters: {
    getBoard: (state) => state.board,
    getCurrentPlayer: (state) => state.currentPlayer,
    getWinner: (state) => state.winner,
    getIsGameOver: (state) => state.isGameOver
  },
  actions: {
    makeMove(index) {
      if (!this.board[index] && !this.isGameOver) {
        this.board[index] = this.currentPlayer
        if (this.checkWinner()) {
          this.winner = this.currentPlayer
          this.isGameOver = true
        } else if (this.board.every((cell) => cell !== null)) {
          this.isGameOver = true
        } else {
          this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X'
        }
      }
    },
    checkWinner() {
      const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ]
      return winningCombinations.some((combination) => {
        const [a, b, c] = combination
        return this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]
      })
    },
    resetGame() {
      this.board = Array(9).fill(null)
      this.currentPlayer = 'X'
      this.winner = null
      this.isGameOver = false
    }
  }
})
