// Variável global para controle do parallax
let parallaxAtivo = true;

// Função principal de parallax otimizada
function applyParallax(isMobile) {
  // Elementos do DOM
  const elements = {
    x: document.getElementById("home-img-lg"),
    y1: document.getElementById("parallax1"),
    y2: document.getElementById("parallax2")
  };

  // Configurações para mobile e desktop
  const config = {
    mobile: {
      x: { factor: -0.5, offset: -100 },
      y1: { factor: 0.2, offset: 3800},
      y2: { factor: -0.05, offset: 2000 }
    },
    desktop: {
      x: { factor: -0.3, offset: -100 },
      y1: { factor: 0.25, offset: 3900 },
      y2: { factor: -0.2, offset: 4800 }
    }
  };

  const currentConfig = isMobile ? config.mobile : config.desktop;
  let ticking = false;

  const handleParallax = () => {
    if (!parallaxAtivo) return;
    
    const scrollY = window.pageYOffset;
    
    if (elements.x) {
      elements.x.style.backgroundPositionX = 
        `${scrollY * currentConfig.x.factor + currentConfig.x.offset}px`;
    }
    
    if (elements.y1) {
      const offset = (scrollY - currentConfig.y1.offset) * currentConfig.y1.factor;
      elements.y1.style.backgroundPosition = `center ${offset}px`;
    }
    
    if (elements.y2) {
      elements.y2.style.backgroundPositionY = 
        `${(scrollY - currentConfig.y2.offset) * currentConfig.y2.factor}px`;
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
  window.addEventListener('scroll', onScroll, { passive: true });
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
  
  const targetId = event.target.getAttribute('href');
  if (!targetId || targetId === '#') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    history.pushState(null, null, '#');
    return;
  }

  const targetElement = document.querySelector(targetId);
  if (targetElement) {
      const navbarHeight = document.querySelector('nav').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      
      // Define os offsets específicos para cada ID
    const offsetsPorId = {
      '#local': 100,    // 100px para #local
      '#votos': 20,  // 20px para #registry
      '#historia': 40      // 40px para #story
  };
  
      // Usa o offset específico ou um valor padrão (ex: 30px)
      const offsetPersonalizado = offsetsPorId[targetId] || 30;
      
      window.scrollTo({
        top: targetPosition - navbarHeight - offsetPersonalizado,
        behavior: 'smooth'
    });
  
      // Atualiza a URL sem disparar scroll
      history.pushState(null, null, targetId);
  }

  // Reativa o parallax após 1s
  pauseParallax();
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  const isMobile = window.innerWidth < 768;
  
  // Inicia o parallax
  applyParallax(isMobile);
  
  // Configura os listeners de scroll suave
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', smoothScroll);
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
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      document.getElementById("days").textContent = days.toString().padStart(2, "0");
      document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
      document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
      document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
  }

  setInterval(updateCountdown, 1000);
  updateCountdown(); // Chamada inicial
}

// Data do casamento
const weddingDate = new Date("2025-06-21T00:00:00").getTime();
startCountdown(weddingDate);

/* <===================RSVP===================> */

const convidados = [
  { nome: "Eduardo e Rafael", telefone: "(61) 99999-xxxx" },
  { nome: "Ana Beatriz", telefone: "(61) 98888-xxxx" },
  { nome: "Carlos Santos", telefone: "(61) 97777-xxxx" },
  { nome: "Fernanda Lima", telefone: "(61) 96666-xxxx" }
];

const searchInput = document.getElementById("searchInput");
const guestList = document.getElementById("guestList");

// Habilitar pesquisa com Enter
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchGuest();
  }
});

// Função chamada diretamente pelo botão
function searchGuest() {
  const searchTerm = searchInput.value.toLowerCase().trim();

  if (!searchTerm || searchTerm.length < 3) {
    guestList.innerHTML = `<p style="color: #ef4444; font-size: 18px;">Digite um nome ou parte do nome do convite</p>`;
    return;
  }

  const filteredGuests = convidados.filter(convidado => {
    const palavras = convidado.nome.toLowerCase().split(/\s+/);
    return palavras.some(palavra => palavra.startsWith(searchTerm));
  });

  displayResults(filteredGuests);
}

// Função para exibir os resultados da pesquisa
function displayResults(guestArray) {
  guestList.innerHTML = "";

  if (guestArray.length === 0) {
    guestList.innerHTML = `<p style="color: #ef4444;">Nenhum convite encontrado.</p>`;
    return;
  }

  guestArray.forEach(convidado => {
    const inviteDiv = document.createElement("div");
    inviteDiv.classList.add('guest-list-js');

    const descriptionDiv = document.createElement("div");

    const nameP = document.createElement("p");
    nameP.classList.add('invite-card__name');
    nameP.textContent = convidado.nome;

    const phoneP = document.createElement("p");
    phoneP.classList.add('invite-card__phone');
    phoneP.innerHTML = `Tel.: <span style="text-transform: uppercase;">${convidado.telefone}</span>`;

    descriptionDiv.appendChild(nameP);
    descriptionDiv.appendChild(phoneP);

    const actionDiv = document.createElement("div");
    actionDiv.classList.add('invite-card__action');
    actionDiv.textContent = "Selecionar";

    inviteDiv.appendChild(descriptionDiv);
    inviteDiv.appendChild(actionDiv);

    guestList.appendChild(inviteDiv);
  });
}



/* <===================TICKER===================> */

document.addEventListener("DOMContentLoaded", function () {
  const tickers = document.querySelectorAll('.ticker-content');

  tickers.forEach((ticker) => {
    if (!ticker.dataset.duplicated) {
      // Clona os filhos da ticker-content
      const clonedNodes = Array.from(ticker.children).map(child => child.cloneNode(true));
      clonedNodes.forEach(clone => ticker.appendChild(clone));
      ticker.dataset.duplicated = "true";
    }

    ticker.addEventListener('mouseenter', () => {
      ticker.style.animationPlayState = 'paused';
    });

    ticker.addEventListener('mouseleave', () => {
      ticker.style.animationPlayState = 'running';
    });
  });
});
