import { CryptoToken } from '@/types/crypto';

export type FilterType = "market_cap" | "volume" | "gainers" | "losers" | "trending";

export const formatPrice = (price: number): string => {
  if (price < 0.01) {
    return `$${price.toFixed(6)}`;
  } else if (price < 1) {
    return `$${price.toFixed(4)}`;
  } else if (price < 100) {
    return `$${price.toFixed(2)}`;
  } else {
    return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
};

export const formatVolume = (volume: number): string => {
  if (volume >= 1000000000) {
    return `$${(volume / 1000000000).toFixed(2)}B`;
  } else if (volume >= 1000000) {
    return `$${(volume / 1000000).toFixed(2)}M`;
  } else if (volume >= 1000) {
    return `$${(volume / 1000).toFixed(2)}K`;
  } else {
    return `$${volume.toFixed(2)}`;
  }
};

export const formatMarketCap = (marketCap: number): string => {
  if (marketCap >= 1000000000000) {
    return `$${(marketCap / 1000000000000).toFixed(2)}T`;
  } else if (marketCap >= 1000000000) {
    return `$${(marketCap / 1000000000).toFixed(2)}B`;
  } else if (marketCap >= 1000000) {
    return `$${(marketCap / 1000000).toFixed(2)}M`;
  } else {
    return `$${marketCap.toLocaleString()}`;
  }
};

export const generateMarketData = (cryptoOptions: CryptoToken[], activeFilter: FilterType) => {
  console.log("Generating market data :", cryptoOptions);
  const marketData = cryptoOptions.map((crypto, index) => ({
    ...crypto,
    value: crypto.id || crypto.symbol?.toLowerCase() || `token-${index}`,
    price: crypto.current_price || Math.random() * 1000,
    change24h: crypto.price_change_percentage_24h || (Math.random() - 0.5) * 20,
    volume24h: crypto.total_volume || Math.random() * 1000000000,
    marketCap: crypto.market_cap || Math.random() * 10000000000,
    predictionPercentage: (Math.random() - 0.5) * 30,
    aiScore: Math.random() * 100,
    category: crypto.category || 'Cryptocurrency',
    pricechange_24h: crypto.price_change_24h,
    price_change_percentage_7d_in_currency: crypto.price_change_percentage_7d_in_currency,
    price_change_percentage_24h: crypto.price_change_percentage_24h,
    price_change_percentage_24h_in_currency: crypto.price_change_percentage_24h_in_currency,
    price_change_percentage_30d_in_currency: crypto.price_change_percentage_30d_in_currency,
    AllTimeHigh: crypto.ath || Math.random() * 1000,
    AllTimeLow: crypto.atl || Math.random() * 10
  }));
  
   return marketData.slice(0, 12);
};

export const getFilterTitle = (activeFilter: FilterType): string => {
  switch (activeFilter) {
    case 'gainers':
      return 'Top Gainers';
    case 'losers':
      return 'Top Losers';
    case 'volume':
      return 'Highest Volume';
    case 'trending':
      return 'Trending Tokens';
    case 'market_cap':
    default:
      return 'Market Cap Leaders';
  }
};
