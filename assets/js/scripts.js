// Seletores globais
const toggleTheme = document.getElementById("toggleTheme");
const rootHtml = document.documentElement;
const accordionHeaders = document.querySelectorAll(".accordion__header");
const menuLinks = document.querySelectorAll(".menu__link");

// Ativar e desativar a section selecionada no header
accordionHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const accordionItem = header.parentElement;
    const accordionActive = accordionItem.classList.contains("active");

    accordionActive
      ? accordionItem.classList.remove("active")
      : accordionItem.classList.add("active");
  });
});

menuLinks.forEach((item) => {
  item.addEventListener("click", () => {
    menuLinks.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");
  });
});

// 1. Verificação inicial: Checa se há um tema salvo no localStorage
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  // Aplica o tema salvo (dark ou light)
  rootHtml.setAttribute("data-theme", savedTheme);

  // Ajusta o ícone inicial para não ficar dessincronizado ao recarregar
  if (savedTheme === "dark") {
    toggleTheme.classList.add("bi-sunrise");
    toggleTheme.classList.remove("bi-sunset");
  } else {
    toggleTheme.classList.add("bi-sunset");
    toggleTheme.classList.remove("bi-sunrise");
  }
}

// 2. Função de alteração (com cache)
function changeTheme() {
  const currentTheme = rootHtml.getAttribute("data-theme");

  // Define qual será o novo tema baseado no atual
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  // Aplica o novo tema no HTML
  rootHtml.setAttribute("data-theme", newTheme);

  // Salva a nova escolha no localStorage
  localStorage.setItem("theme", newTheme);

  // Alterna os ícones do botão
  toggleTheme.classList.toggle("bi-sunset");
  toggleTheme.classList.toggle("bi-sunrise");
}

toggleTheme.addEventListener("click", changeTheme);

// scramble no h1
// Classe responsável por fazer o efeito de embaralhar o texto
class TextScramble {
  constructor(el) {
    this.el = el;
    // Aqui você pode definir quais caracteres aparecerão durante o "glitch"
    this.chars = "0123456789!@#$%¨&*()_+=/?<>[]{}";
    this.update = this.update.bind(this);
  }

  setText(newText) {
    // Pega o texto atual, ignorando as tags <br> para contar os caracteres
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      // Controla a velocidade de embaralhamento de cada letra
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }

    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = "";
    let complete = 0;

    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }

    // Converte as quebras de linha (\n) em <br> para manter o layout do seu site
    this.el.innerHTML = output.replace(/\n/g, "<br>");

    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

// ==========================================
// CONFIGURAÇÃO E EXECUÇÃO
// ==========================================

// Selecione as frases que você quer que fiquem alternando.
// Use o \n onde você quer que o texto quebre de linha.
const frases = [
  "SOLUÇÕES EFICIENTES & DESENVOLVIMENTO FULL-STACK",
  "CRIANDO EXPERIÊNCIAS & INTERFACES MODERNAS",
  "CÓDIGO LIMPO & ARQUITETURA ESCALÁVEL",
  "TRANSFORMANDO IDEIAS EM PRODUTOS DIGITAIS",
];

const el = document.getElementById("scrambleTitle");
const fx = new TextScramble(el);

let counter = 0;
const next = () => {
  // Pula para a próxima frase
  counter = (counter + 1) % frases.length;

  fx.setText(frases[counter]).then(() => {
    // Quando a animação terminar, espera 10 segundos (10000ms) e roda de novo
    setTimeout(next, 10000);
  });
};

// Inicia o ciclo após os primeiros 10 segundos para não mudar logo que o site carregar
setTimeout(next, 5000);
