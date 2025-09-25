# BarBooks JS Full Stack Assessment

A TypeScript-based full-stack application demonstrating order processing and data analysis capabilities.

## Project Structure

```
backend/
├── src/
│   ├── orders/
│   │   └── summarizeOrders.ts    # Order analysis logic
│   ├── index.ts                  # Express server & API routes
│   ├── db.ts                     # Database connection
│   └── seed.ts                   # Database seeding
├── tests/
│   ├── summarizeOrders.test.ts   # Unit tests
│   └── orders.test.ts            # Integration tests
├── .env                          # Environment variables
├── package.json
└── tsconfig.json

frontend/
├── src/
│   ├── hooks/
│   │   ├── useDebounce.ts        # Debounced search hook
│   │   ├── useOrders.ts          # Orders data hook
│   │   └── useSummary.ts         # Summary data hook
│   ├── components/
│   │   ├── OrdersList.tsx        # Orders display component
│   │   ├── OrdersSummary.tsx     # Summary display component
│   │   ├── OrdersForm.tsx        # Add orders component
│   └── App.tsx
├── package.json
└── tsconfig.json
```

## Task 1: Logic & Unit Testing (15 min)

This task implements order summarization logic with comprehensive unit testing.

### Features
- **Total Revenue Calculation**: Sum of all order values (qty × price)
- **Median Order Price**: Statistical median of individual order values
- **Top Product by Quantity**: Product with highest total quantity sold
- **Unique Product Count**: Number of distinct products ordered

### Verification Steps
1. Open your terminal (`Ctrl + `` or `Cmd + ``)
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Run the test suite:
   ```bash
   npm run test
   ```

### Test Coverage
- ✅ Typical case with mixed products
- ✅ Even number of orders (median calculation)
- ✅ Empty input handling
- ✅ Edge cases and boundary conditions

## Task 2: Database Schema & Mock Data (5 min)

This task sets up a SQLite database with order data for testing and development.

### Database Schema
```sql
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  product TEXT NOT NULL,
  qty INTEGER NOT NULL,
  price REAL NOT NULL
);
```

### Verification Steps
1. Open your terminal (`Ctrl + `` or `Cmd + ``)
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Run the database seeding script:
   ```bash
   npx ts-node src/seed.ts
   ```
   > This creates a `data.db` file in the backend directory

4. **View the data** (choose one option):
   
   **Option A: SQLite Viewer Extension**
   - If you have a SQLite viewer extension installed, simply click on `data.db`
   
   **Option B: Command Line**
   ```bash
   sqlite3 data.db "SELECT * FROM orders"
   ```

### Sample Data
The seeding script populates the database with realistic order data including:
- Various product types
- Different quantities and prices
- Multiple orders per product
- Edge cases for testing

## Task 3: API Endpoints (15 min)

This task implements RESTful API endpoints with Express.js server, including configuration, middleware, and error handling.

### Features
- **Environment Configuration**: Loads `DB_PATH` and `PORT` from `.env`
- **Request Logging**: Morgan middleware for HTTP request logging
- **CORS Support**: Cross-origin resource sharing enabled
- **Input Validation**: Comprehensive validation with descriptive error messages
- **Error Handling**: Graceful database error handling with proper HTTP status codes

### API Endpoints

#### 1. GET /api/summary
Returns aggregated order statistics using the `summarizeOrders()` function.

**Response:**
```json
{
  "totalRevenue": 1250.50,
  "medianOrderPrice": 45.00,
  "topProductByQty": "Apple iPhone",
  "uniqueProductCount": 15
}
```

#### 2. GET /api/orders
Retrieves orders with optional filtering and pagination support.

**Query Parameters:**
- `product` (string): Partial product name filter
- `limit` (number): Number of orders to return
- `offset` (number): Number of orders to skip

**Examples:**
```bash
# Get all orders
GET /api/orders

# Filter by product name
GET /api/orders?product=Apple

# Paginate results
GET /api/orders?limit=10&offset=20

# Combine filters
GET /api/orders?product=iPhone&limit=5&offset=0
```

#### 3. POST /api/orders
Creates a new order with validation.

**Request Body:**
```json
{
  "product": "MacBook Pro",
  "qty": 2,
  "price": 1299.99
}
```

