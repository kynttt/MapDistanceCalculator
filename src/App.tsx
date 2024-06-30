import React from 'react';
import DistanceCalculator from '../src/component/DistanceCalculator';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-3xl font-bold underline">React Leaflet Example</h1>
      </header>
      <main>
        <DistanceCalculator />
      </main>
    </div>
  );
};

export default App;
