
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FuelStation } from '../types';
import { FUEL_STATIONS } from '../constants';

const CheapestFuelTable: React.FC<{ stations: FuelStation[], title: string }> = ({ stations, title }) => {
    const navigate = useNavigate();

    return (
        <div className="px-4 py-3 @container w-full">
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">{title}</h2>
            <div className="flex overflow-hidden rounded-lg border border-[#2e4e6b] bg-[#0f1a24]">
                <table className="flex-1 w-full">
                    <thead>
                        <tr className="bg-[#172736]">
                            <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal hidden @[360px]:table-cell">Posto</th>
                            <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal">Município</th>
                            <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal">Preço</th>
                            <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal hidden @[480px]:table-cell">Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stations.map((station) => (
                            <tr key={station.id} className="border-t border-t-[#2e4e6b] hover:bg-[#172736] cursor-pointer" onClick={() => navigate(`/station/${station.id}`)}>
                                <td className="h-[72px] px-4 py-2 text-white text-sm font-normal leading-normal hidden @[360px]:table-cell">{station.name}<br/><span className="text-[#8daece] text-xs">{station.brand}</span></td>
                                <td className="h-[72px] px-4 py-2 text-[#8daece] text-sm font-normal leading-normal">{station.municipality}</td>
                                <td className="h-[72px] px-4 py-2 text-[#359dff] text-base font-bold leading-normal">{station.price.toFixed(3)}€/L</td>
                                <td className="h-[72px] px-4 py-2 text-[#8daece] text-sm font-normal leading-normal hidden @[480px]:table-cell">{new Date(station.lastUpdated).toLocaleDateString('pt-PT')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};


const CheapestPage: React.FC = () => {
    const top10Gasoline = useMemo(() =>
        FUEL_STATIONS.filter(s => s.fuelType.toLowerCase().includes('gasolina')).sort((a, b) => a.price - b.price).slice(0, 10),
    []);
    
    const top10Diesel = useMemo(() =>
        FUEL_STATIONS.filter(s => s.fuelType.toLowerCase().includes('gasóleo')).sort((a, b) => a.price - b.price).slice(0, 10),
    []);

    const top10LPG = useMemo(() =>
        FUEL_STATIONS.filter(s => s.fuelType.toLowerCase().includes('gpl')).sort((a, b) => a.price - b.price).slice(0, 10),
    []);

    return (
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1 items-center">
             <div className="flex w-full flex-wrap justify-between gap-3 p-4">
                <h1 className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">Postos Mais Baratos</h1>
            </div>
            
            <CheapestFuelTable stations={top10Gasoline} title="Top 10 Gasolina Mais Barata" />
            <CheapestFuelTable stations={top10Diesel} title="Top 10 Gasóleo Mais Barato" />
            <CheapestFuelTable stations={top10LPG} title="Top 10 GPL Mais Barato" />

        </div>
    );
};

export default CheapestPage;
