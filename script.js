// Aguarda o conteúdo da página carregar completamente antes de executar o script
document.addEventListener('DOMContentLoaded', (event) => {

  // Ativa e substitui as tags <i> com os ícones da biblioteca Feather Icons
  feather.replace();

  // Atualiza o ano no rodapé para o ano corrente automaticamente
  // Isso evita ter que mudar o ano manualmente todo dia 1º de Janeiro
  const yearElement = document.getElementById('year');
  if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
  }

  // Lógica para a animação de "fade-in" dos elementos ao rolar a página
  // Cria um 'observador' que vigia quando um elemento entra na tela
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          // Se o elemento está visível na tela
          if (entry.isIntersecting) {
              // Adiciona a classe 'fade-in' para ativar a animação CSS
              entry.target.classList.add('fade-in');
              // Para de observar o elemento para não repetir a animação
              observer.unobserve(entry.target);
          }
      });
  }, {
      // A animação começa quando 10% do elemento estiver visível
      threshold: 0.1
  });

  // Seleciona todos os elementos que devem ter a animação e manda o observador vigiá-los
  document.querySelectorAll('section > div, main > div').forEach(el => {
      observer.observe(el);
  });

});
