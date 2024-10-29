import { desafios } from "./desafios.js";
import { projetos } from "./projetos.js"; // Importa módulos para funcionalidades dos projetos e desafios

const CONFIG = {
  scrollThreshold: 550,  // Usado na função showBackToTopButtonOnScroll
  animationDelay: 4000,  // Usado no setTimeout das animações
  navHeight: 7.2,        // Altura da navegação
  mobileBreakpoint: 1024 // Breakpoint para mobile
};

// Seleção de elementos DOM
const SELECTORS = {
  navigation: '#navigation',
  backToTop: '#backToTopButton',
  themeToggle: '#sw-checkbox',
  projectsSection: '#projects .wrapper',
  notebook: {
    first: '#notebook-1',
    second: '#notebook-2',
    secondWhite: '#notebook-2-white',
    glass: '#vidro'
  }
};

const navigation = document.querySelector(SELECTORS.navigation);
const backToTopButton = document.querySelector(SELECTORS.backToTop);
const toggle = document.querySelector(SELECTORS.themeToggle);
const projectsSection = document.querySelector(SELECTORS.projectsSection);

const notebook_1 = document.querySelector(SELECTORS.notebook.first);
const notebook_2 = document.querySelector(SELECTORS.notebook.second);
const notebook_2_white = document.querySelector(SELECTORS.notebook.secondWhite);
const vidro = document.querySelector(SELECTORS.notebook.glass);

// Carrega a função principal ao iniciar a página
window.addEventListener("load", function begin() {
  projetos(projectsSection); // Renderiza projetos na seção
  const desafioBtn = document.querySelector("#desafio");

  // Adiciona evento ao botão para mostrar desafios
  desafioBtn.addEventListener("click", () => {
    desafios(projectsSection);
    document
      .querySelector("#backToProjectsBtn")
      .addEventListener("click", begin); // Retorna à exibição de projetos ao clicar
  });
});

// Evento de scroll para mostrar elementos conforme rolagem
function debounce(func, wait) {
  let timeout;
  return function executedFunction() {
    const later = () => {
      clearTimeout(timeout);
      func();
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

window.addEventListener("scroll", debounce(onScroll, 50));
onScroll();

// Oculta animações após 4 segundos ao carregar a página
window.onload = setTimeout(() => {
  notebook_1.style.opacity = 0;

  notebook_1.style.animation = "none";
  notebook_2.style.animation = "none";
  notebook_2_white.style.animation = "none";
  vidro.style.animation = "none";
}, 4000);

// Função de controle de rolagem
function onScroll() {
  showNavOnScroll(); // Mostra o menu conforme a rolagem
  showBackToTopButtonOnScroll(); // Mostra botão de voltar ao topo

  // Ativa menu conforme a seção visível na tela
  activateMenuAtCurrentSection(about);
  activateMenuAtCurrentSection(projects);
  activateMenuAtCurrentSection(knowledge);
  activateMenuAtCurrentSection(contact);
}

// Função para ativar o menu na seção visível
function activateMenuAtCurrentSection(section) {
  const targetLine = scrollY + innerHeight / 2;
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;

  const sectionTopReachOrPassedTargetLine = targetLine >= sectionTop;
  const sectionEndsAt = sectionTop + sectionHeight;
  const sectionEndPassedTargetLine = sectionEndsAt <= targetLine;

  const sectionBoundaries =
    sectionTopReachOrPassedTargetLine && !sectionEndPassedTargetLine;

  const sectionId = section.getAttribute("id");
  const menuElement = document.querySelector(`.menu a[href*=${sectionId}]`);

  menuElement.classList.remove("active"); // Remove estado ativo

  // Adiciona estado ativo ao link da seção visível
  if (sectionBoundaries) {
    menuElement.classList.add("active");
  }
}

// Mostra ou oculta a navegação ao rolar a página
function showNavOnScroll() {
  if (scrollY > 0) {
    navigation.classList.add("scroll");
  } else {
    navigation.classList.remove("scroll");
  }
}

// Mostra ou oculta o botão de voltar ao topo
function showBackToTopButtonOnScroll() {
  // Trocar 550 por CONFIG.scrollThreshold
  if (scrollY > CONFIG.scrollThreshold) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
}

// Abre o menu de navegação
openMenu();
function openMenu() {
  const openBtns = document.querySelectorAll(".open");
  openBtns.forEach((e) => {
    e.addEventListener("click", () => {
      document.body.classList.add("menu-expanded"); // Adiciona classe para expandir o menu
    });
  });
}

// Fecha o menu de navegação
closeMenu();
function closeMenu() {
  const closeBtns = document.querySelectorAll(".close");
  closeBtns.forEach((e) => {
    e.addEventListener("click", () => {
      document.body.classList.remove("menu-expanded"); // Remove classe de menu expandido
    });
  });
}

// Animação de revelação dos elementos conforme a rolagem usando ScrollReveal
ScrollReveal({
  origin: "bottom",
  distance: "50px",
  duration: 1000,
}).reveal(
  `#home, 
  #home img, 
  #about, 
  #about header, 
  #about p,
  #about img,
  #projects,
  #projects header,
  #projects .card,
  #knowledge,
  #knowledg header,
  #knowledg .card,
  #contact,
  #contact header`
);

// Ativa o modo claro ao carregar a página
document.body.classList.add("light-mode");

// Alterna entre modos claro e escuro ao interagir com o toggle
toggle.addEventListener("change", () => {
  document.body.classList.toggle("light-mode");
});

// Exibe botão de rolar para o topo ao descer a página
document.addEventListener('DOMContentLoaded', () => {
  const scrollToTopButton = document.getElementById('scrollToTop');

  // Mostra botão conforme a rolagem
  window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
          scrollToTopButton.classList.add('visible');
      } else {
          scrollToTopButton.classList.remove('visible');
      }
  });

  // Rola suavemente para o topo ao clicar no botão
  scrollToTopButton.addEventListener('click', () => {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });
});
