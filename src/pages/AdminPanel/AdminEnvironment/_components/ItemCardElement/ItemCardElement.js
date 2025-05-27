import {Link} from "react-router-dom";
import styles from "./ItemCardElement.module.css";

const ItemCardElement = ({title, itemId}) => {
    return(
        <Link to={`${itemId}`} className={styles.itemCard}>
            <h2 className={styles.itemName}>{title}</h2>
        </Link>
    )
}

export default ItemCardElement;