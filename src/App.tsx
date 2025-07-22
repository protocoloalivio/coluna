import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  Shield, 
  Truck, 
  CreditCard, 
  Clock,
  AlertTriangle,
  Star,
  Lock,
  Users,
  TrendingUp,
  Play,
  Award,
  ChevronUp,
  ChevronDown,
  X,
  ArrowDown
} from 'lucide-react';

// Dados para as notificações
const notifications = [
  { name: "Carlos Silva", city: "São Paulo", product: "Kit de 5 potes" },
  { name: "Maria Santos", city: "Rio de Janeiro", product: "Kit de 3 potes" },
  { name: "João Oliveira", city: "Belo Horizonte", product: "Kit de 5 potes" },
  { name: "Ana Costa", city: "Salvador", product: "Kit de 3 potes" },
  { name: "Pedro Lima", city: "Fortaleza", product: "Kit de 5 potes" },
  { name: "Lucia Ferreira", city: "Brasília", product: "Kit de 3 potes" },
  { name: "Roberto Alves", city: "Curitiba", product: "Kit de 5 potes" },
  { name: "Carmen Rodriguez", city: "Porto Alegre", product: "Kit de 3 potes" },
  { name: "Francisco Souza", city: "Recife", product: "Kit de 5 potes" },
  { name: "Helena Martins", city: "Goiânia", product: "Kit de 3 potes" }
];

