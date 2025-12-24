
  const envelope = document.getElementById("envelope");
  const resetBtn = document.getElementById("reset");
  const video = document.getElementById("bgVideo");

  let opened = false;

  document.addEventListener("click", async (e) => {
    // Ignora clique no reset
    if (e.target.closest("#reset")) return;

    if (opened) return;

    // Abre o envelope
    envelope.classList.add("open");
    opened = true;

    // Inicia vídeo + áudio
    try {
      video.muted = false;   // libera o som
      video.volume = 1.0;    // volume máximo permitido
      await video.play();
    } catch (err) {
      console.warn("Autoplay bloqueado:", err);
    }
  });

  resetBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    envelope.classList.remove("open");
    void envelope.offsetWidth;

    // Para vídeo
    video.pause();
    video.currentTime = 0;
    video.muted = true;

    opened = false;
  });

