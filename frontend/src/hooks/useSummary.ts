import { useEffect, useState } from "react";
import axios from "axios";


type Summary = {
	totalRevenue: number;
	medianOrderPrice: number;
	topProductByQty: string;
	uniqueProductCount: number;
};

const API_URL = import.meta.env.VITE_API_URL;

export function useSummary() {
	const [data, setData] = useState<Summary | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	async function getSummary() {
		try {
			setLoading(true);
			const response = await axios.get<Summary>(`${API_URL}/summary`);
			setData(response.data);
		} catch (error) {
			console.log('ERRROR', error);
			setError('Failed to fetch summary');
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		getSummary();
	}, []);

	return { data, error, loading, refetch: getSummary };
}