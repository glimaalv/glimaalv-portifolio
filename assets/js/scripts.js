// botão toggleTheme para alternar entre os temas dark e light
const toggleTheme = document.getElementById("toggleTheme");
const rootHtml = document.documentElement;
const accordionHeaders = document.querySelectorAll(".accordion__header");
const menuLinks = document.querySelectorAll(".menu__link");

function changeTheme() {
  const currentTheme = rootHtml.getAttribute("data-theme");

  currentTheme === "dark"
    ? rootHtml.setAttribute("data-theme", "light")
    : rootHtml.setAttribute("data-theme", "dark");

  toggleTheme.classList.toggle("bi-sunset");
  toggleTheme.classList.toggle("bi-sunrise");
}

toggleTheme.addEventListener("click", changeTheme);

// ativar e desativar a section selecionada no header
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

// verificação e salvar o tema dark ou light no navegador
const toggleTheme = document.getElementById("toggleTheme");
const rootHtml = document.documentElement;
const accordionHeaders = document.querySelectorAll(".accordion__header");
const menuLinks = document.querySelectorAll(".menu__link");

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

// 2. Função de alteração
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
