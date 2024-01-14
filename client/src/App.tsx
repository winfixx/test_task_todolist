import { Route, Routes } from 'react-router-dom'
import { routes } from './routes'

const App = () => {
  return (
    <Routes>
      {routes.map(({ Element, path }) =>
        <Route key={path}
          path={path}
          element={<Element />}
        />
      )}
    </Routes>
  )
}

export default App
