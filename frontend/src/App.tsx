import { Provider } from 'react-redux'
import { store } from './shared/store'
import AppRouter from './routes'
import './shared/i18n'

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  )
}

export default App
