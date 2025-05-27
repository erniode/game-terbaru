const canvas = document.getElementById("gameCanvas");
const board = canvas.getContext("2d");

const aspek_rasio = {
  WIDTH: 16,
  HEIGHT: 9,
};

canvas.width = 64 * aspek_rasio.WIDTH;
canvas.height = 64 * aspek_rasio.HEIGHT;

let gameState = "start";
let selectedMode = null;
let gameOver = false;

// Properties
const playerProperty = {
  width: 100,
  height: 100,
  speed: 1,
  color: "tomato",
  position: {
    x: 0,
    y: canvas.height - 100,
  },
  imageSrc: "src/assets/Sprites/Characters/Double/character_green_walk_b.png",
};

const enemyProperty = {
  width: 100,
  height: 100,
  speed: 1,
  color: "black",
  position: {
    x: canvas.width - 100,
    y: canvas.height - 100,
  },
  imageSrc: "/src/assets/Sprites/Characters/Double/character_beige_walk_b.png",
};

// Instances (Ground, Player, Enemy harus class yg sudah kamu buat)
const ground = new Ground("/src/assets/bg.jpg", canvas.width, canvas.height);
const player = new Player(playerProperty);
const enemy = new Player(enemyProperty);

// ====================== START SCREEN ======================
function drawStartScreen() {
  board.fillStyle = "#4A90E2";
  board.fillRect(0, 0, canvas.width, canvas.height);

  board.fillStyle = "white";
  board.font = "48px Arial";
  board.textAlign = "center";
  board.fillText("JUMP HERO", canvas.width / 2, 100);

  board.font = "24px Arial";
  board.fillText("Pilih Mode Permainan", canvas.width / 2, 160);

  // Tombol Adventure
  board.fillStyle = selectedMode === "adventure" ? "#FFB74D" : "#FFA726";
  board.fillRect(canvas.width / 2 - 75, 200, 150, 50);
  board.fillStyle = "white";
  board.fillText("Adventure", canvas.width / 2, 235);

  // Tombol Classic
  board.fillStyle = selectedMode === "classic" ? "#4DD0E1" : "#26C6DA";
  board.fillRect(canvas.width / 2 - 75, 270, 150, 50);
  board.fillStyle = "white";
  board.fillText("Classic", canvas.width / 2, 305);

  // Tombol Main
  board.fillStyle = "#2ecc71";
  board.fillRect(canvas.width / 2 - 75, 350, 150, 50);
  board.fillStyle = "white";
  board.fillText("Main", canvas.width / 2, 385);
}

// ====================== GAMEPLAY ======================
function drawPlayScreen() {
  if (gameOver) {
    // Tetap tampilkan posisi terakhir game
    ground.create();
    player.create();
    enemy.create();

    // Lalu tampilkan overlay Game Over
    board.fillStyle = "rgba(0, 0, 0, 0.5)";
    board.fillRect(0, 0, canvas.width, canvas.height);

    board.fillStyle = "white";
    board.font = "48px Arial";
    board.textAlign = "center";
    board.fillText("Game Over", canvas.width / 2, canvas.height / 2);
    return;
  }

  // Update & gambar objek hanya jika belum game over
  ground.create();
  enemy.chase(player);  // gerak musuh
  player.create();
  enemy.create();

  if (enemy.checkCollision(player)) {
    console.log("terdeteksi tabrakan");
    gameOver = true;
  }
}
// ====================== EVENT ======================
canvas.addEventListener("click", (e) => {
  if (gameState !== "start") return;

  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  if (mouseX >= canvas.width / 2 - 75 && mouseX <= canvas.width / 2 + 75) {
    if (mouseY >= 200 && mouseY <= 250) {
      selectedMode = "adventure";
    } else if (mouseY >= 270 && mouseY <= 320) {
      selectedMode = "classic";
    } else if (mouseY >= 350 && mouseY <= 400) {
      if (selectedMode) {
        gameState = "play";
        console.log("Mulai game mode:", selectedMode);
      }
    }
  }
});

window.addEventListener("keydown", function (callback) {
  if (gameState !== "play" || gameOver) 
    return;

  switch (callback.key) {
    case "ArrowUp":
      player.jump();
      break;
    case "ArrowLeft":
      player.moveLeft();
      break;
    case "ArrowRight":
      player.moveRight();
      break;
  }
});

// ====================== MAIN LOOP ======================
function gameLoop() {
  board.clearRect(0, 0, canvas.width, canvas.height);
  console.log("gamestate", gameState)
  if (gameState === "start") {
    drawStartScreen();
  } else if (gameState === "play") {
    drawPlayScreen();
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();
