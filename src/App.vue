<template>
  <div class="app">
    <h1>Tic-Tac-Toe</h1>
    <div class="board">
      <div
        v-for="(cell, index) in board"
        :key="index"
        class="cell"
        :class="{ 'cell-filled': cell }"
        @click="makeMove(index)"
      >
        {{ cell }}
      </div>
    </div>
    <div class="status">
      <p v-if="winner" class="winner">{{ winner }} wins! 🎉</p>
      <p v-else-if="isGameOver" class="draw">It's a draw! 🤝</p>
      <p v-else class="current-turn">Current Player: {{ currentPlayer }}</p>
    </div>
    <button @click="resetGame" class="reset-button">Reset Game</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from './stores/gameStore'

const store = useGameStore()

const board = computed(() => store.getBoard)
const currentPlayer = computed(() => store.getCurrentPlayer)
const winner = computed(() => store.getWinner)
const isGameOver = computed(() => store.getIsGameOver)

const makeMove = (index) => store.makeMove(index)
const resetGame = () => store.resetGame()
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: 'Arial', sans-serif;
  background: #f5f5f5;
  padding: 20px;
  color: #333;
}

h1 {
  font-size: 3rem;
  color: #4e7837;
  margin-bottom: 20px;
}

/* Board styling */
.board {
  display: grid;
  grid-template-columns: repeat(3, 150px);
  grid-template-rows: repeat(3, 150px);
  grid-gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
}

.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  background: #fff;
  border: 3px solid #4e7837;
  font-size: 3rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
}

.cell:hover {
  background-color: #e3f2fd;
}

.cell-filled {
  cursor: not-allowed;
}

.winner {
  color: #69923e;
}

.draw {
  color: #4b4847;
}

.current-turn {
  color: #4e7837;
}

/* Button styling */
.reset-button {
  background-color: #4e7837;
  color: white;
  font-size: 1.2rem;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.reset-button:hover {
  background-color: #69923e;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .board {
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(3, 100px);
  }

  .cell {
    width: 100px;
    height: 100px;
    font-size: 2rem;
  }

  h1 {
    font-size: 2.5rem;
  }
}

@media (max-width: 480px) {
  .board {
    grid-template-columns: repeat(3, 80px);
    grid-template-rows: repeat(3, 80px);
  }

  .cell {
    width: 80px;
    height: 80px;
    font-size: 1.5rem;
  }

  h1 {
    font-size: 2rem;
  }
}
</style>
