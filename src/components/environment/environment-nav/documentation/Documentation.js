import EnvironmentNav from "../EnvironmentNav";
import DocumentationElement from "./documentation-element/DocumentationElement";
import "./Documentation.css";
const Documentation = () => {
    return(
        <>
            <ul>
                <DocumentationElement title="Документ 1"/>
                <DocumentationElement title="Документ 2"/>
                <DocumentationElement title="Документ 3"/>
            </ul>
        </>
    )
}

export default Documentation;