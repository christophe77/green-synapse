import AskSyn from './components/AskSyn/AskSyn';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const App = () => {
	return (
		<div className="min-h-screen bg-black text-white flex flex-col">
			<Header />
			<div className="flex-grow relative">
				
					<AskSyn />
			
			</div>
			<Footer />
		</div>
	);
};
export default App;
