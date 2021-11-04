import { useContext, createContext, useState, useEffect } from 'react';

const Crypto = createContext();

export const useCryptoState = () => {
	return useContext(Crypto);
};

const CryptoContext = ({ children }) => {
	const [currency, setCurrency] = useState('usd');
	const [symbol, setSymbol] = useState('$');

	useEffect(() => {
		if (currency === 'usd') setSymbol('$');
		else if (currency === 'idr') setSymbol('Rp');
	}, [currency]);

	return (
		<Crypto.Provider value={{ currency, symbol, setCurrency }}>
			{children}
		</Crypto.Provider>
	);
};

export default CryptoContext;
