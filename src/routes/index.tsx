import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import YoutubeCommentsPage from '../pages/YoutubeCommentsPage';
import NotFound from '../pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'comments', element: <YoutubeCommentsPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);