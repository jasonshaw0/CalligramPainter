let painting = false;
let currentColor = '#000000'; 
let brushSize = 20; 
let letterDensity = 15; 
let lastPaintTime = 0;
let mode = 'brush'; 
const cursorIndicator = document.getElementById('cursor-indicator');
const canvas = document.getElementById('canvas');
const mathTypeCheckboxes = document.querySelectorAll('.math-type-checkbox');

canvas.addEventListener('mousemove', (event) => {
  const rect = canvas.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const offsetY = event.clientY - rect.top;

  cursorIndicator.style.left = `${offsetX - 10}px`;
  cursorIndicator.style.top = `${offsetY - 10}px`;
});

function generateSymbolByMathType() {
  let symbols = [];
  mathTypeCheckboxes.forEach(checkbox => {
    if (checkbox.checked) {
      switch (checkbox.value) {
        case 'greek':
          symbols.push('α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ', 'ι', 'κ', 'λ', 'μ', 'ν', 'ξ', 'ο', 'π', 'ρ', 'σ', 'τ', 'υ', 'φ', 'χ', 'ψ', 'ω');
          break;
        case 'calculus':
          symbols.push('∫', '∂', '∇', '∞', '∑', '∆'); 
          break;
        case 'algebra':
          symbols.push('√', '∠', '∪', '∩', '∈', '⊂'); 
          break;
        case 'geometry':
          symbols.push('∠', '⊥', '⋅', '≡', '≈', '∆'); 
          break;
        case 'linear-algebra':
          symbols.push('⊕', '⊗', '⊥', '∥', 'ℝ', 'ℂ'); 
          break;
        case 'number-theory':
          symbols.push('ℤ', 'ℚ', 'ℕ', '∣', '≡', '∼'); 
          break;
      }
    }
  });
  return symbols;
}

function generateSymbol() {
  const mathTypeSymbols = generateSymbolByMathType();
  if (mathTypeSymbols.length === 0) {
    return defaultSymbol();
  } else {
    return mathTypeSymbols[Math.floor(Math.random() * mathTypeSymbols.length)];
  }
}

function defaultSymbol() {
  const symbols = ['α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ', 'ι', 'κ', 'λ', 'μ', 'ν', 'ξ', 'ο', 'π', 'ρ', 'σ', 'τ', 'υ', 'φ', 'χ', 'ψ', 'ω'];
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function paintSymbol(event) {
  if (!painting) return;

  const currentTime = Date.now();
  if (currentTime - lastPaintTime < (500 / letterDensity)) return;
  lastPaintTime = currentTime;

  const rect = canvas.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const offsetY = event.clientY - rect.top;

  if (mode === 'brush') {
    const symbol = generateSymbol();
    const symbolElem = document.createElement('div');
    symbolElem.textContent = symbol;
    symbolElem.style.left = `${offsetX}px`;
    symbolElem.style.top = `${offsetY}px`;
    symbolElem.style.fontSize = `${brushSize}px`; 
    symbolElem.style.color = currentColor; 
    symbolElem.classList.add('symbol');
    canvas.appendChild(symbolElem);
  } else if (mode === 'eraser') {
    const symbols = document.elementsFromPoint(event.clientX, event.clientY).filter(elem => elem.classList.contains('symbol'));
    if (symbols.length > 0) {
      symbols[0].remove();
    }
  }
}

canvas.addEventListener('mousedown', (event) => {
  painting = true;
  paintSymbol(event); 
});
canvas.addEventListener('mouseup', () => painting = false);
canvas.addEventListener('mouseleave', () => painting = false); 
canvas.addEventListener('mousemove', paintSymbol);

const eraseBtn = document.getElementById('erase-btn');
eraseBtn.addEventListener('click', () => {
  canvas.innerHTML = ''; 
});

const colorInput = document.getElementById('color');
colorInput.addEventListener('input', (event) => {
  currentColor = event.target.value; 
});

const brushSizeInput = document.getElementById('brush-size');
brushSizeInput.addEventListener('input', (event) => {
  brushSize = event.target.value; 
});

const letterDensityInput = document.getElementById('letter-density');
letterDensityInput.addEventListener('input', (event) => {
  letterDensity = event.target.value; 
});

const brushBtn = document.getElementById('brush-btn');
const eraserBtn = document.getElementById('eraser-btn');

function updateMode(newMode) {
  mode = newMode;
  if (newMode === 'brush') {
    brushBtn.classList.add('active');
    eraserBtn.classList.remove('active');
  } else {
    brushBtn.classList.remove('active');
    eraserBtn.classList.add('active');
  }
}

brushBtn.addEventListener('click', () => updateMode('brush'));
eraserBtn.addEventListener('click', () => updateMode('eraser'));

updateMode('brush');
