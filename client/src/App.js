import MapContainer from './components/map/MapContainer';
import { Route, Switch } from 'react-router-dom'; //libraries for routing

//Main fronend app
function App() {
  return (
    <main>
      <Switch>
        <Route path="/map" component={MapContainer} />
      </Switch>
    </main>
  );
}

export default App;
