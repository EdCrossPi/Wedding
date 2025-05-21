/* <===================PARALLAX===================> */

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
      x: { factor: -0.5, offset: -2500 },
      y1: { factor: 0.2, offset: 3800 },
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

/* <===================LINK-HEF===================> */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", smoothScroll);
  });
});

function smoothScroll(event) {
  event.preventDefault();

  const targetId = event.currentTarget.getAttribute("href");
  if (!targetId || targetId === "#") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.pushState(null, null, "#");
    return;
  }

  const targetElement = document.querySelector(targetId);
  if (!targetElement) return;

  const navbar = document.querySelector("nav");
  const navbarHeight = navbar ? navbar.offsetHeight : 0;
  const targetPosition =
    targetElement.getBoundingClientRect().top + window.scrollY;

  const isMobile = window.innerWidth <= 768;
  const estaNoTopo = window.scrollY < 10;

  const offsetsDesktop = {
    "#story": -180,
    "#local": -40,
    "#votos": -130,
  };

  const offsetsMobile = {
    "#story": -100,
    "#local": -50,
    "#votos": -45,
  };
  const offsetsPorId = isMobile ? offsetsMobile : offsetsDesktop;

  // Offsets personalizados por ID (desktop e mobile)
  let offsetAplicado;

  if (estaNoTopo) {
    if (targetId === "#story") {
      offsetAplicado = isMobile ? 70 : 0;
    } else if (targetId === "#local") {
      offsetAplicado = isMobile ? 100 : 110;
    } else if (targetId === "#votos") {
      offsetAplicado = isMobile ? 95 : 100;
    } else {
      offsetAplicado = 0;
    }
  } else {
    offsetAplicado = offsetsPorId[targetId] ?? 30;
  }
  const scrollToPosition = targetPosition - navbarHeight - offsetAplicado;

  window.scrollTo({
    top: scrollToPosition,
    behavior: "smooth",
  });

  history.pushState(null, null, targetId);

  console.log("Scrolling to:", targetId);
  console.log("Offset aplicado:", offsetAplicado);
}
/* mobile checkbox */

document.addEventListener("DOMContentLoaded", function () {
  const menuLinks = document.querySelectorAll(".nav ul li a");
  const checkbox = document.getElementById("check");
  const logo = document.querySelector(".logo");

  // Fecha o menu ao clicar em qualquer link
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      checkbox.checked = false;
    });
  });

  // Fecha o menu ao clicar na logo
  if (logo) {
    logo.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      checkbox.checked = false;
    });
  }
});

/* <===================REVEAL===================> */

function reveal() {
  const reveals = document.querySelectorAll(".reveal");

  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);

function checkDevice() {
  const isMobile = window.innerWidth <= 768;
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

/* <===================TICKER===================> */

document.addEventListener("DOMContentLoaded", function () {
  const tickers = document.querySelectorAll(".ticker-content");

  tickers.forEach((ticker) => {
    if (!ticker.dataset.duplicated) {
      // Clona os filhos da ticker-content
      const clonedNodes = Array.from(ticker.children).map((child) =>
        child.cloneNode(true)
      );
      clonedNodes.forEach((clone) => ticker.appendChild(clone));
      ticker.dataset.duplicated = "true";
    }

    ticker.addEventListener("mouseenter", () => {
      ticker.style.animationPlayState = "paused";
    });

    ticker.addEventListener("mouseleave", () => {
      ticker.style.animationPlayState = "running";
    });
  });
});

/* <===================BACK-END===================> */
const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://backend-rsvp-production.up.railway.app";

let conviteSelecionado = "";

window.searchGuest = async function () {
  const nome = document.getElementById("searchInput").value.trim();
  if (!nome) {
    console.log("Campo de busca vazio, abortando.");
    return;
  }

  try {
    const res = await fetch(
      `${API_BASE}/buscar?nome=${encodeURIComponent(nome)}`
    );
    const data = await res.json(); // data será um array diretamente

    const el = document.getElementById("searchResult");

    if (Array.isArray(data) && data.length > 0) {
      displayResults(data); // Use data diretamente
    } else {
      el.innerHTML = `<p style="color: #ef4444;">Nenhum convite encontrado.</p>`;
    }
  } catch (error) {
    console.error("Erro na busca:", error);
    document.getElementById(
      "searchResult"
    ).innerHTML = `<p style="color: #ef4444;">Erro ao buscar convite.</p>`;
  }
};

const guestList = document.getElementById("guestList");
const verifyModal = document.getElementById("verifyModal");
const codigoInput = document.getElementById("codigoInput");
const verificationMessage = document.getElementById("verificationMessage");
document.getElementById("searchButton")?.addEventListener("click", searchGuest);

document.getElementById("searchInput")?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchGuest();
  }
});

