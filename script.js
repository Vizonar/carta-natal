const envelope = document.querySelector('.envelope');
const resetBtn = document.getElementById('reset');
const letterContent = document.querySelector('.letter-content');
const spotifyPopup = document.getElementById('spotify-popup');
const video = document.getElementById('bg-video');

// ================= RESET =================
resetBtn.addEventListener('click', (e) => {
  e.stopPropagation();

  envelope.classList.remove('open');

  // reseta texto
  letterContent.style.animation = 'none';
  letterContent.offsetHeight;
  letterContent.style.animation = '';

  // esconde popup
  spotifyPopup.style.opacity = '0';
  spotifyPopup.style.transform = 'translateY(20px)';

  // pausa vídeo
  video.pause();
});

// ================= ABRIR AO CLICAR =================
document.addEventListener('click', (e) => {
  if (e.target.closest('#reset')) return;
  if (envelope.classList.contains('open')) return;

  envelope.classList.add('open');

  // ▶️ toca o vídeo COM SOM
  video.muted = false;
  video.volume = 1.0; 
  video.play().catch(() => {
    console.log('Autoplay bloqueado até interação');
  });

  // mostra popup
  spotifyPopup.style.animation = 'none';
  spotifyPopup.offsetHeight;
  spotifyPopup.style.animation = 'spotifyIn 0.8s ease forwards';
});
