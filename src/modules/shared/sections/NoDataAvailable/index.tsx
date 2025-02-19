import styles from './NoDataAvailable.module.css';

type Props = {
  text?: string;
};

function NoDataAvailable({ text = 'No data available' }: Props) {
  return (
    <div className={styles.nodata}>
      <h1>{text}</h1>
    </div>
  );
}

export default NoDataAvailable;
