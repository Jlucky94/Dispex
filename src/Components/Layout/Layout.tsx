import {Outlet} from 'react-router-dom';
import styles from "App.module.css"; // Предполагается, что у вас есть компонент Header

const Layout = () => {
    return (
        <>
            <header className={styles.header}>
                <h1>УправДом Онлайн Сервис</h1>
            </header>
            <main>
                <Outlet/>
            </main>
        </>
    );
};

export default Layout;
