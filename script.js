const container = document.getElementById("heart-container");
const counterElement = document.getElementById("counter");
const typewriterElement = document.getElementById("typewriter-text");
const audioElement = document.getElementById("background-music");
const startOverlay = document.getElementById("start-overlay");
const fallingLeaves = document.getElementById("falling-leaves");

const flowerCount = 150;
const colors = [
  '#ff85c0', '#cc0000', '#3366cc',
  '#ffeb3b', '#f5f5f5', '#9933cc',
];

const loveLetterText = "Hace un mes, el 9 de abril, mi vida cambió, cuando te conocí hace más de un año nunca imaginé que llegariamos a crear todo esto y ahora que somos novios mi vida es muchísimo más alegre contigo. Nallely, eres la luz que ilumina mis días, la melodía que da ritmo a mi corazón. Cada momento contigo es un tesoro: tus risas, tus aabrazos, la forma en que me haces sentir completo. Mi amor por ti crece con cada latido, y no hay palabras suficientes para expresar cuánto te amo. Eres mi todo, mi razón para sonreír, y prometo cuidarte, respetarte y amarte con todo mi ser, hoy y siempre. Gracias por ser tú, mi amor eterno.";

for (let i = 0; i < flowerCount; i++) {
  const angle = ((i / flowerCount) * 2 * Math.PI) + (Math.PI / 2);
  const x = 16 * Math.pow(Math.sin(angle), 3);
  const y = 13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle);

  const flower = document.createElement("div");
  flower.className = "flower";
  const isMobile = window.innerWidth <= 768;
  const baseSize = isMobile ? 1.5 + Math.random() * 2 : 5 + Math.random() * 8;
  flower.style.width = `${baseSize}px`;
  flower.style.height = `${baseSize}px`;
  flower.style.left = `${isMobile ? 100 + x * 8 : 300 + x * 16}px`;
  flower.style.top = `${isMobile ? 135 - y * 8 : 270 - y * 16}px`;

  const flowerColor = colors[Math.floor(Math.random() * colors.length)];

  const center = document.createElement("div");
  center.className = "flower-center";
  const centerSize = baseSize * 0.35;
  center.style.width = `${centerSize}px`;
  center.style.height = `${centerSize}px`;
  center.style.background = `radial-gradient(circle, #ffffff33, ${flowerColor}, ${flowerColor}99)`;
  center.style.left = `50%`;
  center.style.top = `50%`;

  const petalCount = 7;
  for (let j = 0; j < petalCount; j++) {
    const petal = document.createElement("div");
    petal.className = "flower-petal";
    const petalWidth = baseSize * 0.4;
    const petalHeight = baseSize * 0.9;
    petal.style.width = `${petalWidth}px`;
    petal.style.height = `${petalHeight}px`;
    petal.style.background = `linear-gradient(to bottom, ${flowerColor}cc, ${flowerColor}80)`;
    petal.style.transform = `rotate(${j * (360 / petalCount)}deg) translateY(-${baseSize * 0.55}px) rotateZ(15deg)`;
    flower.appendChild(petal);
  }

  flower.appendChild(center);
  container.appendChild(flower);
}

function createFallingFlower() {
  const flower = document.createElement('div');
  flower.classList.add('flower');

  const isMobile = window.innerWidth <= 768;
  const baseSize = isMobile ? 0.8 + Math.random() * 1.2 : 5 + Math.random() * 10;
  flower.style.width = `${baseSize}px`;
  flower.style.height = `${baseSize}px`;

  const flowerColor = colors[Math.floor(Math.random() * colors.length)];

  const center = document.createElement("div");
  center.className = "flower-center";
  const centerSize = baseSize * 0.35;
  center.style.width = `${centerSize}px`;
  center.style.height = `${centerSize}px`;
  center.style.background = `radial-gradient(circle, #ffffff33, ${flowerColor}, ${flowerColor}99)`;
  center.style.left = `50%`;
  center.style.top = `50%`;

  const petalCount = 7;
  for (let j = 0; j < petalCount; j++) {
    const petal = document.createElement("div");
    petal.className = "flower-petal";
    const petalWidth = baseSize * 0.4;
    const petalHeight = baseSize * 0.9;
    petal.style.width = `${petalWidth}px`;
    petal.style.height = `${petalHeight}px`;
    petal.style.background = `linear-gradient(to bottom, ${flowerColor}cc, ${flowerColor}80)`;
    petal.style.transform = `rotate(${j * (360 / petalCount)}deg) translateY(-${baseSize * 0.55}px) rotateZ(15deg)`;
    flower.appendChild(petal);
  }

  flower.appendChild(center);
  flower.style.left = `${Math.random() * 100}%`;
  flower.style.top = `-10px`;
  const animationDuration = isMobile ? 3 + Math.random() * 2 : 4 + Math.random() * 4;
  flower.style.animation = `fallAndFly ${animationDuration}s ease-in-out forwards`;
  flower.style.setProperty('--x-offset', `${(Math.random() - 0.5) * (isMobile ? 80 : 500)}px`);
  flower.style.setProperty('--rotate', `${Math.random() * 720 - 360}deg`);
  flower.style.transform = `translate(-50%, -50%) scale(${isMobile ? 0.4 + Math.random() * 0.2 : 0.8 + Math.random() * 0.4})`;

  fallingLeaves.appendChild(flower);
  flower.addEventListener('animationend', () => flower.remove());
}

setInterval(createFallingFlower, 400);

const startDate = new Date('2025-04-09T00:00:00Z');
function updateCounter() {
  const now = new Date();
  const diff = now - startDate;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  counterElement.textContent = `${days} días, ${hours} horas, ${minutes} minutos, ${seconds} segundos`;
}
setInterval(updateCounter, 1000);
updateCounter();

startOverlay.addEventListener('click', () => {
  audioElement.play().catch(error => console.log('Error al reproducir audio:', error));
  startOverlay.style.display = 'none';
  container.style.animation = 'moveHeart 1s ease-out forwards';

  setTimeout(() => {
    document.querySelector('.text-container').style.animation = 'fadeIn 1s ease-out forwards';
    document.querySelector('.love-letter').style.animation = 'fadeIn 1s ease-out forwards';
  }, 1000);

  setTimeout(() => {
    let index = 0;
    function typeWriter() {
      if (index < loveLetterText.length) {
        typewriterElement.textContent += loveLetterText.charAt(index);
        index++;
        setTimeout(typeWriter, 50);
      }
    }
    typeWriter();
  }, 3000);
});