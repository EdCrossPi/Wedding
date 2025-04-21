// Variável global para controle do parallax
let parallaxAtivo = true;

// Função principal de parallax otimizada
function applyParallax(isMobile) {
  // Elementos do DOM
  const elements = {
    x: document.getElementById("home-img-lg"),
    y1: document.getElementById("parallax1"),
    y2: document.getElementById("parallax2"),
  };

  // Configurações para mobile e desktop
  const config = {
    mobile: {
      x: { factor: -0.5, offset: -100 },
      y1: { factor: 0.2, offset: 3100 },
      y2: { factor: -0.05, offset: 2000 },
    },
    desktop: {
      x: { factor: -0.3, offset: -100 },
      y1: { factor: 0.25, offset: 3900 },
      y2: { factor: -0.2, offset: 4800 },
    },
  };

  const currentConfig = isMobile ? config.mobile : config.desktop;
  let ticking = false;

  const handleParallax = () => {
    if (!parallaxAtivo) return;

    const scrollY = window.pageYOffset;

    if (elements.x) {
      elements.x.style.backgroundPositionX = `${
        scrollY * currentConfig.x.factor + currentConfig.x.offset
      }px`;
    }

    if (elements.y1) {
      const offset =
        (scrollY - currentConfig.y1.offset) * currentConfig.y1.factor;
      elements.y1.style.backgroundPosition = `center ${offset}px`;
    }

    if (elements.y2) {
      elements.y2.style.backgroundPositionY = `${
        (scrollY - currentConfig.y2.offset) * currentConfig.y2.factor
      }px`;
    }

    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleParallax();
        ticking = false;
      });
      ticking = true;
    }
  };

  // Inicialização
  window.addEventListener("scroll", onScroll, { passive: true });
  handleParallax();

  // Retorna função para desativar temporariamente
  return () => {
    parallaxAtivo = false;
    setTimeout(() => {
      parallaxAtivo = true;
    }, 2000);
  };
}

// Função de scroll suave que integra com o parallax
function smoothScroll(event) {
  event.preventDefault();

  // Pausa o parallax temporariamente
  const pauseParallax = applyParallax(false); // Passa o valor isMobile apropriado

  const targetId = event.target.getAttribute("href");
  if (!targetId || targetId === "#") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.pushState(null, null, "#");
    return;
  }

  const targetElement = document.querySelector(targetId);
  if (targetElement) {
    const navbarHeight = document.querySelector("nav").offsetHeight;
    const targetPosition =
      targetElement.getBoundingClientRect().top + window.pageYOffset;

    // Define os offsets específicos para cada ID
    const offsetsPorId = {
      "#local": 100, // 100px para #local
      "#votos": 20, // 20px para #registry
      "#historia": 40, // 40px para #story
    };

    // Usa o offset específico ou um valor padrão (ex: 30px)
    const offsetPersonalizado = offsetsPorId[targetId] || 30;

    window.scrollTo({
      top: targetPosition - navbarHeight - offsetPersonalizado,
      behavior: "smooth",
    });

    // Atualiza a URL sem disparar scroll
    history.pushState(null, null, targetId);
  }

  // Reativa o parallax após 1s
  pauseParallax();
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  const isMobile = window.innerWidth < 768;

  // Inicia o parallax
  applyParallax(isMobile);

  // Configura os listeners de scroll suave
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", smoothScroll);
  });
});

function reveal() {
  const reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);

function checkDevice() {
  const isMobile = window.innerWidth <= 768; // Adjust threshold as needed
  applyParallax(isMobile);
}

// Initial check
checkDevice();

// Re-check on resize
window.addEventListener("resize", checkDevice);

/* <===================COUNTDOWN===================> */

// Contagem regressiva

function startCountdown(targetDate) {
  function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft <= 0) {
      document.getElementById("days").textContent = "00";
      document.getElementById("hours").textContent = "00";
      document.getElementById("minutes").textContent = "00";
      document.getElementById("seconds").textContent = "00";
      return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days
      .toString()
      .padStart(2, "0");
    document.getElementById("hours").textContent = hours
      .toString()
      .padStart(2, "0");
    document.getElementById("minutes").textContent = minutes
      .toString()
      .padStart(2, "0");
    document.getElementById("seconds").textContent = seconds
      .toString()
      .padStart(2, "0");
  }

  setInterval(updateCountdown, 1000);
  updateCountdown(); // Chamada inicial
}

// Data do casamento
const weddingDate = new Date("2025-06-21T00:00:00").getTime();
startCountdown(weddingDate);

/* <===================RSVP===================> */

tailwind.config = {
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false, // Desativa o reset global do Tailwind
  },
};

const convidados = [
  { nome: "Eduardo e Rafael", telefone: "(61) 99999-xxxx" },
  { nome: "Ana Beatriz", telefone: "(61) 98888-xxxx" },
  { nome: "Carlos Santos", telefone: "(61) 97777-xxxx" },
  { nome: "Fernanda Lima", telefone: "(61) 96666-xxxx" },
];

/* <===================RSVP===================> */
document.addEventListener("DOMContentLoaded", () => {
  // Lista de teste com nome e número de identificação
  const items = [
    { name: "Ana", number: "12345" },
    { name: "João", number: "67890" },
    { name: "Carlos", number: "54321" },
    { name: "Maria", number: "98765" },
    { name: "Lucas", number: "11223" },
    { name: "Fernanda", number: "33445" },
    { name: "Pedro", number: "55678" },
    { name: "Larissa", number: "99887" },
  ];

  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const guestList = document.getElementById("guestList");

  // Função para mostrar resultados com nome e número
  const showResults = (results) => {
    guestList.innerHTML = ""; // Limpa a lista anterior
    if (results.length > 0) {
      results.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add(
          "card",
          "p-4",
          "border",
          "rounded-lg",
          "shadow-sm",
          "bg-white",
          "hover:shadow-lg",
          "transition-shadow",
          "border-black",
          "border"
        );
        card.innerHTML = `
          <div class="font-semibold text-lg text-gray-800">${item.name}</div>
          <div class="text-sm text-gray-500">Número: ${item.number}</div>
        `;
        guestList.appendChild(card);
      });
    } else {
      guestList.innerHTML =
        '<p class="text-gray-500">Nenhum resultado encontrado.</p>';
    }
  };

  // Função para filtrar a lista de itens com base em nome exato (sem includes)
  const filterItems = () => {
    const searchText = searchInput.value.trim().toLowerCase();
    const filteredItems = items.filter(
      (item) => item.name.toLowerCase() === searchText
    );
    showResults(filteredItems);
  };

  // Apenas pesquisa ao clicar ou pressionar enter (sem buscar automaticamente ao digitar)
  searchButton.addEventListener("click", filterItems);

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Evita recarregar a página
      filterItems();
    }
  });
});

/* <===================TICKER===================> */

document.querySelector(".ticker-content").addEventListener("mouseenter", () => {
  document.querySelector(".ticker-content").style.animationPlayState = "paused";
});

document.querySelector(".ticker-content").addEventListener("mouseleave", () => {
  document.querySelector(".ticker-content").style.animationPlayState =
    "running";
});

const ticker = document.querySelector(".ticker-content");
ticker.innerHTML += ticker.innerHTML; // Duplica o conteúdo
