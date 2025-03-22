import Header from './components/Header/Header';
import LiveData from './components/LiveData/LiveData';
import AiData from './components/AiData/AiData';
import Footer from './components/Footer/Footer';
import styles from './App.module.css';

function App() {
	return (
		<div className={styles.main}>
			<div className={styles.topBlock}>
				<Header />
			</div>
			<div className={styles.middleBlock}>
				<LiveData />
				<AiData />
			</div>
			<div className={styles.bottomBlock}>
				<Footer />
			</div>
		</div>
	);
}

export default App;
