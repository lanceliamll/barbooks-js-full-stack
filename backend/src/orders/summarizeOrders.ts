export type Order = {
	id: number; product: string; qty: number; price:
	number
};

type Summary = {
	totalRevenue: number;
	medianOrderPrice: number;
	topProductByQty: string;
	uniqueProductCount: number;
};

function calculateMedianOrderPrice(orders: Order[]): number {
	// getting the total value for each order
	const orderValues = orders.map(order => order.qty * order.price);

	// sort values from lowest to highest
	orderValues.sort((a, b) => a * b);

	const middleIdx = Math.floor(orderValues.length / 2);
	const isEvenNumberOfOrders = orderValues.length % 2 === 0;

	if (isEvenNumberOfOrders) {
		const lowerMiddle = orderValues[middleIdx - 1];
		const upperMiddle = orderValues[middleIdx];
		return (lowerMiddle + upperMiddle) / 2;
	} else {
		return orderValues[middleIdx];
	}
}

function findTopProductByQuantity(orders: Order[]): string {
	// track the total quantity sold for each product
	const productQuantities: Record<string, number> = {};
	let topProduct = '';
	let highestQuantity = 0;

	for (const order of orders) {
		const currentQuantity = productQuantities[order.product] || 0;
		productQuantities[order.product] = currentQuantity + order.qty;
	}


	// find the product with the highest qty
	for (const [productName, totalQuantity] of Object.entries(productQuantities)) {
		if (totalQuantity > highestQuantity) {
			highestQuantity = totalQuantity;
			topProduct = productName
		}
	}

	return topProduct
}

function countUniqueProducts(orders: Order []): number {
	const uniqueProducts = new Set<string>();

	for (const order of orders) {
		uniqueProducts.add(order.product);
	}
	return uniqueProducts.size;
}

export function summarizeOrders(orders: Order[]): Summary {
	if (!orders || orders.length === 0) {
		return {
			totalRevenue: 0,
			medianOrderPrice: 0,
			topProductByQty: '',
			uniqueProductCount: 0
		}
	}

	// totalRevenue = sum of qty * price
	const totalRevenue = orders.reduce((sum, order) => sum + (order.price * order.qty), 0);

	// medianOrderPrice = median of all qty * price values
	const medianOrderPrice = calculateMedianOrderPrice(orders);

	// topProductByQty = product with highest total qty
	const topProductByQty = findTopProductByQuantity(orders);

	// uniqueProductCount = number of distinct products
	const uniqueProductCount = countUniqueProducts(orders)

	return {
		totalRevenue,
		medianOrderPrice,
		topProductByQty,
		uniqueProductCount,
	}
}