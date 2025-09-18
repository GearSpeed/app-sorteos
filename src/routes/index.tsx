import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '@pages/Home';
import YoutubeCommentsPage from '@pages/YoutubeCommentsPage';
import YoutubeFormPage from '@pages/YoutubeFormPage'
import TiktokFormPage from '@pages/TiktokFormPage'
import NotFound from '@pages/404';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },          // menú central
      { path: 'youtube', element: <YoutubeFormPage /> },
      { path: 'tiktok',  element: <TiktokFormPage /> },
      { path: 'comments', element: <YoutubeCommentsPage /> }, // resultado youtube
      { path: '*', element: <NotFound /> },
    ],
  },
]);