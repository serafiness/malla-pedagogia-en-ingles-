document.addEventListener('DOMContentLoaded', () => {
  const ramos = document.querySelectorAll('.ramo');

  // Inicialmente deshabilitar todos los ramos con dependencias
  ramos.forEach(b => {
    if (b.dataset.id && !b.hasAttribute('data-unlocked')) {
      b.disabled = true;
    }
  });

  // Habilitar los que no tienen requisitos
  ramos.forEach(b => {
    if (!Array.from(document.querySelectorAll('[data-unlocks]')).some(x => {
      const unlocks = x.dataset.unlocks?.split(',');
      return unlocks && unlocks.includes(b.dataset.id);
    })) {
      b.disabled = false;
    }
  });

  ramos.forEach(b => {
    b.addEventListener('click', () => {
      if (b.disabled) return;

      b.classList.toggle('aprobado');

      if (b.classList.contains('aprobado')) {
        const unlocks = b.dataset.unlocks?.split(',');
        if (unlocks) {
          unlocks.forEach(id => {
            const target = document.querySelector(`.ramo[data-id="${id}"]`);
            if (target) target.disabled = false;
          });
        }
      } else {
        // Si desmarcas, vuelve a bloquear dependientes
        const id = b.dataset.id;
        document.querySelectorAll('.ramo').forEach(x => {
          const deps = x.dataset.unlocks?.split(',');
          if (deps && deps.includes(id)) {
            x.classList.remove('aprobado');
            x.disabled = true;
          }
        });
      }
    });
  });
});
