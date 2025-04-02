import React, { useState, useEffect } from "react";
import ScrollReveal from "scrollreveal"; // Importa ScrollReveal
import "../styles/global.scss";

const CriarPage = () => {
  const [palavraChave, setPalavraChave] = useState("");
  const [reflexao, setReflexao] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastRequestTime, setLastRequestTime] = useState(0);

  useEffect(() => {
    ScrollReveal().reveal(".wrapper", { duration: 1000, origin: "top", distance: "30px", easing: "ease-in-out" });
    ScrollReveal().reveal("h2, h3", { duration: 1200, origin: "left", distance: "50px", delay: 200 });
    ScrollReveal().reveal(".reflexao-form", { duration: 1400, origin: "right", distance: "50px", delay: 400 });
    ScrollReveal().reveal(".popup", { duration: 1000, scale: 0.85, delay: 200 });

  const animatePetals = () => {
    const petalsContainer = document.createElement('div');
    petalsContainer.id = 'petals-container';
    document.querySelector('.bodyDiv').prepend(petalsContainer);

    if (!document.createElement('div').animate) {
      petalsContainer.innerHTML = 
        "Seu navegador não suporta animações web. Tente no Chrome ou Firefox.";
      return;
    }

    const petalCount = 40;
    for (let i = 0; i < petalCount; i++) {
      const petal = document.createElement('div');
      petal.className = 'petal';
      
      const scale = Math.random() * 0.8 + 0.2;
      petal.innerHTML = `
        <div class="rotate">
          <img src="https://qqz.works/wp-content/uploads/2021/08/petal.png" 
               class="askew" alt="petal"/>
        </div>
      `;

      const animation = petal.animate([
        { 
          transform: `translate3d(${(i/petalCount)*100}vw, 0, 0) scale(${scale})`, 
          opacity: scale 
        },
        { 
          transform: `translate3d(${(i/petalCount)*100 + 10}vw, 150vh, 0) scale(${scale})`, 
          opacity: 1 
        }
      ], {
        duration: Math.random() * 90000 + 3000,
        iterations: Infinity,
        delay: -(Math.random() * 5000)
      });

      petalsContainer.appendChild(petal);
    }
  };

  animatePetals();
  return () => {
    const container = document.getElementById('petals-container');
    if (container) container.remove();
  };
}, []);


const handleSubmit = async (e) => {
    e.preventDefault();
    if (!palavraChave.trim()) return;
  
    const now = Date.now();
    if (now - lastRequestTime < 10000) {
      setError("Por favor, aguarde 10 segundos entre cada requisição.");
      setShowPopup(true);
      return;
    }
  
    setIsLoading(true);
    setError(null);
    setReflexao("");
  
    try {
      const response = await fetch("https://api.together.xyz/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer b75883e3adf4c3dbb0fac1afaf2576d7c389d389761bd7eb9322387c1e99b01d`
        },
        body: JSON.stringify({
          model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
          messages: [{ role: "user", content: `Crie uma frase/reflexão bem curta, inspiradora e de explodir a mente sobre ${palavraChave} deixe as frases com teor bíblico.` }],
          max_tokens: 150,
          temperature: 0.7,
          stream: false,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Erro HTTP! Código: ${response.status}`);
      }
  
      const data = await response.json();
      setReflexao(data.choices[0].message.content);
      setLastRequestTime(Date.now());
    } catch (error) {
      console.error("Erro ao buscar reflexão:", error);
      setError("Erro ao gerar reflexão. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
      setShowPopup(true);
    }
  };

  return (
    <div className="bodyDiv">
      <div className="wrapper">
        <h2>Pensamentos da Alma</h2>
        <h3>Empodere sua mente através de magníficas reflexões</h3>
        
        <form onSubmit={handleSubmit} className="reflexao-form">
          <input 
            type="text" 
            placeholder="Digite uma palavra-chave" 
            value={palavraChave}
            onChange={(e) => setPalavraChave(e.target.value)}
            required
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Gerando...' : 'Gerar Reflexão'}
          </button>
        </form>

        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              {error ? (
                <p className="error-message">{error}</p>
              ) : (
                <p>{reflexao}</p>
              )}
              <button onClick={() => setShowPopup(false)}>Fechar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CriarPage;
