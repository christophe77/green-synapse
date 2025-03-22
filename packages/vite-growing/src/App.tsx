import Header from './components/Header/Header';
import JamaicanGardener from './components/JamaicanGardener/JamaicanGardener';
import Footer from './components/Footer/Footer';
import styles from './App.module.css';
import StrainForm from './components/StrainForm/StrainForm';

function App() {
	return (
		<div className={styles.main}>
			<div className={styles.topBlock}>
				<Header />
			</div>
			<div className={styles.middleBlock}>
				<StrainForm />
			</div>
			<div className={styles.middleBlock}>
				<JamaicanGardener />
			</div>
			<div className={styles.bottomBlock}>
				<Footer />
			</div>
		</div>
	);
}

export default App;
