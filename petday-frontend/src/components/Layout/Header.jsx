import React from 'react';
import { estaLogado, getUsuarioAtual } from '../../utils/auth';
import { useState } from "react";
import Button from '../UI/Button';


const Header = ({ onLogout, onNavigateTo}) => {
  const usuario = getUsuarioAtual();

  const handleNavigation = (page) => {
    onNavigateTo(page);
  };


  return (
    <header className="relative top-0 left-0 w-full z-[50] overflow-visible bg-transparent">

      <div className="absolute top-0 left-0 h-full w-full">
        <svg 
          viewBox="0 0 1920 430" 
          className="w-full h-48 md:h-72 object-cover"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="waveShadow" x="-20%" y="-20%" width="140%" height="200%">
              <feDropShadow 
                dx="0"      
                dy="8"     
                stdDeviation="1"  
                floodColor="rgba(0,0,0,0.60)" 
              />
            </filter>
          </defs>

          <path
            filter='url(#waveShadow)' 
            fill="#ff7c1f" 
            d="M0 0h1920v215c-82-6-142 21-276 4-160-20-209-68-355-63-184 7-326 99-565 129C360 332 179 250 0 215V0z"
          />
        </svg>
      </div>

      
      <div className="grid grid-cols-3 items-center w-full px-6 py-2">

        <div></div>

          <div 
            className="flex justify-center cursor-pointer transform transition-all duration-500 hover:scale-105"
            onClick={() => onNavigateTo('home')}
          >
            <img 
              src="/logo.png" 
              alt="PetDay Logo"
              className="w-36 md:w-72 drop-shadow-2xl"
            />
          </div>

          <div className="flex justify-end pr-8 items-center space-x-3">

            {estaLogado() ? (
              <div className="flex items-center space-x-3">
                <span className="text-white font-semibold hidden md:block">
                  Olá, {usuario.nome}
                </span>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={onLogout}
                  className="border-white text-white hover:bg-white hover:text-orange-600 backdrop-blur-sm"
                >
                  Sair
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => handleNavigation('login')} 
                  className="border-white text-white hover:bg-white hover:text-orange-600 backdrop-blur-sm" 
                >
                  Entrar 
                </Button> 
                <Button 
                  size="sm" 
                  onClick={() => handleNavigation('cadastro')} 
                  className="bg-white text-orange-600 hover:bg-orange-50 backdrop-blur-sm"
                >
                  Cadastrar
                </Button>
              </>
            )}
          </div>
        </div>
    </header>
  );
};

export default Header;