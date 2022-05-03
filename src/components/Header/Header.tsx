import styles from './Header.module.css';

type HeaderPropsType = {

}

export const Header: React.FC = ({ }) => {


  return (
    <div className={styles.header}>
      Hello from header
    </div>
  );
};
