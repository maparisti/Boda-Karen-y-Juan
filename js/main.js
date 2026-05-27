/* ===== PASAJEROS ===== */
const passengerList = {
  1: "Juan Luis, Erika, Maria Daniela, Maria Victoria",
  2: "Eliseo, Virginia",
  3: "Hernan, Angela",
  4: "Raywin",
  5: "Merlys, Richard",
  6: "Luis, Estefany, Bell",
  7: "Paula",
  8: "Norby, Alejandro, Salomé",
  9: "Paulina, Yandy",
  10: "Lina",
  11: "Hernan Eduardo, Onelia",
  12: "Maria Gabriela, Williams, Loreto",
  13: "Luisa",
  14: "Pablo, Ivette, Gaspar, Maite",
  15: "Rodrigo",
  16: "Zundery",
  17: "Haidy",
  18: "Kathe, Juli, Gabi",
  19: "Geraldine",
  20: "Phillipe, Marcela",
  21: "Gleiber, Yehison",
  22: "Xavier, Gael",
  23: "Elbano",
  24: "Jose Marie",
  25: "Juan Sebastian",
  26: "Claudia",
  27: "Rafael",
  28: "Altagracia",
  29: "Jason",
  30: "Nelly, Mauricio",
  31: "Carlos Mendez",
  32: "Jonathan",
  33: "Johana",
  34: "Camilo",
  35: "Jessica y Maca",
  36: "Dinorah",
  37: "Andrea",
  38: "Billy, Marjorie",
  39: "Jose Daniel"
};

document.addEventListener("DOMContentLoaded", () => {
  /* ===== PORTADA / ABRIR INVITACIÓN ===== */
  document.body.classList.add("invitation-locked");
  document.body.classList.remove("invitation-open");

  const openInvitationButton = document.getElementById("openInvitation");
  const invitationContent = document.getElementById("invitationContent");
  const passportCover = document.querySelector(".passport-cover");
  const pageLoader = document.getElementById("pageLoader");

  /* ===== MÚSICA ===== */
  const bgMusic = document.getElementById("bgMusic");
  const musicToggle = document.getElementById("musicToggle");
  let musicStartedOnce = false;

  function updateMusicButton(isPlaying) {
    if (!musicToggle) return;

    musicToggle.classList.toggle("is-playing", isPlaying);
    musicToggle.classList.add("is-visible");
    musicToggle.setAttribute(
      "aria-label",
      isPlaying ? "Pausar música" : "Reproducir música"
    );
    musicToggle.textContent = isPlaying ? "♫" : "♪";
  }

  if (musicToggle && bgMusic) {
    musicToggle.addEventListener("click", async () => {
      try {
        if (bgMusic.paused) {
          await bgMusic.play();
          updateMusicButton(true);
          musicStartedOnce = true;
        } else {
          bgMusic.pause();
          updateMusicButton(false);
        }
      } catch (error) {
        console.error("No se pudo reproducir la música:", error);
      }
    });
  }

  if (openInvitationButton && invitationContent && passportCover) {
    openInvitationButton.addEventListener("click", async () => {
      invitationContent.classList.add("invitation-content--visible");
      document.body.classList.remove("invitation-locked");
      document.body.classList.add("invitation-open");

      passportCover.remove();

      window.scrollTo({
        top: 0,
        behavior: "auto"
      });

      if (musicToggle) {
        musicToggle.classList.add("is-visible");
      }

      if (bgMusic && !musicStartedOnce) {
        try {
          bgMusic.currentTime = 30; // cambia 42 por el segundo que quieras
          await bgMusic.play();
          updateMusicButton(true);
          musicStartedOnce = true;
        } catch (error) {
          console.error("No se pudo iniciar la música:", error);
        }
      }
    });
  }

  /* ===== PASAJEROS ===== */
  const params = new URLSearchParams(window.location.search);
  const passengerId = params.get("inv");
  const passengersElement = document.getElementById("passengers");

  if (passengersElement && passengerId && passengerList[passengerId]) {
    passengersElement.textContent = passengerList[passengerId];
  }

  /* ===== CARRUSEL DE RECUERDOS ===== */
  const memoriesCarousel = document.getElementById("memoriesCarousel");
  const memoriesDotsContainer = document.getElementById("memoriesDots");

  if (memoriesCarousel && memoriesDotsContainer) {
    const memoriesSlides = Array.from(
      memoriesCarousel.querySelectorAll(".memories-carousel__slide")
    );

    const memoriesDots = Array.from(
      memoriesDotsContainer.querySelectorAll(".memories-carousel__dot")
    );

    if (memoriesSlides.length && memoriesDots.length) {
      function setActiveDot(index) {
        memoriesDots.forEach((dot, i) => {
          dot.classList.toggle("is-active", i === index);
        });
      }

      function getClosestSlideIndex() {
        const carouselRect = memoriesCarousel.getBoundingClientRect();
        const carouselCenter = carouselRect.left + carouselRect.width / 2;

        let closestIndex = 0;
        let closestDistance = Infinity;

        memoriesSlides.forEach((slide, index) => {
          const slideRect = slide.getBoundingClientRect();
          const slideCenter = slideRect.left + slideRect.width / 2;
          const distance = Math.abs(carouselCenter - slideCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        return closestIndex;
      }

      let scrollTimeout;

      memoriesCarousel.addEventListener("scroll", () => {
        clearTimeout(scrollTimeout);

        scrollTimeout = setTimeout(() => {
          const activeIndex = getClosestSlideIndex();
          setActiveDot(activeIndex);
        }, 50);
      });

      memoriesDots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          memoriesSlides[index].scrollIntoView({
            behavior: "smooth",
            inline: "start",
            block: "nearest"
          });

          setActiveDot(index);
        });
      });

      setActiveDot(0);
    }
  }
  
  window.addEventListener("load", () => {
  if (pageLoader) {
    pageLoader.classList.add("is-hidden");
  }
});
});