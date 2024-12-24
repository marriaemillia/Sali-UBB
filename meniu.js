// Simulează click-ul pe diferite opțiuni de meniu
document.querySelectorAll('.menu-list a').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault(); // Previne navigarea pentru testare
    alert(`Ai selectat: ${link.textContent}`);
  });
});
