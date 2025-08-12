
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrandPrice, FuelStation, NewsArticle } from '../types';
import { FUEL_STATIONS, POPULAR_LOCATIONS, FUEL_TYPE_IMAGES } from '../constants';
import { fetchLatestNews } from '../services/geminiService';
import { MagnifyingGlassIcon } from '../components/Icons';

const FuelTable: React.FC<{ stations: FuelStation[], title: string }> = ({ stations, title }) => {
    const navigate = useNavigate();
    return (
        <div className="px-4 py-3 @container">
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">{title}</h2>
            <div className="flex overflow-hidden rounded-lg border border-[#2e4e6b] bg-[#0f1a24]">
                <table className="flex-1 w-full">
                    <thead>
                        <tr className="bg-[#172736]">
                            <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal hidden @[360px]:table-cell">Posto</th>
                            <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal">Combustível</th>
                            <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal">Preço</th>
                            <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal hidden @[480px]:table-cell">Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stations.map((station) => (
                            <tr key={station.id} className="border-t border-t-[#2e4e6b] hover:bg-[#172736] cursor-pointer" onClick={() => navigate(`/station/${station.id}`)}>
                                <td className="h-[72px] px-4 py-2 text-white text-sm font-normal leading-normal hidden @[360px]:table-cell">{station.name}</td>
                                <td className="h-[72px] px-4 py-2 text-[#8daece] text-sm font-normal leading-normal">{station.fuelType}</td>
                                <td className="h-[72px] px-4 py-2 text-[#359dff] text-sm font-bold leading-normal">{station.price.toFixed(3)}€/L</td>
                                <td className="h-[72px] px-4 py-2 text-[#8daece] text-sm font-normal leading-normal hidden @[480px]:table-cell">{new Date(station.lastUpdated).toLocaleDateString('pt-PT')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const BrandTable: React.FC<{ brandPrices: BrandPrice[] }> = ({ brandPrices }) => (
    <div className="px-4 py-3 @container">
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Comparar Preços Médios por Marca</h2>
        <div className="flex overflow-hidden rounded-lg border border-[#2e4e6b] bg-[#0f1a24]">
            <table className="flex-1 w-full">
                 <thead>
                    <tr className="bg-[#172736]">
                        <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal">Marca</th>
                        <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal hidden @[240px]:table-cell">Gasolina</th>
                        <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal hidden @[360px]:table-cell">Gasóleo</th>
                        <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal hidden @[480px]:table-cell">GPL</th>
                    </tr>
                </thead>
                <tbody>
                    {brandPrices.map(brand => (
                        <tr key={brand.brand} className="border-t border-t-[#2e4e6b]">
                            <td className="h-[72px] px-4 py-2 text-white text-sm font-bold leading-normal">{brand.brand}</td>
                            <td className="h-[72px] px-4 py-2 text-[#8daece] text-sm font-normal leading-normal hidden @[240px]:table-cell">{brand.gasoline ? `${brand.gasoline.toFixed(3)}€/L` : 'N/A'}</td>
                            <td className="h-[72px] px-4 py-2 text-[#8daece] text-sm font-normal leading-normal hidden @[360px]:table-cell">{brand.diesel ? `${brand.diesel.toFixed(3)}€/L` : 'N/A'}</td>
                            <td className="h-[72px] px-4 py-2 text-[#8daece] text-sm font-normal leading-normal hidden @[480px]:table-cell">{brand.lpg ? `${brand.lpg.toFixed(3)}€/L` : 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const HomePage: React.FC = () => {
    const [news, setNews] = useState<NewsArticle[]>([]);
    const [loadingNews, setLoadingNews] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const getNews = async () => {
            setLoadingNews(true);
            const articles = await fetchLatestNews();
            setNews(articles);
            setLoadingNews(false);
        };
        getNews();
    }, []);
    
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/prices?search=${searchQuery}`);
    };

    const top5Gasoline = useMemo(() =>
        FUEL_STATIONS.filter(s => s.fuelType.toLowerCase().includes('gasolina')).sort((a, b) => a.price - b.price).slice(0, 5),
    []);
    
    const top5Diesel = useMemo(() =>
        FUEL_STATIONS.filter(s => s.fuelType.toLowerCase().includes('gasóleo')).sort((a, b) => a.price - b.price).slice(0, 5),
    []);

    const brandPrices = useMemo(() => {
        const brands = [...new Set(FUEL_STATIONS.map(s => s.brand))];
        return brands.map(brand => {
            const brandStations = FUEL_STATIONS.filter(s => s.brand === brand);
            const getAvgPrice = (fuelType: string) => {
                const stations = brandStations.filter(s => s.fuelType.toLowerCase().includes(fuelType));
                if (stations.length === 0) return null;
                const total = stations.reduce((acc, curr) => acc + curr.price, 0);
                return total / stations.length;
            };
            return {
                brand,
                gasoline: getAvgPrice('gasolina'),
                diesel: getAvgPrice('gasóleo'),
                lpg: getAvgPrice('gpl'),
            };
        }).sort((a, b) => a.brand.localeCompare(b.brand));
    }, []);

    return (
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="@container">
                <div className="@[480px]:p-4">
                    <div className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-lg items-center justify-center p-4" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://picsum.photos/seed/hero/1200/600")` }}>
                        <div className="flex flex-col gap-2 text-center">
                            <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">Encontre os preços de combustível mais baratos em Portugal</h1>
                            <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">Compare os preços de todos os postos de gasolina em Portugal e poupe dinheiro no seu próximo abastecimento.</h2>
                        </div>
                        <form onSubmit={handleSearch} className="flex flex-col min-w-40 h-14 w-full max-w-[480px] @[480px]:h-16">
                            <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                                <div className="text-[#8daece] flex border border-[#2e4e6b] bg-[#172736] items-center justify-center pl-[15px] rounded-l-lg border-r-0">
                                    <MagnifyingGlassIcon size="20px" />
                                </div>
                                <input
                                    placeholder="Digite sua localização"
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#2e4e6b] bg-[#172736] focus:border-[#2e4e6b] h-full placeholder:text-[#8daece] px-[15px] rounded-r-none border-r-0 pr-2 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <div className="flex items-center justify-center rounded-r-lg border-l-0 border border-[#2e4e6b] bg-[#172736] pr-[7px]">
                                    <button type="submit" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#359dff] text-[#0f1a24] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
                                        <span className="truncate">Pesquisar</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <FuelTable stations={top5Gasoline} title="Top 5 Postos de Gasolina Mais Baratos" />
            <FuelTable stations={top5Diesel} title="Top 5 Postos de Gasóleo Mais Baratos" />
            <BrandTable brandPrices={brandPrices} />
            
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Localizações Populares</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
                {POPULAR_LOCATIONS.map(location => (
                    <div key={location.name} className="flex flex-col gap-3 pb-3 cursor-pointer group" onClick={() => navigate(`/prices?district=${location.name}`)}>
                        <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg transition-transform group-hover:scale-105" style={{ backgroundImage: `url("${location.imageUrl}")` }}></div>
                        <p className="text-white text-base font-medium leading-normal group-hover:text-[#359dff]">{location.name}</p>
                    </div>
                ))}
            </div>

            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Tipos de Combustível</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
                {FUEL_TYPE_IMAGES.map(fuel => (
                    <div key={fuel.name} className="flex flex-col gap-3 pb-3 cursor-pointer group" onClick={() => navigate(`/prices?fuelType=${fuel.name}`)}>
                        <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg transition-transform group-hover:scale-105" style={{ backgroundImage: `url("${fuel.imageUrl}")` }}></div>
                        <p className="text-white text-base font-medium leading-normal group-hover:text-[#359dff]">{fuel.name}</p>
                    </div>
                ))}
            </div>

            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Últimas Notícias</h2>
            {loadingNews ? (
                <div className="p-4 text-center text-white">A carregar notícias...</div>
            ) : (
                news.map((article, index) => (
                    <div key={index} className="p-4">
                        <div className="flex flex-col-reverse @[480px]:flex-row items-stretch justify-between gap-4 rounded-lg">
                            <div className="flex flex-col gap-1 flex-[2_2_0px]">
                                <p className="text-[#8daece] text-sm font-normal leading-normal">{article.category}</p>
                                <p className="text-white text-base font-bold leading-tight">{article.title}</p>
                                <p className="text-[#8daece] text-sm font-normal leading-normal">{article.summary}</p>
                            </div>
                            <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-1" style={{ backgroundImage: `url("${article.imageUrl}")` }}></div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default HomePage;
