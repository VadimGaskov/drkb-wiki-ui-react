import ProgressBar from "../ProgressBar/ProgressBar";
import ErrorSnackbar from "../ErrorSnackbar/ErrorSnackbar";
import DefaultFox from "../../assets/img/foxes/list-environment-fox-min.svg";
import "./CommonTemplate1.css";
const CommonTemplate1 = ({ title, data, isLoading, error, renderItem, modal, FoxImg = DefaultFox}) => {
    return(
        <>
            <img src={FoxImg} alt="" className="common-template1-fox-img" />
            <h2>{title}</h2>
            <div className="list-environment-model">
                {modal}

                {isLoading && <ProgressBar />}

                {!isLoading && !error && (
                    <ul>{data.map(renderItem)}</ul>
                )}

                <ErrorSnackbar errorMessage={error} autoHideDuration={6000} />
            </div>
        </>
    )
}

export default CommonTemplate1;