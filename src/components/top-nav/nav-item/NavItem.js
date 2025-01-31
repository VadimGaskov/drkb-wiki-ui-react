import "./NavItem.css";


const NavItem = ({text, img}) => {
    return(
        <div className="nav-item">
            <img src={img} />
                <span>{text}</span>
        </div>
    );
}

export default NavItem;
