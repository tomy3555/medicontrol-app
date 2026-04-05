
import { RouterProvider } from 'react-router-dom';
import { appRouter } from './app/router/Router';
import { TooltipProvider } from './components/ui/tooltip';
import { Toaster } from 'sonner';

export const App = () => {
  return ( 
    <TooltipProvider>
    <Toaster />
    <RouterProvider router= {appRouter} />
    </TooltipProvider>
  )
}
