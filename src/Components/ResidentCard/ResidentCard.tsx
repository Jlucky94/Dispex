import {ClientType} from "api/types";
import styles from "./ResidentCard.module.css"
import {useDeleteClientMutation} from "api/api";

type Props = {
    resident: ClientType
    addressId:number
}
const ResidentCard = (props: Props) => {
    const [deleteClient,{isLoading:isDeleting}] = useDeleteClientMutation()

    const handleDeleteResident = async () => {
        await deleteClient({clientId: props.resident.bindId, addressId: props.addressId}).unwrap();
    };
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>Карточка жильца</div>
            <div>Имя жильца: {props.resident.name}</div>
            <div>Эл. почта: {props.resident.email}</div>
            <div>Телефон: {props.resident.phone}</div>
            <button
                className={styles.deleteBtn}
                onClick={handleDeleteResident}
                disabled={isDeleting}
            >
                {isDeleting ? 'Удаление...' : 'Удалить жильца'}
            </button>
        </div>
    );
};

export default ResidentCard;