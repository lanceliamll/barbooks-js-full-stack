import dotenv from 'dotenv';
import app from './src/app'
// load env
dotenv.config();

const PORT = process.env.PORT || 3000;
// const DB_PATH = process.env.DB_PATH || './data.db';


app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});