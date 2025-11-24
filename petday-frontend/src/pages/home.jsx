import React from 'react';
import { estaLogado, getUsuarioAtual } from '../utils/auth';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Logo from '../components/UI/Logo';

const Home = ({ onNavigateToLogin, onNavigateToFeed, onLogout, onNavigateTo }) => {
  const usuario = getUsuarioAtual();

  return (
    <div className="min-h-screen bg-dark-800">
      <section className=" text-white relative overflow-hidden">
        <div className="absolute"></div>
        <div className="container-custom section-padding relative">
          <div className="text-center max-w-5xl mx-auto">
            <p className="text-2xl md:text-3xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
              Agendamento online para banho, tosa, vacina e muito mais.
              <span className="block font"><br></br>Rápido, prático e seguro.</span>
            </p>
            {!estaLogado() ? (
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button 
                  size="xl"
                  onClick={onNavigateToLogin}
                  className="bg-white text-primary-500 hover:bg-neutral-100"
                >
                  Começar Agora
                </Button>
                <Button 
                  variant="outline" 
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-primary-500"
                >
                  Conhecer Mais
                </Button>
              </div>
            ) : (
              <Button 
                size="xl"
                onClick={onNavigateToFeed}
                className="bg-white text-primary-500 hover:bg-neutral-100"
              >
                Acessar Meu App <Logo variant='icon'/>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-20">
            <h2 id='Sobre' className="text-display display-md text-secondary-500 mb-6">
              Por que o <span className="text-primary-500">PetDay</span>?
            </h2>
            <p className="text-2xl text-neutral-700 max-w-3xl mx-auto">
              O que o seu pet precisa, com a praticidade que você merece
            </p>
            <p><br></br> A equipe PetDay busca trazer praticidade e agilidade para o cuidado com seu pet<br></br>através de um site intuitivo que, além de exibir os preços dos serviços dos petshops de sua região, você pode agendar diretamente, sem precisar ficar ligando.</p>
            <p class="text-xl text-neutral-700"><br></br>Prático e rápido.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-10 drop-shadow-[0px_8px_1px_rgba(0,0,0,0.60)]">
            {[
              {
                icon: '🚿',
                title: 'Praticidade',
                description: 'As opções de cuidado pro seu pet em um só lugar, sem precisar ficar ligando',
              },
              {
                icon: '⏰',
                title: 'Agendamento Inteligente',
                description: 'Agende em poucos cliques, escolha o melhor horário e receba lembretes automáticos',
              },
              {
                icon: '📍',
                title: 'Petshops Verificados',
                description: 'Estabelecimentos avaliados e certificados, garantindo a melhor experiência para seu pet',
              },
            ].map((feature, index) => (
              <Card key={index} hover padding="xl" className="text-center">
                <div className="w-20 h-20 bg-primary-500 rounded-3xl flex items-center justify-center text-3xl text-white mb-6 mx-auto shadow-2xl">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-secondary-500 mb-4">
                  {feature.title}
                </h3>
                <p className="text-neutral-700 text-lg leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>


      <section className="section-padding bg-dark-800">
            <div className="container-custom">
              <div className="text-center mb-20">
                <p className="text-3xl text-white max-w-3xl mx-auto">
                  Equipe PetDay
                </p><br></br>
                <Logo variant='icon-white' size='xl' />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-12 drop-shadow-[10px_10px_0px_rgba(0,0,0,0.60)]">
                {[
                  {
                    nome: "Kamoline Redivo",
                    cargo: "Desenvolvedora",
                    foto: "/kamoline.png", 
                    descricao: "Responsável pela desenvolvimento geral do PetDay.",
                  },
                  {
                    nome: "Marco Antônio",
                    cargo: "Gestor de equipe/Desenvolvedor",
                    foto: "/marco.png",
                    descricao: "Gestão da equipe de desenvolvimento PetDay.",
                  },
                  {
                    nome: "João Paulo Oto",
                    cargo: "Desenvolvedor",
                    foto: "/joao.png",
                    descricao: "Faz parte da equipe de desenvolvimento PetDay",
                  },
                  {
                    nome: "Nathan Vitor",
                    cargo: "Líder",
                    foto: "/nathan.png",
                    descricao: "Lider de todo o projeto PetDay.",
                  },
                  {
                    nome: "João Vitor Mariano",
                    cargo: "Desenvolvedor",
                    foto: "/mariano.png",
                    descricao: "Faz parte da equipe de desenvolvimento PetDay",
                  },
                  {
                    nome: "Leonardo Paz Gaieski",
                    cargo: "Desenvolvedor",
                    foto: "/leonardo.png",
                    descricao: "Faz parte da equipe de desenvolvimento PetDay",
                  },

                ].map((membro, index) => (
                  <Card 
                    key={index} 
                    padding="sm" 
                    hover 
                    className="text-center flex flex-col items-center"
                  >
                    
                    <div className="w-36 h-36 rounded-full overflow-hidden shadow-2xl mb-6 border-4 border-primary-500">
                      <img 
                        src={membro.foto} 
                        alt={membro.nome}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <h3 className="text-2xl font-bold text-secondary-500">
                      {membro.nome}
                    </h3>

                    <p className="text-primary-500 font-normal text-lg mt-1 mb-4">
                      {membro.cargo}
                    </p>

                    <p className="text-neutral-700 text-lg leading-relaxed max-w-xs">
                      {membro.descricao}
                    </p>

                  </Card>
                ))}
              </div>
            </div>
          </section>


      {/* CTA Section */}
      {!estaLogado() && (
        <section className="section-padding bg-white">
          <div className="container-custom text-center">
            <Card padding="xl" className="max-w-4xl mx-auto gradient-bg text-white">
              <h2 className="text-display display-sm mb-6">
                Pronto para transformar 
                <span className="block">o day do seu pet?</span>
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Se cadastre e em poucos passos, seu agendamento está concluído. 
              </p>
              <Button 
                size="xl"
                onClick={onNavigateToLogin}
                className="bg-white text-primary-500 hover:bg-neutral-100"
              >
                Criar Conta
              </Button>
            </Card>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Home;