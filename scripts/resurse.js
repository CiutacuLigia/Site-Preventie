 document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll(".cards .card");
    const sections = document.querySelectorAll("section[id]");

    cards.forEach(card => {
      card.addEventListener("click", function() {
        const targetId = this.getAttribute("data-target");

        // ascunde toate secțiunile
        sections.forEach(sec => sec.classList.add("hidden"));

        // afișează doar secțiunea selectată
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.classList.remove("hidden");
          targetSection.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  });




































  