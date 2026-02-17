
import React, { useState, useRef, useMemo } from 'react';
import { Trophy, MapPin, Clock, ExternalLink, RotateCcw, BarChart2, MessageCircle, Timer } from 'lucide-react';
import QRCode from 'qrcode';
import { Tournament } from './constants.tsx';
import { getBadgeStyles } from './utils.tsx';

export const TournamentCard = ({ tournament }: { tournament: Tournament }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Estados para o efeito Tilt 3D
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const hasContact = !!tournament.contact;

  // Cálculo de dias restantes
  const daysRemaining = useMemo(() => {
    const eventDate = new Date(tournament.year, tournament.monthIndex, tournament.day);
    eventDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  }, [tournament]);

  const generateQRCode = async () => {
    if (!tournament.chessResultsLink || qrCodeDataUrl || isGenerating) return;
    
    setIsGenerating(true);
    try {
      const url = await QRCode.toDataURL(tournament.chessResultsLink, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });
      setQrCodeDataUrl(url);
    } catch (err) {
      console.error("Erro ao gerar QR Code:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFlip = () => {
    const nextState = !isFlipped;
    setIsFlipped(nextState);
    if (nextState && !qrCodeDataUrl) {
      generateQRCode();
    }
    setRotateX(0);
    setRotateY(0);
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isFlipped || !cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -20;
    const rotateYValue = ((x - centerX) / centerX) * 20;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
    
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.4
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasContact) return;
    
    const message = `Olá! Gostaria de tirar uma dúvida sobre o torneio "${tournament.name}" que vi no portal Xadrez Brasília.`;
    const url = `https://wa.me/${tournament.contact}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const renderDaysBadge = () => {
    if (daysRemaining < 0) return null;

    let text = "";
    let bgColor = "bg-blue-900";

    if (daysRemaining === 0) {
      text = "É HOJE!";
      bgColor = "bg-red-600";
    } else if (daysRemaining === 1) {
      text = "AMANHÃ";
      bgColor = "bg-orange-500";
    } else {
      text = `FALTAM ${daysRemaining} DIAS`;
      bgColor = "bg-green-600";
    }

    return (
      <div 
        className={`absolute top-4 right-4 ${bgColor} text-white px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-xl border border-white/20 transform-gpu`}
        style={{ transform: `translateZ(55px)` }}
      >
        <Timer size={12} className="animate-pulse" />
        {text}
      </div>
    );
  };

  return (
    <div 
      ref={cardRef}
      className="w-full max-w-[320px] h-[410px] perspective-2000 cursor-pointer group"
      onClick={handleFlip}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className={`relative w-full h-full transition-all duration-700 preserve-3d shadow-2xl rounded-[32px] ${isFlipped ? 'rotate-y-180' : ''}`}
        style={{
          transform: isFlipped 
            ? 'rotateY(180deg)' 
            : `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: isFlipped ? 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)' : 'transform 0.1s ease-out',
          boxShadow: isFlipped 
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' 
            : `${-rotateY}px ${rotateX}px 30px rgba(0,0,0,0.3)`
        }}
      >
        
        {/* Lado da Frente */}
        <div className="absolute inset-0 backface-hidden flex flex-col rounded-[32px] overflow-hidden bg-white border-4 border-yellow-400 isolate transform-gpu force-gpu-clip">
          <img 
            src={tournament.image} 
            alt={tournament.name} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 scale-110"
            style={{
                transform: `translateX(${rotateY * -0.5}px) translateY(${rotateX * 0.5}px) scale(1.1)`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/95 via-blue-900/30 to-transparent" />
          
          {/* Badge de Dias Restantes (Novo) */}
          {renderDaysBadge()}

          {/* Badge de Data (Nível Z: 60px) */}
          <div 
            className="absolute top-4 left-4 flex flex-col items-center transform-gpu"
            style={{ transform: `translateZ(60px)` }}
          >
            <div className="bg-yellow-400 text-blue-900 px-4 py-2.5 rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.3)] border border-white/20 flex flex-col items-center justify-center min-w-[70px]">
              <span className="text-4xl font-black font-brand block leading-none">{tournament.day}</span>
              <span className="text-[11px] font-bold uppercase tracking-widest mt-1">{tournament.month}</span>
            </div>
          </div>

          {/* Conteúdo Inferior (Nível Z: 40px) */}
          <div 
            className="absolute bottom-0 left-0 right-0 p-5 transform-gpu"
            style={{ transform: `translateZ(40px)` }}
          >
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {tournament.type.map((t) => (
                <span key={t} className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider shadow-sm ${getBadgeStyles(t)}`}>
                  {t}
                </span>
              ))}
              <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-2 py-0.5 rounded-full text-[9px] font-bold flex items-center gap-1">
                <Trophy size={10} className="text-yellow-400" /> {tournament.prize}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-yellow-400 transition-colors line-clamp-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              {tournament.name}
            </h3>
            
            <div className="flex flex-col gap-1 text-gray-200 text-[10px] font-medium mb-4">
              <div className="flex items-center gap-2">
                <MapPin size={11} className="text-yellow-400" /> {tournament.location}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={11} className="text-yellow-400" /> {tournament.time}
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              {tournament.link ? (
                <a 
                  href={tournament.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleButtonClick}
                  className="w-full py-2.5 bg-yellow-400 text-blue-900 font-black rounded-xl text-[10px] uppercase tracking-[0.1em] hover:bg-white transition-all transform hover:translate-y-[-2px] flex items-center justify-center cursor-pointer shadow-lg active:scale-95"
                >
                  Ver Detalhes
                </a>
              ) : (
                <div className="w-full py-2.5 bg-gray-300 text-gray-500 font-black rounded-xl text-[10px] uppercase tracking-[0.1em] flex items-center justify-center cursor-not-allowed opacity-80" onClick={handleButtonClick}>
                  Detalhes em Breve
                </div>
              )}

              <div className="flex gap-2">
                {tournament.registrationLink ? (
                  <a 
                    href={tournament.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleButtonClick}
                    className="flex-1 py-2.5 bg-green-600 text-white font-black rounded-xl text-[10px] uppercase tracking-[0.1em] hover:bg-green-500 transition-all transform hover:translate-y-[-2px] flex items-center justify-center gap-2 cursor-pointer shadow-xl active:scale-95"
                  >
                    <ExternalLink size={12} /> Inscrição
                  </a>
                ) : (
                  <div className="flex-1 py-2.5 bg-gray-300 text-gray-500 font-black rounded-xl text-[10px] uppercase tracking-[0.1em] flex items-center justify-center gap-2 cursor-not-allowed opacity-80" onClick={handleButtonClick}>
                    <ExternalLink size={12} className="opacity-40" /> Breve
                  </div>
                )}
                
                <button 
                  onClick={hasContact ? handleWhatsAppClick : handleButtonClick}
                  className={`flex-1 py-2.5 ${hasContact ? 'bg-[#25D366] hover:bg-[#20ba59] shadow-xl' : 'bg-gray-300 cursor-not-allowed opacity-80 shadow-none'} text-white font-black rounded-xl text-[10px] uppercase tracking-[0.1em] flex items-center justify-center gap-2 transition-all transform ${hasContact ? 'hover:translate-y-[-2px] active:scale-95' : ''}`}
                  title={hasContact ? "Dúvidas no WhatsApp" : "Contato indisponível"}
                >
                  <MessageCircle size={15} className={hasContact ? "" : "opacity-40"} /> WhatsApp
                </button>
              </div>
            </div>
          </div>

          {!isFlipped && (
            <div 
              className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-50"
              style={{
                opacity: glare.opacity,
                background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.6) 0%, transparent 60%)`
              }}
            />
          )}
        </div>

        {/* Lado de Trás */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col rounded-[32px] overflow-hidden shadow-2xl bg-blue-900 border-4 border-green-600 p-8 text-center justify-center items-center">
          
          <div className="mb-6 relative transform-gpu" style={{ transform: 'translateZ(50px)' }}>
            {qrCodeDataUrl ? (
              <div className="p-3 bg-white rounded-3xl shadow-2xl border-2 border-green-600/30">
                <img 
                  src={qrCodeDataUrl} 
                  alt={`QR Code para ${tournament.name}`} 
                  className="w-24 h-24 object-contain"
                />
                <div className="absolute -bottom-2 -right-2 bg-green-600 text-white p-1.5 rounded-full shadow-lg border-2 border-white">
                  <ExternalLink size={12} />
                </div>
              </div>
            ) : (
              <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 transition-colors">
                {isGenerating ? (
                   <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <BarChart2 size={40} className="text-white/20" />
                )}
              </div>
            )}
          </div>
          
          <h3 className="text-xl font-brand text-white mb-2 uppercase tracking-tight transform-gpu" style={{ transform: 'translateZ(40px)' }}>{tournament.name}</h3>
          <p className="text-blue-200 text-[10px] font-bold uppercase tracking-widest mb-8 transform-gpu" style={{ transform: 'translateZ(30px)' }}>
            {qrCodeDataUrl ? 'Aponte a câmera para os resultados' : 'Informações Técnicas & Resultados'}
          </p>

          <div className="w-full space-y-3 transform-gpu" style={{ transform: 'translateZ(60px)' }}>
            {tournament.chessResultsLink ? (
              <a 
                href={tournament.chessResultsLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleButtonClick}
                className="w-full py-4 bg-green-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] hover:bg-green-500 transition-all flex items-center justify-center gap-3 shadow-xl hover:translate-y-[-2px] active:scale-95"
              >
                <BarChart2 size={16} /> Abrir Chess-Results
              </a>
            ) : (
              <div className="w-full py-4 bg-white/5 border border-white/10 text-white/40 font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3">
                Link Chess-Results Indisponível
              </div>
            )}
            
            <button 
              className="w-full py-3 text-yellow-400 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/5 rounded-2xl transition-all mt-4"
              onClick={(e) => { e.stopPropagation(); handleFlip(); }}
            >
              <RotateCcw size={14} /> Voltar ao Card
            </button>
          </div>

          <div className="absolute bottom-6 opacity-20 transform-gpu" style={{ transform: 'translateZ(20px)' }}>
            <img src="https://imagens.xadrezbrasilia.com/imagens/logo_xb.png" alt="XB" className="h-8 grayscale brightness-0 invert" />
          </div>
        </div>
      </div>

      <style>{`
        .perspective-2000 {
          perspective: 2000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};
