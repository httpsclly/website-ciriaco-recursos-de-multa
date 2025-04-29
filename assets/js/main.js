/* ==================== CARROSSEL ==================== */
let currentSlide = 0;
const slides = document.querySelector('.carousel'); // Elemento que se move
const cards = slides.querySelectorAll('.card');    // Os itens dentro do carrossel
const totalCards = cards.length;
const carouselContainer = document.querySelector('.carousel-container'); // Container visível

function calculateCardWidth() {
    if (cards.length === 0) return 0;
    const card = cards[0];
    const style = getComputedStyle(card);
    // Calcula a largura total: largura do elemento + margem esquerda + margem direita
    // offsetWidth inclui padding e border. Se usar box-sizing: border-box, geralmente é o que você quer.
    // Adicionamos as margens explicitamente.
    const cardWidth = card.offsetWidth + parseInt(style.marginLeft) + parseInt(style.marginRight);
    return cardWidth;
}

function calculateVisibleCards() {
    if (!carouselContainer) return 1; // Segurança
    const containerWidth = carouselContainer.offsetWidth;
    const cardWidth = calculateCardWidth();
    if (cardWidth === 0) return 1;
    // Calcula quantos cards cabem aproximadamente no container
    // Usamos Math.max para garantir pelo menos 1, e Math.floor para arredondar para baixo.
    return Math.max(1, Math.floor(containerWidth / cardWidth));
}

function showSlide(index) {
    const cardWidth = calculateCardWidth();
    if (cardWidth === 0 || totalCards === 0) return; // Não faz nada se não houver cards ou largura

    const visibleCards = calculateVisibleCards();

    // Define os limites para o índice (currentSlide)
    // O índice máximo permitido é quando os últimos 'visibleCards' estão visíveis
    const maxIndex = Math.max(0, totalCards - visibleCards); // Não pode ser menor que 0

    // Ajusta o índice para ficar dentro dos limites [0, maxIndex]
    if (index > maxIndex) {
        currentSlide = maxIndex;
    } else if (index < 0) {
        currentSlide = 0;
    } else {
        currentSlide = index;
    }

    // Calcula o deslocamento em pixels
    const offset = currentSlide * cardWidth;

    // Aplica a transformação CSS para mover o carrossel
    slides.style.transform = `translateX(-${offset}px)`;

    // Opcional: Desabilitar botões no início/fim
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    if (prevBtn) prevBtn.disabled = currentSlide === 0;
    if (nextBtn) nextBtn.disabled = currentSlide === maxIndex || totalCards <= visibleCards; // Desabilita se todos estão visíveis
}

function nextSlide() {
    // Só avança se não estiver no último slide possível
    const visibleCards = calculateVisibleCards();
    const maxIndex = Math.max(0, totalCards - visibleCards);
    if (currentSlide < maxIndex) {
      showSlide(currentSlide + 1);
    }
}

function prevSlide() {
    // Só volta se não estiver no primeiro slide
    if (currentSlide > 0) {
      showSlide(currentSlide - 1);
    }
}

// Inicializar o carrossel
showSlide(currentSlide);

// Opcional: Atualizar o carrossel se a janela for redimensionada
window.addEventListener('resize', () => {
    // Apenas re-executa showSlide com o índice atual para recalcular larguras e posições
    showSlide(currentSlide);
});


/* ==================== RESTANTE DO SEU CÓDIGO JS ==================== */

/*------------ SHOW MENU-------------*/
const showMneu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)
    /*valida se se existe as variaveis*/
    if (toggle && nav) {
        /*aqui adiciono a class show-menu na div com a class nav__menu*/
        toggle.addEventListener('click', () => {
            /*adicina a class show-menu na div que tem o id nav-menu */
            nav.classList.toggle('show-menu')
        })
    }
}
showMneu('nav-toggle', 'nav-menu')

/*------------ REMOVER MENU MOBILE-------------*/
const navLink = document.querySelectorAll('.nav__link')
function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    /*Quando um link for clicado a class show-menu será removido*/
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== DEIXA O LINK CLICADO COM A CLASS ACTIVE-LINK ====================*/
const linkColor = document.querySelectorAll('.nav__link')

function colorLink(){
    if(linkColor){
        linkColor.forEach(L => L.classList.remove('active-link'))
        this.classList.add('active-link')
    }
}

linkColor.forEach(L=> L.addEventListener('click', colorLink))

