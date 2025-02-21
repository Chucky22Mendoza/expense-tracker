import { CardContainer, CardContent } from "../CardContainer";
import styles from './form.module.css';
import { useNavigate } from 'react-router-dom';
import FormTransaction from './FormTransaction';

function Form() {
  const navigate = useNavigate();

  return (
    <CardContainer
      title="New Transaction"
      buttonText="Settings"
      onClick={() => navigate('/settings')}
      style={{
        height: '447.53px',
        minHeight: '447.53px',
        maxHeight: '447.53px',
      }}
    >
      <CardContent className={styles.content}>
        <FormTransaction />
      </CardContent>
    </CardContainer>
  );
}

export default Form;