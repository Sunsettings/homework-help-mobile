import { Outlet } from 'react-router-dom';
import Bottom from './components/Bottom';
import Header from './components/Header';
import styles from './App.module.less';
/**
 * 公共组件，用于处理 header 和 bottom
 * @returns
 */
const App = () => (
  <div className={styles.container}>
    <Header />
    <Outlet />
    <Bottom />
  </div>
);

export default App;
