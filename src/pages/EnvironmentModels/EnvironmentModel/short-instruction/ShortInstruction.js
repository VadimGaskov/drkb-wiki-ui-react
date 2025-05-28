
import QuillTextEditor from "./_components/QuillTextEditor";
import CommonModalWindow from "../../../../components/ModalWindow/CommonModalWindow";
import ShowInstructionModal from "./_components/ShowInstructionModal/ShowInstructionModal";
import {Button} from "@mui/material";
import {useContext, useState} from "react";
import {EnvironmentModelContext} from "../../../../context/EnvironmentModelContext";
import "./ShortInstruction.css";
import {downloadFileHelper} from "../../../../utils/donwloadFileHelper";

const ShortInstruction = () => {
    const [isOpen, setIsOpen] = useState(false);
    const environmentModel = useContext(EnvironmentModelContext);
    const handleDownload = () => {
        downloadFileHelper(environmentModel?.shortInstructionQrCode, `QR код для ${environmentModel?.name}`)
    };

    return(
        <div className={"short-instruction-wrapper"}>
            <ShowInstructionModal open={isOpen} onClose={() => setIsOpen(false)} />
            <Button
                variant={"contained"}
                onClick={() => setIsOpen(true)}
                sx={{width: "100%"}}
            >
                Открыть инструкцию
            </Button>
            {environmentModel && (
                <img
                    src={`data:image/png;base64,${environmentModel?.shortInstructionQrCode}`}
                    style={{ width: "400px", height: "400px", margin: "2rem"}}
                    alt={"QR-кода для этой инструкции нет("}
                />
            )}
            <Button
                onClick={handleDownload}
                variant={"contained"}
                color={"success"}
            >
                Скачать QR-код
            </Button>
            {/*<QuillTextEditor />*/}
        </div>

    );
}

export default ShortInstruction;