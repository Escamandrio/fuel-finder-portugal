
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LogoIcon, MagnifyingGlassIcon, MapPinIcon, UserIcon } from './Icons';

const Header: React.FC = () => {
  const navLinkClass = "text-white text-sm font-medium leading-normal";
  const activeNavLinkClass = "text-[#359dff] text-sm font-medium leading-normal";

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#20364b] px-10 py-3">
      <div className="flex items-center gap-8">
        <NavLink to="/" className="flex items-center gap-4 text-white">
          <div className="size-4">
            <LogoIcon />
          </div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Fuel Finder</h2>
        </NavLink>
        <nav className="flex items-center gap-9">
          <NavLink to="/" className={({ isActive }) => (isActive ? activeNavLinkClass : navLinkClass)} end>Início</NavLink>
          <NavLink to="/prices" className={({ isActive }) => (isActive ? activeNavLinkClass : navLinkClass)}>Preços</NavLink>
          <NavLink to="/cheapest" className={({ isActive }) => (isActive ? activeNavLinkClass : navLinkClass)}>Mais Baratas</NavLink>
        </nav>
      </div>
      <div className="flex flex-1 justify-end gap-8 items-center">
        <label className="flex flex-col min-w-40 !h-10 max-w-64">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
            <div className="text-[#8daece] flex border-none bg-[#20364b] items-center justify-center pl-4 rounded-l-lg border-r-0">
              <MagnifyingGlassIcon />
            </div>
            <input
              placeholder="Pesquisar"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-[#20364b] focus:border-none h-full placeholder:text-[#8daece] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
            />
          </div>
        </label>
        <div className="flex gap-2">
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#20364b] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
            <div className="text-white">
              <MapPinIcon />
            </div>
          </button>
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#20364b] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
            <div className="text-white">
              <UserIcon />
            </div>
          </button>
        </div>
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
          style={{ backgroundImage: `url("https://i.pravatar.cc/40")` }}
        ></div>
      </div>
    </header>
  );
};

export default Header;
