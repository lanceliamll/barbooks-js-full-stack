import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import bodyParser from 'body-parser';
import { summarizeOrders, Order } from './src/orders/summarizeOrders';
import { db } from "./src/db";

// load env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
// const DB_PATH = process.env.DB_PATH || './data.db';

// middleware
app.use(cors());
app.use(express.json());

// middleware request logging
app.use((req, res, next) => {
	const timestamp = new Date().toISOString();
	console.log(`[${timestamp}] ${req.method} ${req.url}`);
	next();
});


// 1. GET /api/summary - Read all orders, run summarizeOrders(), return JSON.
app.get('/api/summary', (req, res) => {
	db.all('SELECT * FROM orders', (error, rows: Order[]) => {
		if (error) {
			console.log('Error fetching orders:', error);
			return res.status(500).json({ error: 'Failed to fetch orders' });
		} else {
			const summary = summarizeOrders(rows);
			return res.json(summary);
		}
	})
});

// 2. GET /api/orders - Read all orders, return JSON array.
app.get('/api/orders', (req, res) => {
	const { product, limit, offset } = req.query;
	let query = 'SELECT * FROM orders WHERE 1=1';
	const params: any[] = [];

	if (product) {
		query += ' AND product LIKE ?';
		params.push(product);
	}

	if (limit) {
		query += ' LIMIT ?';
		params.push(Number(limit));
	}

	if (offset) {
		query += ' OFFSET ?';
		params.push(Number(offset));
	}

	db.all(query, params, (error, rows: Order[]) => {
		if (error) {
			console.log('Error fetching orders:', error);
			return res.status(500).json({ error: 'Failed to fetch orders' });
		} else {
			return res.json(rows);
		}
	})
});

// 3. POST /api/orders - Accept JSON body, insert new order, return created order with id.
app.post('/api/orders', (req, res) => {
	const { product, qty, price } = req.body;

	// validate input/data || Error Handling: return 400 on invalid input; handle DB errors gracefully.
	if (!product || typeof product !== 'string') {
		return res.status(400).json({ error: 'Invalid or missing "product"' });
	}

	if (qty < 0 || typeof qty !== 'number') {
		return res.status(400).json({ error: 'Invalid or missing "qty"' });
	}

	if (price < 0 || typeof price !== 'number') {
		return res.status(400).json({ error: 'Invalid or missing "price"' });
	}


	const sql = "INSERT INTO orders (product, qty, price) VALUES (?, ?, ?)";
	const params = [product, qty, price];

	db.run(sql, params, function (err) {
		if (err) {
			console.error(err);
			return res.status(500).json({ error: "Creating Product: DB error" });
		}

		const newId = this.lastID;

		db.get("SELECT * FROM orders WHERE id = ?", [newId], (err, row) => {
			if (err) {
				return res.status(500).json({ error: "DB error" });
			}
			res.status(201).json(row);
		});
	});
});


app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});