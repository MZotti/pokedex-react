import { BrowserRouter as Router } from 'react-router-dom'

import Routes from './Routes'

function App() {

  return (
    <div
      className='
        flex
        justify-center
        w-full
        p-8
      '
    >
    <Router>
      <Routes />
    </Router>
    </div>
  )
}

export default App
