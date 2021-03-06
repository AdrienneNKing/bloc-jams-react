import React from 'react';
import Background from './Background';

const Landing = () => (
  <section className='landing'>
    <Background />

    <div className='hero-title-container'>
      <h1>Bloc Jams</h1>
      <h2 className='hero-title'>Turn the music up!</h2>

      <section className='selling-points'>
        <div className='point'>
          <h2 className='point-title'>Choose your music</h2>
          <p className='point-description'>The world is full of music; why should you have to listen to music that someone else chose?</p>
        </div>
        <div className='point'>
          <h2 className='point-title'>Unlimited, streaming, ad-free</h2>
          <p className='point-description'>No arbitrary limits. No distractions.</p>
        </div>
        <div className='point'>
          <h2 className='point-title'>Mobile enabled</h2>
          <p className='point-description'>Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
        </div>
      </section>
    </div>
  </section>
);

export default Landing;
