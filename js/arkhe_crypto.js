
document.addEventListener("DOMContentLoaded", () => {
  // Verificar si ya existe una llave en el navegador
  let privateKeyHex = localStorage.getItem("arkhe_private_key");
  let publicKeyHex = localStorage.getItem("arkhe_public_key");

  if (!privateKeyHex) {
    // Generar par de llaves Ed25519
    const keypair = nacl.sign.keyPair();
    privateKeyHex = nacl.util.encodeHex(keypair.secretKey);
    publicKeyHex = nacl.util.encodeHex(keypair.publicKey);
    
    localStorage.setItem("arkhe_private_key", privateKeyHex);
    localStorage.setItem("arkhe_public_key", publicKeyHex);
    console.log("🔐 Nuevas llaves criptográficas generadas.");
  }

  const publicKeyDisplay = document.getElementById("arkhe-pubkey-display");
  if (publicKeyDisplay) {
    publicKeyDisplay.innerText = publicKeyHex.substring(0, 16) + "...";
  }

  // Función global para firmar datos (se usará en Mandalas y Cartas)
  window.firmarDestino = function(textoFirmar) {
    const encoder = new TextEncoder();
    const data = encoder.encode(textoFirmar);
    const signature = nacl.sign.detached(data, nacl.util.decodeHex(privateKeyHex));
    return nacl.util.encodeHex(signature);
  };
});
