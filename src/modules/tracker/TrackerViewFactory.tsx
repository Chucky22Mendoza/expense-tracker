import ExpenseTracker from './sections/ExpenseTracker';
import Form from './sections/Form';
import HistoryCard from './sections/HistoryCard';
import styles from './TrackerViewFactory.module.css';

function TrackerViewFactory() {
  return (
    <section className={styles.viewer}>
      <ExpenseTracker />
      <div className={styles.data}>
        <Form />
        <HistoryCard />
      </div>
    </section>
  );
}

export default TrackerViewFactory;
