import React from 'react';
import useOrders from '../hooks/useOrders';
import { useDebounce } from '../hooks/useDebounce';

export default function OrdersList() {
	const [searchTerm, setSearchTerm] = React.useState<string>('');
	 const debouncedSearch = useDebounce(searchTerm, 500);
	const { data, loading, error, hasMore, setPage, page } = useOrders(debouncedSearch);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div style={{ marginTop: '20px' }}>
			<div>OrdersList</div>
			<input type='text' placeholder='Filter by product name' onChange={e => {
				setPage(1);
				setSearchTerm(e.target.value)
			}} />
			<ul>
				{data.map(order => (
					<li key={order.id}>
						{order.product} - ${order.price} x {order.qty}
					</li>
				))}
			</ul>
			{page > 1 && <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>}
			{hasMore && <button onClick={() => setPage(page + 1)} disabled={!hasMore}>Next</button>}
		</div>
	)
}
