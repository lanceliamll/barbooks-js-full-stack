import React, { useState } from "react";
import axios from "axios";

type Props = {
	onSuccess: () => void;
};

const API_URL = import.meta.env.VITE_API_URL;

export function OrderForm({ onSuccess }: Props) {
	const [product, setProduct] = useState("");
	const [qty, setQty] = useState(1);
	const [price, setPrice] = useState(0);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		try {
			await axios.post(`${API_URL}/orders`, {
				product,
				qty: Number(qty),
				price: Number(price),
			});
			setProduct("");
			setQty(1);
			setPrice(0);
			onSuccess();
		} catch (err) {
			alert("Failed to add order");
		}
	}

	return (
		<form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
			<h2>Add Order</h2>	
			<div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "0.5rem" }}>
				<label>Product</label>
				<input
					value={product}
					onChange={e => setProduct(e.target.value)}
					placeholder="Product"
					required
				/>
				<label>Qty</label>
				<input
					type="number"
					value={qty}
					onChange={e => setQty(Number(e.target.value))}
					placeholder="Qty"
					// min="1"
					required
				/>

				<label>Price</label>
				<input
					type="number"
					step="0.01"
					value={price}
					onChange={e => setPrice(Number(e.target.value))}
					placeholder="Price"
					min="0.01"
					required
				/>
			</div>
			<button type="submit">Add Product</button>
		</form>
	);
}