function App() {
  const [currentNotification, setCurrentNotification] = useState(0);
  const [showNotification, setShowNotification] = useState(true);
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing' ou 'offers'
  const [timeLeft, setTimeLeft] = useState({
    minutes: 8,
    seconds: 32
  });

  // Despachante de UTM v1.0 - por Lek do Black
  const handleCheckoutClick = (checkoutUrl: string) => {
    console.log('LEK DO BLACK: Despachante preparando o pacote...');
    
    let finalUrl = checkoutUrl;

    const utmKeys = [
      'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 
      'utm_content', 'click_id', 'fbclid', 'gclid', 'src', 'sck'
    ];
    
    const currentUrlParams = new URLSearchParams(window.location.search);
    const paramsParaAdicionar = new URLSearchParams();

    utmKeys.forEach(key => {
      let value = currentUrlParams.get(key); // Prioridade 1: URL atual
      if (!value) {
        value = localStorage.getItem(`utm_${key}`); // Prioridade 2: Bolso do porteiro
      }
      if (value) {
        paramsParaAdicionar.append(key, value);
      }
    });

    const utmString = paramsParaAdicionar.toString();

    if (utmString) {
      const separator = checkoutUrl.includes('?') ? '&' : '?';
      finalUrl = `${checkoutUrl}${separator}${utmString}`;
    }

    console.log('LEK DO BLACK: Pacote pronto. Redirecionando pra:', finalUrl);
    window.location.href = finalUrl;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setShowNotification(false);
      setTimeout(() => {
        setCurrentNotification((prev) => (prev + 1) % notifications.length);
        setShowNotification(true);
      }, 1200);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  // Contador regressivo
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          // Reinicia o contador quando chega a zero
          return { minutes: 8, seconds: 32 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleShowOffers = () => {
    setCurrentPage('offers');
    // Scroll para o topo da nova página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* NOTIFICAÇÃO DE COMPRA */}
      {showNotification && (
        <div className="fixed bottom-4 left-4 bg-green-600 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm animate-slide-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <div>
                <p className="text-sm font-bold">
                  {notifications[currentNotification].name} de {notifications[currentNotification].city}
                </p>
                <p className="text-xs opacity-90">
                  acabou de comprar o {notifications[currentNotification].product}
                </p>
                <p className="text-xs opacity-75">há 2 minutos</p>
              </div>
            </div>
            <button 
              onClick={() => setShowNotification(false)}
              className="text-white hover:text-gray-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* PÁGINA DE LANDING */}
      {currentPage === 'landing' && (
        <>
        {/* HEADER - HEADLINE (O SOCO NA CARA) */}
        <header className="bg-gradient-to-br from-orange-600 via-orange-500 to-orange-400 text-white py-8 md:py-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-black mb-4 md:mb-6 leading-tight">
              MÉDICOS EM CHOQUE: Fórmula Natural "SECRETA" de Raiz Dourada 
              <span className="text-white block md:inline bg-orange-700 px-2 rounded"> ATACA </span>
              a Causa Raiz da Dor Articular e Devolve a Mobilidade em 
              <span className="text-white block md:inline bg-orange-700 px-2 rounded"> 17 DIAS</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 opacity-90 max-w-4xl mx-auto">
              Junte-se aos +27.482 brasileiros que abandonaram os remédios caros e voltaram a viver sem o tormento da dor.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-base md:text-lg">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 md:w-6 md:h-6" />
                <span>27.482 pessoas aliviadas</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />
                <span>97% de aprovação</span>
              </div>
            </div>
          </div>
        </header>

        {/* VÍDEO DE VENDAS (VSL - A HIPNOSE) - FORMATO VERTICAL MOBILE */}
        <section className="py-8 md:py-16 bg-orange-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 text-orange-800 leading-tight">
              ASSISTA: Cientista Brasileiro Ignorado Pela Indústria Farmacêutica Revela Como Essa Raiz 
              <span className="text-orange-600 block md:inline"> DESLIGA A INFLAMAÇÃO </span>
              do seu Corpo
            </h2>
            <div className="relative bg-black rounded-lg overflow-hidden mx-auto" style={{ maxWidth: '360px', aspectRatio: '9/16' }}>
              <video 
                className="w-full h-full object-cover"
                autoPlay 
                muted 
                controls
                poster="/ChatGPT Image 16_07_2025, 12_23_39.png"
              >
                <source src="#" type="video/mp4" />
                Seu navegador não suporta vídeos.
              </video>
              <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 rounded text-sm font-bold flex items-center gap-1">
                <Play className="w-3 h-3" />
                ASSISTA AGORA
              </div>
            </div>
            <p className="text-sm text-orange-600 mt-4 max-w-md mx-auto">
              
            </p>
            
            {/* BOTÃO PARA MOSTRAR OFERTAS */}
            <div className="mt-8 md:mt-12">
              <button 
                onClick={handleShowOffers}
                className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-lg text-lg md:text-xl transition-all transform hover:scale-105 shadow-lg animate-pulse"
              >
                🔥 QUERO ACABAR COM A DOR AGORA!
                <ArrowDown className="w-5 h-5 ml-2 inline-block" />
              </button>
            </div>
          </div>
        </section>

        {/* PROBLEMA E AGITAÇÃO (JOGA SAL NA FERIDA) */}
        <section className="py-8 md:py-16 bg-orange-100">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12 text-orange-800">
              Se Você Sente Isso, <span className="text-orange-600">VOCÊ ESTÁ EM RISCO:</span>
            </h2>
            <div className="grid gap-6 md:gap-8 mb-8 md:mb-12">
              <div className="flex items-start gap-4 bg-white p-4 md:p-6 rounded-lg shadow-sm">
                <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-red-700 mb-2">Dor insuportável ao acordar?</h3>
                  <p className="text-gray-700 text-sm md:text-base">Aquela sensação de que seu corpo foi atropelado por um caminhão toda manhã.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white p-4 md:p-6 rounded-lg shadow-sm">
                <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-orange-700 mb-2">Juntas travando e estalando o dia todo?</h3>
                  <p className="text-gray-700 text-sm md:text-base">Cada movimento é um lembrete doloroso da sua condição.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white p-4 md:p-6 rounded-lg shadow-sm">
                <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-orange-700 mb-2">Dificuldade para fazer tarefas simples?</h3>
                  <p className="text-gray-700 text-sm md:text-base">Subir escadas ou segurar um copo virou um desafio épico.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white p-4 md:p-6 rounded-lg shadow-sm">
                <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-orange-700 mb-2">Medo de perder sua independência?</h3>
                  <p className="text-gray-700 text-sm md:text-base">O terror de virar um peso para sua família te consome.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* APRESENTAÇÃO DA SOLUÇÃO (O "MILAGRE") */}
        <section className="py-8 md:py-16 bg-gradient-to-br from-orange-500 to-orange-400 text-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-center mb-8 md:mb-12 text-white leading-tight">
              CHEGA DE SOFRER! CONHEÇA O ARTICULAZEN - 
              <span className="text-orange-100 block md:inline bg-orange-700 px-2 rounded"> A ARMA NATURAL </span>
              CONTRA A INFLAMAÇÃO CRÔNICA
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="w-full md:w-1/2">
                <img 
                    src="https://i.imgur.com/eobjHnm.png" 
                  alt="Articulazen - Pote do Produto" 
                  className="w-full max-w-sm mx-auto rounded-lg shadow-2xl"
                />
              </div>
              <div className="w-full md:w-1/2">
                <p className="text-lg md:text-xl leading-relaxed text-white mb-6 md:mb-8">
                  Esqueça os analgésicos que só mascaram a dor e destroem seu estômago. 
                  Após anos de pesquisa, a fórmula concentrada do Articulazen com 
                  <span className="font-bold text-orange-100 bg-orange-700 px-1 rounded"> Extrato de Cúrcuma Americana 20x mais potente </span>
                  foi desenvolvida para agir diretamente na fonte da inflamação, como um míssil teleguiado.
                </p>
                <p className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">
                  Ele não remedia, ele <span className="text-orange-100 bg-orange-700 px-2 rounded">RESOLVE</span>.
                </p>
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    <span className="text-base md:text-lg">Reduz inflamação em 72 horas</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    <span className="text-base md:text-lg">100% natural, sem efeitos colaterais</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    <span className="text-base md:text-lg">Aprovado pela ANVISA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROVA SOCIAL (PRA CALAR A BOCA DOS CÉTICOS) */}
        <section className="py-8 md:py-16 bg-orange-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 text-orange-800 leading-tight">
              "Eu Achei Que Ia Viver Com Dor Para Sempre, Até Encontrar Isso..."
            </h2>
            <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 bg-white rounded-lg shadow-lg p-6 md:p-8">
              <div className="w-full lg:w-1/2 flex justify-center">
                <img 
                  src="https://i.imgur.com/nCiMbnz.jpeg" 
                  alt="Marisa S. - Depoimento Articulazen" 
                  className="w-80 h-80 md:w-96 md:h-96 rounded-lg shadow-xl object-cover"
                />
              </div>
              <div className="w-full lg:w-1/2">
                <div className="mb-6">
                  <h3 className="text-xl md:text-2xl font-bold text-orange-800 mb-2">Marisa S. - 58 anos, Campinas/SP</h3>
                  <div className="flex text-orange-500 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 md:w-6 md:h-6 fill-current" />
                    ))}
                  </div>
                </div>
                <blockquote className="text-gray-700 text-base md:text-lg leading-relaxed italic">
                  "Meu nome é Marisa e por anos eu sofri com dores insuportáveis no joelho. Já não conseguia nem brincar com meus netos no parque. Gastei rios de dinheiro com remédios que só mascaravam a dor. Quando uma amiga me indicou o Articulazen, eu duvidei, mas resolvi tentar. Na terceira semana eu já era outra mulher! Hoje eu corro no parque com meus netos e sinto que ganhei minha vida de volta. Sou muito grata!"
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER INICIAL */}
        <footer className="bg-orange-600 text-white py-8 md:py-16 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6">
              NÃO DEIXE A DOR ROUBAR MAIS UM DIA DA SUA VIDA!
            </h3>
            <p className="text-base md:text-lg mb-6 md:mb-8 opacity-90">
              Milhares de pessoas já escolheram o Articulazen para recuperar sua qualidade de vida.
            </p>
          </div>
        </footer>
        </>
      )}

      {/* PÁGINA DE OFERTAS */}
      {currentPage === 'offers' && (
        <div className="animate-fade-in">
          {/* SEÇÃO DE DEPOIMENTOS WHATSAPP VIP */}
          <section className="py-8 md:py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12 text-orange-800 leading-tight">
                Veja o Que Estão Comentando em Nosso 
                <span className="text-orange-600 block md:inline bg-orange-100 px-2 rounded"> GRUPO VIP </span>
                de Clientes
              </h2>
              
              {/* Moldura do Celular */}
              <div className="max-w-sm mx-auto mb-8 md:mb-12">
                <div className="bg-black rounded-3xl p-2 shadow-2xl">
                  <div className="bg-gray-900 rounded-2xl p-1">
                    {/* Notch do iPhone */}
                    <div className="bg-black h-6 rounded-t-2xl relative">
                      <div className="absolute top-1 left-1/2 transform -translate-x-1/2 bg-gray-800 w-16 h-4 rounded-full"></div>
                    </div>
                    {/* Tela do celular */}
                    <div className="bg-white rounded-2xl overflow-hidden">
                      <img 
                        src="https://i.imgur.com/IPm7GJh.png" 
                        alt="Depoimentos WhatsApp Grupo VIP Articulazen" 
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Chamada para Ação */}
              <div className="text-center">
                <p className="text-xl md:text-2xl font-bold text-orange-800 mb-4 md:mb-6">
                  Você quer ser o próximo a mandar uma mensagem dessas?
                </p>
                <p className="text-lg md:text-xl text-orange-600 font-semibold">
                  Escolha seu kit abaixo e comece a viver sem dor!
                </p>
              </div>
            </div>
          </section>

          {/* OFERTA (A HORA DE PASSAR O CARTÃO) */}
          <section className="py-8 md:py-16 bg-gradient-to-br from-orange-600 to-orange-500 text-white">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-2 md:mb-4 text-white">
                ESCOLHA O SEU KIT DA LIBERDADE
              </h2>
              <p className="text-lg md:text-xl text-center mb-8 md:mb-12 text-orange-100 font-semibold">
                DESCONTO DE LANÇAMENTO DE ATÉ 60% HOJE!
              </p>
              <div className="grid gap-6 md:gap-8 mb-8 md:mb-12">
                {/* Kit 1 */}
                <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 border-2 border-orange-200 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl md:text-2xl font-bold text-center mb-4 text-orange-800">EXPERIMENTE</h3>
                  <div className="text-center mb-6">
                    <img 
                      src="https://i.imgur.com/eobjHnm.png" 
                      alt="1 Pote Articulazen" 
                      className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-4 rounded"
                    />
                    <p className="text-base md:text-lg text-orange-600 mb-2">1 Pote - Tratamento 1 Mês</p>
                    <p className="text-sm text-gray-500 line-through">De R$ 197</p>
                    <p className="text-2xl md:text-3xl font-bold text-orange-600 mb-2">R$ 127,00</p>
                    <p className="text-xs md:text-sm text-orange-600">ou 12x de R$ 10,58</p>
                  </div>
                  <button 
                    onClick={() => handleCheckoutClick("https://pay.kirvano.com/40d3f4fe-7396-4aae-95a7-d55fc1a43c1b")}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 md:py-4 px-4 md:px-6 rounded-lg text-base md:text-lg transition-colors"
                  >
                    COMPRAR AGORA
                  </button>
                </div>

                {/* Kit 2 - MAIS VENDIDO */}
                <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 border-4 border-orange-600 hover:shadow-xl transition-shadow relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-full font-black text-base md:text-lg shadow-lg border-2 border-white">
                    ⭐ MAIS POPULAR ⭐
                  </div>
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-orange-800 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center font-black text-xs md:text-sm shadow-lg border-2 border-white transform rotate-12">
                    <div className="text-center">
                      <div>48%</div>
                      <div>OFF</div>
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-center mb-4 text-orange-800 mt-2 md:mt-4">LEVE 3 POTES</h3>
                  <div className="text-center mb-6">
                    <img 
                      src="https://i.imgur.com/Mnogy18.png" 
                      alt="3 Potes Articulazen" 
                      className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-4 rounded"
                    />
                    <p className="text-base md:text-lg text-orange-600 mb-2">Tratamento 3 Meses</p>
                    <p className="text-sm text-gray-500 line-through">De R$ 381</p>
                    <p className="text-2xl md:text-3xl font-bold text-orange-600 mb-2">R$ 197,00</p>
                    <p className="text-xs md:text-sm text-orange-600">ou 12x de R$ 16,42</p>
                    <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs md:text-sm font-bold mt-2">
                      48% DE DESCONTO
                    </div>
                    <p className="text-orange-600 font-bold text-xs md:text-sm mt-2">+ FRETE GRÁTIS</p>
                  </div>
                  <button 
                    onClick={() => handleCheckoutClick("https://LINK_CHECKOUT_KIT_3_AQUI")}
                    className="w-full bg-orange-700 hover:bg-orange-800 text-white font-bold py-3 md:py-4 px-4 md:px-6 rounded-lg text-base md:text-lg transition-colors"
                  >
                    🚀 QUERO MINHA LIBERDADE DAS DORES!
                  </button>
                </div>

                {/* Kit 3 */}
                <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 border-2 border-orange-200 hover:shadow-xl transition-shadow">
                  {/* CONTADOR REGRESSIVO */}
                  <div className="bg-red-600 text-white text-center py-2 md:py-3 rounded-t-lg -mx-4 md:-mx-8 -mt-4 md:-mt-8 mb-4 md:mb-6">
                    <p className="text-xs md:text-sm font-bold mb-1">⚠️ OFERTA ESPECIAL ACABA EM:</p>
                    <div className="flex justify-center items-center gap-2">
                      <div className="bg-black bg-opacity-30 px-2 md:px-3 py-1 rounded">
                        <span className="text-lg md:text-2xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                      </div>
                      <span className="text-lg md:text-2xl font-bold">:</span>
                      <div className="bg-black bg-opacity-30 px-2 md:px-3 py-1 rounded">
                        <span className="text-lg md:text-2xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                      </div>
                    </div>
                    <p className="text-xs md:text-sm mt-1">MINUTOS : SEGUNDOS</p>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-center mb-4 text-orange-800">COMPLETO</h3>
                  <div className="text-center mb-6">
                    <img 
                      src="https://i.imgur.com/PQfnT3P.jpeg" 
                      alt="5 Potes Articulazen" 
                      className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-4 rounded"
                    />
                    <p className="text-base md:text-lg text-orange-600 mb-2">5 Potes - Tratamento 5 Meses</p>
                    <p className="text-sm text-gray-500 line-through">De R$ 635</p>
                    <p className="text-2xl md:text-3xl font-bold text-orange-600 mb-2">R$ 247,00</p>
                    <p className="text-xs md:text-sm text-orange-600">ou 12x de R$ 20,58</p>
                    <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs md:text-sm font-bold mt-2">
                      61% DE DESCONTO
                    </div>
                    <p className="text-orange-600 font-bold text-xs md:text-sm mt-2">+ FRETE GRÁTIS</p>
                  </div>
                  <button 
                    onClick={() => handleCheckoutClick("https://LINK_CHECKOUT_KIT_5_AQUI")}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 md:py-4 px-4 md:px-6 rounded-lg text-base md:text-lg transition-colors animate-pulse"
                  >
                    🔥 GARANTIR DESCONTO ANTES QUE ACABE
                  </button>
                </div>
              </div>

              {/* Ícones de Segurança */}
              <div className="flex justify-center items-center flex-wrap gap-4 md:gap-8 mb-6 md:mb-8 text-white">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 md:w-6 md:h-6 text-white" />
                  <span className="text-xs md:text-sm font-semibold">Compra Segura</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 md:w-6 md:h-6 text-white" />
                  <span className="text-xs md:text-sm font-semibold">Site Protegido</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 md:w-6 md:h-6 text-white" />
                  <span className="text-xs md:text-sm font-semibold">Entrega Garantida</span>
                </div>
              </div>

              {/* Bandeiras de Cartão */}
              <div className="flex justify-center items-center gap-2 md:gap-4 flex-wrap">
                <div className="bg-blue-600 text-white px-2 md:px-3 py-1 rounded text-xs md:text-sm font-bold">VISA</div>
                <div className="bg-red-600 text-white px-2 md:px-3 py-1 rounded text-xs md:text-sm font-bold">MASTER</div>
                <div className="bg-blue-800 text-white px-2 md:px-3 py-1 rounded text-xs md:text-sm font-bold">AMEX</div>
                <div className="bg-orange-600 text-white px-2 md:px-3 py-1 rounded text-xs md:text-sm font-bold">ELO</div>
                <div className="bg-yellow-600 text-white px-2 md:px-3 py-1 rounded text-xs md:text-sm font-bold">PIX</div>
              </div>
            </div>
          </section>

          {/* FOOTER FINAL */}
          <footer className="bg-orange-600 text-white py-8 md:py-16 text-center">
            <div className="max-w-4xl mx-auto px-4">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6">
                NÃO DEIXE A DOR ROUBAR MAIS UM DIA DA SUA VIDA!
              </h3>
              <p className="text-base md:text-lg mb-6 md:mb-8 opacity-90">
                Milhares de pessoas já escolheram o Articulazen para recuperar sua qualidade de vida. 
                Agora é a sua vez.
              </p>
              <div className="mt-6 md:mt-8 text-xs md:text-sm opacity-70">
                <p>© 2024 Articulazen. Todos os direitos reservados.</p>
                <p>Este produto não se destina a diagnosticar, tratar, curar ou prevenir qualquer doença.</p>
              </div>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}

export default App;
