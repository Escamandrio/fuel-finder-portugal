
import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FUEL_STATIONS } from '../constants';
import { MapPinIcon, CarIcon, BootIcon } from '../components/Icons';

const StationDetailPage: React.FC = () => {
  const { stationId } = useParams<{ stationId: string }>();
  const navigate = useNavigate();
  const station = useMemo(() => FUEL_STATIONS.find(s => s.id === Number(stationId)), [stationId]);

  if (!station) {
    return (
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <p className="text-white text-2xl text-center">Posto de gasolina não encontrado.</p>
        </div>
      </div>
    );
  }
  
  const nearbyStations = useMemo(() =>
    FUEL_STATIONS.filter(s => s.municipality === station.municipality && s.id !== station.id).slice(0, 3), 
  [station]);
  
  const services = [
      { name: 'Lavagem de Carros', icon: <CarIcon /> },
      { name: 'Calibragem de Pneus', icon: <BootIcon /> },
  ];

  return (
    <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap gap-2 p-4 text-base font-medium leading-normal">
                <Link to="/prices" className="text-[#8daece] hover:text-white">Postos de Gasolina</Link>
                <span className="text-[#8daece]">/</span>
                <span className="text-white">{station.name}</span>
            </div>
            <div className="flex flex-wrap justify-between gap-3 p-4">
                <div className="flex min-w-72 flex-col gap-3">
                    <p className="text-white tracking-light text-[32px] font-bold leading-tight">{station.name}</p>
                    <p className="text-[#8daece] text-sm font-normal leading-normal">Atualizado em {new Date(station.lastUpdated).toLocaleString('pt-PT')}</p>
                </div>
            </div>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                    <div className="flex w-full flex-1 items-stretch rounded-lg">
                        <input
                            readOnly
                            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#2e4e6b] bg-[#172736] focus:border-[#2e4e6b] h-14 placeholder:text-[#8daece] p-[15px] rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal"
                            value={station.address + ", " + station.locality}
                        />
                        <div
                            className="text-[#8daece] flex border border-[#2e4e6b] bg-[#172736] items-center justify-center pr-[15px] rounded-r-lg border-l-0"
                        >
                            <MapPinIcon size="24px"/>
                        </div>
                    </div>
                </label>
            </div>
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Preços do Combustível</h2>
            <div className="px-4 py-3 @container">
                <div className="flex overflow-hidden rounded-lg border border-[#2e4e6b] bg-[#0f1a24]">
                    <table className="flex-1">
                        <thead>
                            <tr className="bg-[#172736]">
                                <th className="px-4 py-3 text-left text-white w-[40%] text-sm font-medium leading-normal">Tipo de Combustível</th>
                                <th className="px-4 py-3 text-left text-white w-[30%] text-sm font-medium leading-normal">Preço</th>
                                <th className="px-4 py-3 text-left text-white w-[30%] text-sm font-medium leading-normal">Atualizado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t border-t-[#2e4e6b]">
                                <td className="h-[72px] px-4 py-2 text-white text-sm font-normal leading-normal">{station.fuelType}</td>
                                <td className="h-[72px] px-4 py-2 text-[#8daece] text-sm font-normal leading-normal">{station.price.toFixed(3)} €/L</td>
                                <td className="h-[72px] px-4 py-2 text-[#8daece] text-sm font-normal leading-normal">{new Date(station.lastUpdated).toLocaleDateString('pt-PT')}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Serviços</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3 p-4">
               {services.map(service => (
                <div key={service.name} className="flex flex-1 gap-3 rounded-lg border border-[#2e4e6b] bg-[#172736] p-4 items-center">
                    <div className="text-white">{service.icon}</div>
                    <h3 className="text-white text-base font-bold leading-tight">{service.name}</h3>
                </div>
               ))}
            </div>

            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Evolução do Preço ({station.fuelType})</h2>
             <div className="flex flex-wrap gap-4 px-4 py-6">
              <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-lg border border-[#2e4e6b] p-6">
                <p className="text-white text-base font-medium leading-normal">{station.fuelType}</p>
                <p className="text-white tracking-light text-[32px] font-bold leading-tight truncate">{station.price.toFixed(3)} €/L</p>
                <div className="flex gap-1">
                  <p className="text-[#8daece] text-base font-normal leading-normal">Últimos 30 dias</p>
                  <p className="text-[#0bda5b] text-base font-medium leading-normal">+0.01%</p>
                </div>
                <div className="flex min-h-[180px] flex-1 flex-col gap-8 py-4">
                  <svg width="100%" height="148" viewBox="-3 0 478 150" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="paint0_linear_chart" x1="236" y1="1" x2="236" y2="149" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#20364b"></stop>
                        <stop offset="1" stopColor="#20364b" stopOpacity="0"></stop>
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H326.769H0V109Z"
                      fill="url(#paint0_linear_chart)"
                    ></path>
                    <path
                      d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
                      stroke="#8daece"
                      strokeWidth="3"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                  <div className="flex justify-around">
                    <p className="text-[#8daece] text-[13px] font-bold leading-normal tracking-[0.015em]">30/06</p>
                    <p className="text-[#8daece] text-[13px] font-bold leading-normal tracking-[0.015em]">07/07</p>
                    <p className="text-[#8daece] text-[13px] font-bold leading-normal tracking-[0.015em]">14/07</p>
                    <p className="text-[#8daece] text-[13px] font-bold leading-normal tracking-[0.015em]">21/07</p>
                    <p className="text-[#8daece] text-[13px] font-bold leading-normal tracking-[0.015em]">Hoje</p>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Postos Próximos</h2>
            <div className="px-4 py-3 @container">
              <div className="flex overflow-hidden rounded-lg border border-[#2e4e6b] bg-[#0f1a24]">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-[#172736]">
                      <th className="px-4 py-3 text-left text-white w-[50%] text-sm font-medium leading-normal">Posto de Gasolina</th>
                      <th className="px-4 py-3 text-left text-white w-[50%] text-sm font-medium leading-normal">Última Atualização</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nearbyStations.length > 0 ? nearbyStations.map(nearby => (
                         <tr key={nearby.id} className="border-t border-t-[#2e4e6b] hover:bg-[#172736] cursor-pointer" onClick={() => navigate(`/station/${nearby.id}`)}>
                            <td className="h-[72px] px-4 py-2 text-white text-sm font-normal leading-normal">{nearby.name}</td>
                            <td className="h-[72px] px-4 py-2 text-[#8daece] text-sm font-normal leading-normal">{new Date(nearby.lastUpdated).toLocaleString('pt-PT')}</td>
                        </tr>
                    )) : (
                        <tr className="border-t border-t-[#2e4e6b]">
                            <td colSpan={2} className="h-[72px] px-4 py-2 text-center text-white">Nenhum posto próximo encontrado.</td>
                        </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

        </div>
    </div>
  );
};

export default StationDetailPage;
