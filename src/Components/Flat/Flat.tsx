import {FlatType} from "api/types";
import styles from "./Flat.module.css"
import {useNavigate} from "react-router-dom";

type Props = {
    flat: FlatType
}
const Flat = (props: Props) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/address?addressId=${props.flat.addressId}`,{state:props.flat});
    };
    return (
        <div className={styles.container} onClick={handleClick}>
            <div className={styles.info}>
                Квартира: {props.flat.flat}
            </div>
        </div>
    );
};

export default Flat;