import React, { Suspense } from 'react';

const DynamicHeroSection = React.lazy(() => import('../components/HeroSection'));
const DynamicMovieList = React.lazy(() => import('../components/MovieList'));

function Home() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <DynamicHeroSection />
        <DynamicMovieList />
      </Suspense>
    </div>
  );
}

export default Home;
