
import { RouterProvider } from 'react-router-dom';
import { appRouter } from './app/router/Router';

export const App = () => {
  return ( 
    <>
    <RouterProvider router= {appRouter} />
    </>
  )
}
