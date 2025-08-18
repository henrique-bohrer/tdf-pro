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

  // Controla o envio do formulário de contato e o pop-up de confirmação.
  const contactForm = document.getElementById('contact-form');
  const popup = document.getElementById('popup-modal');
  const popupClose = document.getElementById('popup-close');

  if (contactForm && popup && popupClose) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const data = {
        name: contactForm.elements.name.value,
        email: contactForm.elements.email.value,
        phone: contactForm.elements.phone.value,
        message: contactForm.elements.message.value,
      };

      const status = document.createElement('p');
      status.style.color = 'red';
      status.style.textAlign = 'center';
      status.style.marginTop = '1rem';

      fetch(contactForm.action, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          popup.classList.add('is-visible');
          feather.replace();
          contactForm.reset();
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              status.textContent = data["errors"].map(error => error["message"]).join(", ");
            } else {
              status.textContent = "Oops! Ocorreu um problema ao enviar seu formulário.";
            }
            contactForm.appendChild(status);
          })
        }
      }).catch(error => {
        status.textContent = "Oops! Ocorreu um problema ao enviar seu formulário.";
        contactForm.appendChild(status);
      });
    });

    const closePopup = () => {
      popup.classList.remove('is-visible');
    };

    popupClose.addEventListener('click', closePopup);
    popup.addEventListener('click', (event) => {
      if (event.target === popup) {
        closePopup();
      }
    });
  }
});
