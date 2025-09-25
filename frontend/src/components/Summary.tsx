import { useSummary } from '../hooks/useSummary';

export default function Summary() {
	const { data, error, loading } = useSummary();

	console.log('Summary Data', data, error, loading)
	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;
	if (!data) return <div>No data available</div>;

	return (
		<>
			<div>Summary</div>
			<div>Total Revenue: {data.totalRevenue}</div>
			<div>Median Order Price: {data.medianOrderPrice}</div>
			<div>Top Product by Quantity: {data.topProductByQty}</div>
			<div>Unique Product Count: {data.uniqueProductCount}</div>
		</>
	)
}
