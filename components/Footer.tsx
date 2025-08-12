
import React from 'react';
import { TwitterLogoIcon, FacebookLogoIcon, InstagramLogoIcon } from './Icons';

const Footer: React.FC = () => {
  return (
    <footer className="flex justify-center border-t border-solid border-t-[#20364b]">
      <div className="flex max-w-[960px] flex-1 flex-col">
        <div className="flex flex-col gap-6 px-5 py-10 text-center @container">
          <div className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
            <a className="text-[#8daece] text-base font-normal leading-normal min-w-40" href="#">Sobre Nós</a>
            <a className="text-[#8daece] text-base font-normal leading-normal min-w-40" href="#">Contacto</a>
            <a className="text-[#8daece] text-base font-normal leading-normal min-w-40" href="#">Política de Privacidade</a>
            <a className="text-[#8daece] text-base font-normal leading-normal min-w-40" href="#">Termos de Serviço</a>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" aria-label="Twitter">
              <div className="text-[#8daece] hover:text-white transition-colors">
                <TwitterLogoIcon />
              </div>
            </a>
            <a href="#" aria-label="Facebook">
              <div className="text-[#8daece] hover:text-white transition-colors">
                <FacebookLogoIcon />
              </div>
            </a>
            <a href="#" aria-label="Instagram">
              <div className="text-[#8daece] hover:text-white transition-colors">
                <InstagramLogoIcon />
              </div>
            </a>
          </div>
          <p className="text-[#8daece] text-base font-normal leading-normal">@2024 Fuel Finder. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
