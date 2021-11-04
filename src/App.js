import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Coin from './pages/Coin';

const App = () => {
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route exact path='/'>
					<Home />
				</Route>
				<Route path='/coins/:id'>
					<Coin />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
