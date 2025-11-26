// Fonction principale
const fetchData = () => {
  fetch("customize.json")
    .then(response => response.json())
    .then(data => {
      Object.keys(data).forEach(key => {
        const element = document.querySelector(`[data-node-name*="${key}"]`);
        if (element) {
          if (key === "imagePath") {
            element.setAttribute("src", data[key]);
          } else {
            element.innerText = data[key];
          }
        }
      });
      animationTimeline();
    })
    .catch(err => console.error("Erreur chargement JSON:", err));
};

const safeTextToSpans = (el) => {
  if (!el) return;
  // utilise textContent pour récupérer le texte brut (sans balises)
  const text = el.textContent || "";
  // si texte vide => rien à faire
  if (!text.trim()) return;
  // vide l'élément puis recrée des spans proprement
  el.innerHTML = "";
  const frag = document.createDocumentFragment();
  for (const ch of text) {
    const span = document.createElement("span");
    span.textContent = ch === " " ? "\u00A0" : ch; // préserve espaces
    span.style.display = "inline-block";
    span.style.opacity = 0;
    frag.appendChild(span);
  }
  el.appendChild(frag);
};

const animationTimeline = () => {
  // Préparation des textes pour l'animation lettre par lettre (plus sûr)
  const textBoxChars = document.querySelector(".hbd-chatbox");
  const hbd = document.querySelector(".wish-hbd");
  const big = document.querySelector(".idea-6");

  // Sécurise l'existence des éléments avant d'agir
  if (!textBoxChars || !hbd || !big) {
    console.error("Un ou plusieurs éléments d'animation sont introuvables:", {
      textBoxChars: !!textBoxChars,
      hbd: !!hbd,
      big: !!big
    });
    // on continue quand même si certains existent
  }

  // transforme en spans lettre-par-lettre (méthode sûre)
  safeTextToSpans(textBoxChars);
  safeTextToSpans(hbd);
  safeTextToSpans(big);

  // Timeline
  const tl = new TimelineMax();

  tl.to(".container", 0.6, { visibility: "visible" })
    .from(".one", 0.9, { opacity: 0, y: 10 })
    .from(".two", 0.6, { opacity: 0, y: 10 })
    .to(".one", 0.9, { opacity: 0, y: 10 }, "+=3.0")
    .to(".two", 0.9, { opacity: 0, y: 10 }, "-=1.5")
    .from(".three", 0.9, { opacity: 0, y: 10 })
    .to(".three", 0.9, { opacity: 0, y: 10 }, "+=2.5")
    .from(".four", 0.9, { scale: 0.2, opacity: 0 })
    .from(".fake-btn", 0.4, { scale: 0.2, opacity: 0 })
    .staggerTo(".hbd-chatbox span", 0.05, { visibility: "visible", opacity: 1, y: 0 }, 0.04)
    .to(".fake-btn", 0.1, { backgroundColor: "#e73c7e", scale: 1.1 })
    .to(".four", 0.6, { scale: 0.2, opacity: 0, y: -150 }, "+=1.0")

    .from(".idea-1", 0.9, { opacity: 0, y: -20, rotationX: 5, skewX: "15deg" })
    .to(".idea-1", 0.9, { opacity: 0, y: 20, rotationY: 5, skewX: "-15deg" }, "+=2.0")
    .from(".idea-2", 0.9, { opacity: 0, y: -20, rotationX: 5, skewX: "15deg" })
    .to(".idea-2", 0.9, { opacity: 0, y: 20, rotationY: 5, skewX: "-15deg" }, "+=2.0")
    .from(".idea-3", 0.9, { opacity: 0, y: -20, rotationX: 5, skewX: "15deg" })
    .to(".idea-3 strong", 0.6, { scale: 1.2, x: 10, backgroundColor: "#fff", color: "#e73c7e" })
    .to(".idea-3", 0.9, { opacity: 0, y: 20, rotationY: 5, skewX: "-15deg" }, "+=2.0")
    .from(".idea-4", 0.9, { opacity: 0, y: -20, rotationX: 5, skewX: "15deg" })
    .to(".idea-4", 0.9, { opacity: 0, y: 20, rotationY: 5, skewX: "-15deg" }, "+=2.0")
    .from(".idea-5", 0.9, { rotationX: 15, rotationZ: -10, skewY: "-5deg", y: 50, z: 10, opacity: 0 }, "+=0.5")
    .to(".idea-5 .smiley", 0.9, { rotation: 90, x: 8 }, "+=0.4")
    .to(".idea-5", 0.9, { scale: 0.2, opacity: 0 }, "+=2.5");

  // --- BIG TEXT: apparition forte au centre ---
  // anime chaque lettre de .idea-6 (les spans ont été créés par safeTextToSpans)
  tl.staggerFromTo(
    ".idea-6 span",
    1.0,
    { opacity: 0, scale: 0.6, y: 40, rotation: 10 },
    { opacity: 1, scale: 1, y: 0, rotation: 0, ease: Expo.easeOut },
    0.12,
    "+=0.2"
  )
  // pause, puis sortie
  .staggerTo(
    ".idea-6 span",
    1.0,
    { opacity: 0, scale: 0.6, y: -60, rotation: -10, ease: Expo.easeIn },
    0.06,
    "+=1.6"
  );

  // suite normale
  tl.staggerFromTo(".baloons img", 3.0, { opacity: 0.9, y: 1400 }, { opacity: 1, y: -1000 }, 0.2)
    .from(".lydia-dp", 0.7, { scale: 3.5, opacity: 0, x: 25, y: -25, rotationZ: -45 }, "-=2.5")
    .from(".hat", 0.7, { x: -100, y: 350, rotation: -180, opacity: 0 })
    .staggerFrom(".wish-hbd span", 0.7, { opacity: 0, y: -50, rotation: 150, skewX: "30deg", ease: Elastic.easeOut.config(1, 0.5) }, 0.1)
    .staggerFromTo(".wish-hbd span", 0.7, { scale: 1.4, rotationY: 150 }, { scale: 1, rotationY: 0, color: "#fff", ease: Expo.easeOut }, 0.1, "party")
    .from(".wish h5", 0.7, { opacity: 0, y: 10, skewX: "-15deg" }, "party")
    .staggerTo(".eight svg", 1.8, { visibility: "visible", opacity: 0, scale: 80, repeat: 3, repeatDelay: 1.6 }, 0.3)
    .to(".six", 0.7, { opacity: 0, y: 30, zIndex: "-1" })
    .staggerFrom(".nine p", 1.2, { opacity: 0, y: -20, rotationX: 5, skewX: "15deg" }, 1.5)
    .to(".last-smile", 0.7, { rotation: 90 }, "+=1.5");

  // Restart Animation
  const replyBtn = document.getElementById("replay");
  if (replyBtn) {
    replyBtn.addEventListener("click", () => {
      tl.restart();
    });
  } else {
    console.warn("#replay non trouvé");
  }
};

fetchData();

