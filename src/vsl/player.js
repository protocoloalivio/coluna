// VSL Player Script - Isolado das UTMs
(function() {
  // Função para carregar o player da VSL
  function loadVSLPlayer() {
    var s = document.createElement("script");
    s.src = "https://scripts.converteai.net/04883032-8909-4934-b670-acdef3d1ec63/players/6882458ee82e39bf92b7d0aa/v4/player.js";
    s.async = true;
    document.head.appendChild(s);
  }

  // Carrega o player quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadVSLPlayer);
  } else {
    loadVSLPlayer();
  }
})();