document.addEventListener('DOMContentLoaded', (event) => {
  // Inicializa os ícones da biblioteca Feather Icons.
  feather.replace();

  // Define o ano atual no rodapé.
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Configura a animação de fade-in para elementos quando eles entram na tela.
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Aplica o observador a todos os elementos com a classe 'fade-in-on-scroll'.
  document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // Controla a funcionalidade de acordeão (abrir/fechar) para a seção de FAQ.
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(button => {
    button.addEventListener('click', () => {
      const answer = button.nextElementSibling;
      const icon = button.querySelector('i');

      // Alterna a visibilidade da resposta.
      if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
        icon.style.transform = 'rotate(0deg)';
      } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
        icon.style.transform = 'rotate(180deg)';
      }
    });
  });
});
