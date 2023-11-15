import {HouseType} from "api/types";
import {useGetHousingStockByHouseIdQuery} from "api/api";
import Flat from "Components/Flat/Flat";
import styles from "./House.module.css"
import useCollapse from "utils/hooks/useCollapse";

type Props = {
    house: HouseType
    streetId: number
}
const Street = (props: Props) => {
    const {data: housingStock} = useGetHousingStockByHouseIdQuery({streetId: props.streetId, houseId: props.house.id})
    const {isCollapsed, toggle} = useCollapse()

    return (
        <div className={styles.container}>
            <div className={styles.info} onClick={toggle}>
                Дом № {props.house.id}
            </div>
            {!isCollapsed && housingStock && (
                <div className={styles.houses}>
                    {housingStock.map((flat) => (
                        <Flat key={flat.flat} flat={flat}/>
                    ))}
                </div>
            )}

        </div>
    );
};

export default Street;