**Response:**
```json
{
  "id": 123,
  "product": "MacBook Pro",
  "qty": 2,
  "price": 1299.99
}
```

### Verification Steps
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Test the endpoints using curl or Postman:

   **Test Summary Endpoint:**
   ```bash
   curl http://localhost:3000/api/summary
   ```

   **Test Orders Endpoint:**
   ```bash
   # Get all orders
   curl http://localhost:3000/api/orders
   
   # Filter by product
   curl "http://localhost:3000/api/orders?product=Apple"
   
   # Paginate
   curl "http://localhost:3000/api/orders?limit=5&offset=0"
   ```

   **Test Create Order:**
   ```bash
   curl -X POST http://localhost:3000/api/orders \
     -H "Content-Type: application/json" \
     -d '{"product":"Orange","qty":10,"price":1.5}'
   ```

## Task 4: React Frontend with Custom Hooks (20 min)

This task implements a React frontend with custom hooks for API integration, debounced search, and interactive controls.

### Custom Hooks

#### useDebounce
Debounces rapid input changes to prevent excessive API calls during typing.
```typescript
const debouncedSearchTerm = useDebounce(searchTerm, 300);
```

#### useOrders
Manages orders data with filtering and pagination support.
```typescript
const { orders, loading, error, refetch } = useOrders({
  product: searchTerm,
  limit: pageSize,
  offset: currentPage * pageSize
});
```

#### useSummary
Fetches and manages order summary statistics.
```typescript
const { summary, loading, error, refetch } = useSummary();
```

### Features
- **Real-time Search**: Debounced product name filtering
- **Pagination Controls**: Navigate through large datasets
- **Summary Dashboard**: Live order statistics display
- **Error Handling**: User-friendly error states
- **Loading States**: Smooth loading indicators

### Components
- **OrdersSummary**: Displays key metrics and statistics
- **OrdersList**: Paginated table of orders with sorting
- **OrdersFilter**: Search and pagination controls
- **CreateOrderForm**: Add new orders interface

### Verification Steps
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open your browser to `http://localhost:5173`
4. Test the features:
   - ✅ View order summary statistics
   - ✅ Search orders by product name
   - ✅ Navigate through pages
   - ✅ Create new orders
   - ✅ Real-time data updates

## Task 5: Integration Testing (10 min)

This task implements comprehensive integration tests that verify the complete flow from API endpoints to database operations.

### Test Coverage
- **API Endpoint Testing**: All REST endpoints with various scenarios
- **Database Integration**: Real SQLite database operations
- **Error Handling**: Invalid inputs and edge cases
- **Data Validation**: Schema compliance and business rules
- **End-to-End Workflows**: Complete user scenarios

### Test Scenarios
```typescript
// GET /api/summary integration
✅ Returns correct summary calculations
✅ Handles empty database gracefully
✅ Validates response structure

// GET /api/orders integration  
✅ Filters orders by product name
✅ Paginates results correctly
✅ Validates query parameters
✅ Handles database errors

// POST /api/orders integration
✅ Creates orders successfully
✅ Validates required fields
✅ Prevents invalid data types
✅ Returns created order with ID
```

### Verification Steps
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Run integration tests:
   ```bash
   npm run test:integration
   ```
   
   Or run all tests including unit tests:
   ```bash
   npm run test
   ```

### Test Database
- Uses separate test database (`data.db`)
- Automatic setup and teardown
- Isolated test environment
- Real SQLite operations without affecting development data

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- TypeScript

### Installation
1. Clone the repository
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

### Development Workflow
1. **Setup Database**:
   ```bash
   cd backend
   npx ts-node src/seed.ts
   ```

2. **Start Backend**:
   ```bash
   npm run dev
   # Server runs on http://localhost:3000
   ```

3. **Start Frontend** (new terminal):
   ```bash
   cd frontend
   npm run dev
   # App runs on http://localhost:5173
   ```

4. **Run Tests**:
   ```bash
   # Backend tests
   cd backend
   npm run test
   
   # Frontend tests
   cd frontend
   npm run test
   ```

## Technologies Used
- **Backend**: TypeScript, Express.js, SQLite, Jest, Supertest
- **Frontend**: React, TypeScript, Custom Hooks, Vite
- **Testing**: Jest, Supertest, React Testing Library
- **Tools**: Morgan (logging), CORS, dotenv, nodemon