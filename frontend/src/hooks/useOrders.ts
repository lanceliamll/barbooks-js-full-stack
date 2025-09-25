import axios from 'axios';
import React, { useEffect } from 'react'

type Order = {
	id: number;
	product: string;
	price: number;
	qty: number;
}

const API_URL = import.meta.env.VITE_API_URL;

export default function useOrders(productFilter: string = '') {
	const [data, setData] = React.useState<Order[]>([]);
	const [loading, setLoading] = React.useState<boolean>(true);
	const [error, setError] = React.useState<string | null>(null);
	const [page, setPage] = React.useState<number>(1);
	const [hasMore, setHasMore] = React.useState<boolean>(true);

	const limit = 3;

	async function fetchOrders(productFilter: string = '') {
		try {
			 const offset = (page - 1) * limit;
			const response = await axios.get(`${API_URL}/orders`, {
				params: {
					limit,
					offset,
					...(productFilter ? { product: productFilter } : {})
				}
			});
			if (!response.data) {
				throw new Error('Network response was not ok');
			};
			setData(response.data);
			setHasMore(response.data.length === limit);
			setLoading(false);
		} catch (error) {
			setError('Failed to fetch orders');
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchOrders(productFilter);
	}, [productFilter, page]);

	return { data, loading, error, refetch: fetchOrders, page, setPage, hasMore };
}
