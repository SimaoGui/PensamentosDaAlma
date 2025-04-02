import React, { useEffect, useState } from "react";
import "../styles/global.scss";
import { useNavigate } from "react-router-dom";
import ScrollReveal from "scrollreveal";

const InicioPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    ScrollReveal().reveal(".wrapper", { duration: 1000, origin: "top", distance: "30px", easing: "ease-in-out"});

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

  const handleCriar = () => {
    navigate("/criar");
  }

  return (
    <div className="bodyDiv">
      <div className="wrapper">
        <h2>Pensamentos da Alma</h2>
        <h3>Empodere sua mente através de magníficas reflexões</h3>
        <button onClick={handleCriar} id="btn">Criar Reflexões</button>
      </div>
    </div>
  );
};

export default InicioPage;