function displayResults(guestArray) {
  const searchResult = document.getElementById("searchResult");
  searchResult.innerHTML = "";

  if (guestArray.length === 0) {
    searchResult.innerHTML = `<p style="color: #ef4444;">Nenhum convite encontrado.</p>`;
    return;
  }

  guestArray.forEach((convidado) => {
    const inviteDiv = document.createElement("div");
    inviteDiv.classList.add("guest-list-js");

    const descriptionDiv = document.createElement("div");

    const nameP = document.createElement("p");
    nameP.classList.add("invite-card__name");
    nameP.textContent = convidado.nome;

    const invite = document.createElement("p");
    invite.classList.add("invite-card__phone");
    invite.innerHTML = `<span style="text-transform: uppercase;">${convidado.convite.nome}</span>`;

    descriptionDiv.appendChild(nameP);
    descriptionDiv.appendChild(invite);

    const actionDiv = document.createElement("div");
    actionDiv.classList.add("invite-card__action");
    actionDiv.textContent = "Selecionar";

  // Ao clicar em selecionar abre modal para inserir código
  actionDiv.addEventListener("click", () => {
    conviteSelecionado = convidado.convite?.nome || convidado.nome || "";
    document.getElementById("modalTitle").textContent = conviteSelecionado;
    document.getElementById("codigoInput").value = ""; // limpa código
    document.getElementById("verificationMessage").textContent = ""; // limpa mensagens anteriores
    document.getElementById("guestList").innerHTML = ""; // limpa lista de convidados da modal
    document.getElementById("verifyModal").style.display = "flex"; // abre modal
    document.getElementById("searchResult").innerHTML = ""; // limpa resultado da busca
  });

    inviteDiv.appendChild(descriptionDiv);
    inviteDiv.appendChild(actionDiv);

    searchResult.appendChild(inviteDiv);
  });
}
window.verifyGuest = async function () {
  const codigo = codigoInput.value;

  try {
    const res = await fetch(`${API_BASE}/verificar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ convite, codigo }),
    });

    if (!res.ok) throw new Error("Dados inválidos");

    const data = await res.json();
    guestList.innerHTML = "";

    data.nomes.forEach((nome) => {
      const li = document.createElement("li");
      li.textContent = nome;
      li.dataset.nome = nome;
      li.classList.add("guest-item");
      li.onclick = () => li.classList.toggle("selected");
      guestList.appendChild(li);
    });

    verificationMessage.textContent = data.message || "";
  } catch (err) {
    alert("Código inválido. Ele se encontra na mensagem do convite.");
  }
};

window.confirmPresence = async function () {
  const convite = conviteInput.value;
  const nomesConfirmados = Array.from(
    document.querySelectorAll("#guestList .selected")
  ).map((li) => li.dataset.nome);

  if (!nomesConfirmados.length) {
    alert("Selecione pelo menos um nome para confirmar.");
    return;
  }

  const res = await fetch(`${API_BASE}/confirmar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ convite, nomesConfirmados }),
  });

  const data = await res.json();
  document.getElementById("confirmationMessage").textContent = data.message;
  // Fechar modal após confirmação, se quiser:
  // verifyModal.style.display = "none";
};

window.closeModal = function () {
  verifyModal.style.display = "none";
};
