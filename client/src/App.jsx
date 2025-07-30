import { useState, Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import NewsLayout from './components/news/NewsLayout';
import OfferPage from './pages/OfferPage';

// Lazy-loaded pages
const HomePage = lazy(() => import('./pages/HomePage'));
const Register = lazy(() => import('./pages/Register'));
const Login = lazy(() => import('./pages/Login'));
const NewsPage = lazy(() => import('./pages/NewsPage'));
const NewsDetails = lazy(() => import('./pages/NewsDetails'));
const Collection = lazy(() => import('./pages/Collection'));
const AboutUs = lazy(() => import('./pages/AboutUs'));

function App() {
  const [count, setCount] = useState(0);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />

          <Route element={<NewsLayout />}>
            <Route path='/news' element={<NewsPage />} />
            <Route path='/news/:id' element={<NewsDetails />} />
          </Route>

          <Route path='/:category/:subCategory?' element={<Collection />} />
          <Route path='/company/:category' element={<AboutUs />} />
          <Route path='/offers/:id' element={<OfferPage />} />

        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
