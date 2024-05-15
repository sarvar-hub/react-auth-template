import ReactDOM from 'react-dom/client'
import './index.css'
import App from '@/components/App'
import { Provider as JotaiProvider } from 'jotai'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <JotaiProvider>
        <App />
    </JotaiProvider>
)