/*------------BOX SHADOW NO HEADER-------------*/
function scrollHeader(){
    const scrollHeader = document.getElementById('header');
    // Quando o scroll tiver um altura maior que 200 será adiconado a class scroll-header na tag Header
    if(this.scrollY >= 200) scrollHeader.classList.add('scroll-header'); else scrollHeader.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*------------SHOW SCROLL TOP------------- */
function scrollTop(){
    const scrollTop = document.getElementById('scroll-top');
    // Quando o scroll tiver um altura maior que 560 será adiconado a class scroll-top
    if(this.scrollY >= 560) scrollTop.classList.add('scroll-top'); else scrollTop.classList.remove('scroll-top')
}
window.addEventListener('scroll', scrollTop)


/* ==================== MODALS ==================== */
// Modal Lei Seca
document.getElementById('alertButton').addEventListener('click', function() {
    document.getElementById('softAlertModal').style.display = 'block';
});
document.querySelector('#softAlertModal .close').addEventListener('click', function() {
    document.getElementById('softAlertModal').style.display = 'none';
});
window.addEventListener('click', function(event) {
    if (event.target == document.getElementById('softAlertModal')) {
        document.getElementById('softAlertModal').style.display = 'none';
    }
});

// Modal Recursos de Multas
document.getElementById('secondAlertButton').addEventListener('click', function() {
    document.getElementById('secondSoftAlertModal').style.display = 'block';
});
// ATENÇÃO: Você tem DOIS modais com a classe 'close-second'. Isso é problemático.
// Vou assumir que o primeiro 'close-second' é para 'secondSoftAlertModal'
// E o segundo (no modal 'AlertModal') deveria ter outra classe ou ID.
// Corrigindo para o secondSoftAlertModal:
document.querySelector('#secondSoftAlertModal .close-second').addEventListener('click', function() {
     document.getElementById('secondSoftAlertModal').style.display = 'none';
});
window.addEventListener('click', function(event) {
     if (event.target == document.getElementById('secondSoftAlertModal')) {
         document.getElementById('secondSoftAlertModal').style.display = 'none';
     }
});

// --- Modal para o Curso EAD (acionado por 'openCourseModalButton') ---

// Pega o botão que deve abrir este modal
const openCourseButton = document.getElementById('openCourseModalButton');
// Pega o elemento do modal
const courseModal = document.getElementById('AlertModal');
// Pega o botão de fechar DENTRO deste modal específico
// ***** ATENÇÃO: Substitua '.close-alert' pela classe REAL do seu botão de fechar neste modal *****
const closeCourseButton = courseModal ? courseModal.querySelector('.close-alert') : null;

// Verifica se todos os elementos necessários foram encontrados
if (openCourseButton && courseModal && closeCourseButton) {

  // 1. Adiciona o listener para ABRIR o modal quando o botão for clicado
  openCourseButton.addEventListener('click', function(event) {
    event.preventDefault(); // Impede que o link <a> navegue para '#'
    console.log("Tentando abrir o modal: AlertModal"); // Log para depuração
    courseModal.style.display = 'block'; // Mostra o modal
  });

  // 2. Adiciona o listener para FECHAR o modal quando o botão X for clicado
  closeCourseButton.addEventListener('click', function() {
    console.log("Fechando o modal AlertModal pelo botão X"); // Log para depuração
    courseModal.style.display = 'none'; // Esconde o modal
  });

  // 3. Adiciona o listener para FECHAR o modal quando clicar FORA dele (no fundo)
  window.addEventListener('click', function(event) {
    // Verifica se o elemento clicado (event.target) é exatamente o fundo do modal
    if (event.target == courseModal) {
      console.log("Fechando o modal AlertModal por clique fora"); // Log para depuração
      courseModal.style.display = 'none'; // Esconde o modal
    }
  });

} else {
  // Se algum elemento não foi encontrado, mostra um erro no console
  console.error("Erro ao configurar o modal 'AlertModal'. Verifique se os elementos existem no HTML com os IDs/Classes corretos:");
  console.error("- Botão de abrir ID: openCourseModalButton", openCourseButton ? '(Encontrado)' : '(NÃO ENCONTRADO!)');
  console.error("- Modal ID: AlertModal", courseModal ? '(Encontrado)' : '(NÃO ENCONTRADO!)');
  // Lembre-se de verificar a classe do botão de fechar!
  console.error("- Botão de fechar (classe .close-alert dentro de #AlertModal)", closeCourseButton ? '(Encontrado)' : '(NÃO ENCONTRADO!)');
}

// Modal Suspensão CNH
document.getElementById('openResourcesPenaltyModalButton').addEventListener('click', function() {
    document.getElementById('resourcesPenaltyModal').style.display = 'block';
});
document.querySelector('.resources-modal-close').addEventListener('click', function() {
    document.getElementById('resourcesPenaltyModal').style.display = 'none';
});
window.addEventListener('click', function(event) {
    if (event.target == document.getElementById('resourcesPenaltyModal')) {
        document.getElementById('resourcesPenaltyModal').style.display = 'none';
    }
});

// Modal Cassação CNH
document.getElementById('showResourcesModalButton').addEventListener('click', function() {
    document.getElementById('resourcesModal').style.display = 'block';
});
document.querySelector('.resources-close').addEventListener('click', function() {
    document.getElementById('resourcesModal').style.display = 'none';
});
window.addEventListener('click', function(event) {
    if (event.target == document.getElementById('resourcesModal')) {
        document.getElementById('resourcesModal').style.display = 'none';
    }
});

