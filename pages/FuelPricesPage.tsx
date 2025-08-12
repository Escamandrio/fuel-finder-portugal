
import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FUEL_STATIONS } from '../constants';
import { MagnifyingGlassIcon } from '../components/Icons';

const FuelPricesPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    const [fuelTypeFilter, setFuelTypeFilter] = useState(searchParams.get('fuelType') || 'all');
    const [brandFilter, setBrandFilter] = useState(searchParams.get('brand') || 'all');
    const [districtFilter, setDistrictFilter] = useState(searchParams.get('district') || 'all');
    const [sortBy, setSortBy] = useState('price_asc');

    const uniqueBrands = useMemo(() => [...new Set(FUEL_STATIONS.map(s => s.brand))], []);
    const uniqueDistricts = useMemo(() => [...new Set(FUEL_STATIONS.map(s => s.district))], []);
    const uniqueFuelTypes = useMemo(() => [...new Set(FUEL_STATIONS.map(s => s.fuelType))], []);

    const filteredAndSortedStations = useMemo(() => {
        let stations = FUEL_STATIONS.filter(station => {
            const searchLower = searchTerm.toLowerCase();
            return (
                station.name.toLowerCase().includes(searchLower) ||
                station.address.toLowerCase().includes(searchLower) ||
                station.municipality.toLowerCase().includes(searchLower) ||
                station.locality.toLowerCase().includes(searchLower)
            );
        });

        if (fuelTypeFilter !== 'all') {
            stations = stations.filter(s => s.fuelType === fuelTypeFilter);
        }
        if (brandFilter !== 'all') {
            stations = stations.filter(s => s.brand === brandFilter);
        }
        if (districtFilter !== 'all') {
            stations = stations.filter(s => s.district === districtFilter);
        }

        return stations.sort((a, b) => {
            switch (sortBy) {
                case 'price_asc':
                    return a.price - b.price;
                case 'price_desc':
                    return b.price - a.price;
                case 'date_desc':
                    return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
                default:
                    return 0;
            }
        });
    }, [searchTerm, fuelTypeFilter, brandFilter, districtFilter, sortBy]);

    return (
        <div className="px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                <div className="flex flex-wrap justify-between gap-3 p-4">
                    <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">Preços dos Combustíveis em Portugal</p>
                </div>
                <div className="px-4 py-3">
                    <label className="flex flex-col min-w-40 h-12 w-full">
                        <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                            <div className="text-[#8daece] flex border-none bg-[#20364b] items-center justify-center pl-4 rounded-l-lg border-r-0">
                                <MagnifyingGlassIcon size="24px" />
                            </div>
                            <input
                                placeholder="Pesquisar por localização, marca ou nome do posto"
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-[#20364b] focus:border-none h-full placeholder:text-[#8daece] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </label>
                </div>

                <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Opções de Filtro</h3>
                <div className="grid grid-cols-1 @[480px]:grid-cols-2 gap-4 px-4 py-3">
                    <label className="flex flex-col min-w-40 flex-1">
                        <p className="text-white text-base font-medium leading-normal pb-2">Tipo de Combustível</p>
                        <select
                            value={fuelTypeFilter}
                            onChange={e => setFuelTypeFilter(e.target.value)}
                            className="form-select appearance-none flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#2e4e6b] bg-[#172736] focus:border-[#359dff] h-14 placeholder:text-[#8daece] p-[15px] text-base font-normal leading-normal"
                        >
                            <option value="all">Todos os Tipos</option>
                            {uniqueFuelTypes.map(ft => <option key={ft} value={ft}>{ft}</option>)}
                        </select>
                    </label>
                    <label className="flex flex-col min-w-40 flex-1">
                        <p className="text-white text-base font-medium leading-normal pb-2">Marca</p>
                        <select
                            value={brandFilter}
                            onChange={e => setBrandFilter(e.target.value)}
                            className="form-select appearance-none flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#2e4e6b] bg-[#172736] focus:border-[#359dff] h-14 placeholder:text-[#8daece] p-[15px] text-base font-normal leading-normal"
                        >
                            <option value="all">Todas as Marcas</option>
                            {uniqueBrands.sort().map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                    </label>
                    <label className="flex flex-col min-w-40 flex-1">
                        <p className="text-white text-base font-medium leading-normal pb-2">Distrito</p>
                        <select
                            value={districtFilter}
                            onChange={e => setDistrictFilter(e.target.value)}
                            className="form-select appearance-none flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#2e4e6b] bg-[#172736] focus:border-[#359dff] h-14 placeholder:text-[#8daece] p-[15px] text-base font-normal leading-normal"
                        >
                            <option value="all">Todos os Distritos</option>
                            {uniqueDistricts.sort().map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                    </label>
                    <label className="flex flex-col min-w-40 flex-1">
                        <p className="text-white text-base font-medium leading-normal pb-2">Ordenar por</p>
                        <select
                             value={sortBy}
                             onChange={e => setSortBy(e.target.value)}
                            className="form-select appearance-none flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#2e4e6b] bg-[#172736] focus:border-[#359dff] h-14 placeholder:text-[#8daece] p-[15px] text-base font-normal leading-normal"
                        >
                            <option value="price_asc">Preço: Ascendente</option>
                            <option value="price_desc">Preço: Descendente</option>
                            <option value="date_desc">Atualizado Recentemente</option>
                        </select>
                    </label>
                </div>

                <div className="px-4 py-3 mt-4 @container">
                    <div className="flex overflow-hidden rounded-lg border border-[#2e4e6b] bg-[#0f1a24]">
                        <table className="flex-1 w-full">
                            <thead>
                                <tr className="bg-[#172736]">
                                    <th className="px-4 py-3 text-left text-white w-[25%] text-sm font-medium leading-normal">Posto de Gasolina</th>
                                    <th className="px-4 py-3 text-left text-white w-[25%] text-sm font-medium leading-normal hidden @[480px]:table-cell">Endereço</th>
                                    <th className="px-4 py-3 text-left text-white w-[20%] text-sm font-medium leading-normal hidden @[360px]:table-cell">Combustível</th>
                                    <th className="px-4 py-3 text-left text-white w-[15%] text-sm font-medium leading-normal">Preço</th>
                                    <th className="px-4 py-3 text-left text-white w-[15%] text-sm font-medium leading-normal hidden @[640px]:table-cell">Última Atualização</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAndSortedStations.length > 0 ? filteredAndSortedStations.map(station => (
                                    <tr key={station.id} className="border-t border-t-[#2e4e6b] hover:bg-[#172736] cursor-pointer" onClick={() => navigate(`/station/${station.id}`)}>
                                        <td className="h-[72px] px-4 py-2 text-white text-sm font-normal leading-normal">{station.name}<br/><span className="text-[#8daece] text-xs">{station.brand}</span></td>
                                        <td className="h-[72px] px-4 py-2 text-[#8daece] text-sm font-normal leading-normal hidden @[480px]:table-cell">{station.address}, {station.municipality}</td>
                                        <td className="h-[72px] px-4 py-2 text-[#8daece] text-sm font-normal leading-normal hidden @[360px]:table-cell">{station.fuelType}</td>
                                        <td className="h-[72px] px-4 py-2 text-[#359dff] text-base font-bold leading-normal">{station.price.toFixed(3)}€</td>
                                        <td className="h-[72px] px-4 py-2 text-[#8daece] text-sm font-normal leading-normal hidden @[640px]:table-cell">{new Date(station.lastUpdated).toLocaleString('pt-PT')}</td>
                                    </tr>
                                )) : (
                                    <tr className="border-t border-t-[#2e4e6b]">
                                        <td colSpan={5} className="h-[72px] px-4 py-2 text-center text-white">Nenhum posto encontrado com os seus critérios.</td>
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

export default FuelPricesPage;
