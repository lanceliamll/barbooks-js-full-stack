import './App.css'
import { OrderForm } from './components/OrderForm'
import OrdersList from './components/OrdersList'
import Summary from './components/Summary'
import useOrders from './hooks/useOrders'
import { useSummary } from './hooks/useSummary'

function App() {
  const { refetch: refetchOrders } = useOrders();
  const { refetch: refetchSummary } = useSummary();

  const handleOrderCreated = async () => {
    alert('Successfully Created!');
    // Refetch both orders and summary after creating new order
    await refetchOrders();
    await refetchSummary();
  }

  return (
    <>
      Orders Dashboard
      <Summary />
      <OrdersList />
      <OrderForm onSuccess={handleOrderCreated} />
    </>
  )
}

export default App
