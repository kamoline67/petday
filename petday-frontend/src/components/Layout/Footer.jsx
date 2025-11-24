import React from "react";
import Logo from "../UI/Logo";

const Footer = () => {
  return (
    <footer className="relative bg-black text-white pt-32 pb-16 overflow-hidden">

      <div className="container-custom section-padding relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-32">

          <div className="col-span-1 md:col-span-1">
            <Logo variant='white' size="3xl" className="mb-10" />

            <p className="text-dark-300 text-lg max-w-md leading-relaxed font-sans">
              Conectamos você aos melhores serviços para seu pet. Agendamento rápido, 
              seguro e com profissionais qualificados.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 text-white font-display">
              Navegação
            </h3>
            <div className="space-y-3">
              {["Sobre", "Serviços", "Blog", "Contato", "FAQ"].map((item) => (
                <a
                  key={item}
                  href="#Sobre"
                  className="block text-dark-300 hover:text-primary-400 transition-colors duration-300 text-lg font-sans"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>


          <div>
            <h3 className="text-xl font-bold mb-6 text-white font-display">
              Contato
            </h3>
            <div className="space-y-3 text-dark-300 text-lg font-sans">
              <p> petdaytec@gmail.com</p>
              <p> (44) 99105-0016</p>
              <p> Maringá, PR</p>
            </div>
          </div>
        </div>

        <div className="border-t border-dark-700 mt-12 pt-8 text-center">
          <p className="text-dark-400 font-sans">
            &copy; 2025 PetDay. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
