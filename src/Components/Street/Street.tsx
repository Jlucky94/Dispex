import {StreetType} from "api/types";
import {useGetHousesByStreetIdQuery} from "api/api";
import House from "Components/House/House";
import styles from "./Street.module.css"
import useCollapse from "utils/hooks/useCollapse";

type Props = {
    street: StreetType
}
const Street = (props: Props) => {
    const {data: houses} = useGetHousesByStreetIdQuery(props.street.id)
    const {isCollapsed, toggle} = useCollapse()

    return (
        <div className={styles.container}>
            <div className={styles.title} onClick={toggle}>{props.street.nameWithPrefix}</div>
            <div className={styles.houses}>
                {!isCollapsed && houses && (
                    <div className={styles.houses}>
                        {houses.map((house) => (
                            <House key={house.id} house={house} streetId={props.street.id}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Street;