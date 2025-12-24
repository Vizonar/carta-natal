const envelope = document.getElementById("envelope");
const resetBtn = document.getElementById("reset");
const video = document.getElementById("bgVideo");
const letterContent = document.getElementById("letterContent");

let opened = false;
let typingTimeouts = [];

// salva HTML original
const originalHTML = letterContent.innerHTML;
letterContent.innerHTML = "";

// ===== TYPEWRITER HTML =====
function startTyping() {
  letterContent.innerHTML = "";
  typingTimeouts.forEach(clearTimeout);
  typingTimeouts = [];

  const temp = document.createElement("div");
  temp.innerHTML = originalHTML;

  function typeNode(node, parent, done) {
    if (node.nodeType === Node.TEXT_NODE) {
      let text = node.textContent;
      let i = 0;
      let textNode = document.createTextNode("");
      parent.appendChild(textNode);

      function typeChar() {
        if (i < text.length) {
          textNode.textContent += text.charAt(i++);
          typingTimeouts.push(setTimeout(typeChar, 50));
        } else {
          done();
        }
      }
      typeChar();
    } 
    else if (node.nodeType === Node.ELEMENT_NODE) {
      const clone = node.cloneNode(false);
      parent.appendChild(clone);

      const children = Array.from(node.childNodes);
      let idx = 0;

      function nextChild() {
        if (idx < children.length) {
          typeNode(children[idx++], clone, nextChild);
        } else {
          done();
        }
      }
      nextChild();
    } 
    else {
      done();
    }
  }

  const nodes = Array.from(temp.childNodes);
  let index = 0;

  function nextNode() {
    if (index < nodes.length) {
      typeNode(nodes[index++], letterContent, nextNode);
    }
  }

  nextNode();
}

// ===== CLIQUE NA TELA =====
document.addEventListener("click", async (e) => {
  if (e.target.closest("#reset")) return;
  if (opened) return;

  envelope.classList.add("open");
  opened = true;

  try {
    video.muted = false;
    video.volume = 1.0;
    await video.play();
  } catch (err) {
    console.warn("Autoplay bloqueado:", err);
  }

  setTimeout(startTyping, 3800);
});

// ===== RESET =====
resetBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  envelope.classList.remove("open");
  void envelope.offsetWidth;

  typingTimeouts.forEach(clearTimeout);
  typingTimeouts = [];
  letterContent.innerHTML = "";

  video.pause();
  video.currentTime = 0;
  video.muted = true;

  opened = false;
});
