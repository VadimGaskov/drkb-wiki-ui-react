import "./BottomNavElement.css";

const BottomNavElement = ({img}) => {
    return(
        <div className="bottom-nav-wrapper">
            <div className="bottom-nav-element">
                <img src={img} />
            </div>
            <span>Личный кабинет</span>
        </div>
    );
}

export default BottomNavElement;