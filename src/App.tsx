import 'App.module.css'
import {useGetStreetsQuery} from "api/api";
import Street from "Components/Street/Street";
import styles from "./App.module.css"

function App() {
    const {data: streets} = useGetStreetsQuery()
    return (
        <div className={styles.container}>
            <main className={styles.content}>
                <div className={styles.streetList}>
                    {streets?.map(street => <Street key={street.id} street={street}/>)}
                </div>
            </main>

        </div>
    )
}

export default App
