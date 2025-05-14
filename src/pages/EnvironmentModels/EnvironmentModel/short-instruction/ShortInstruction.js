
import QuillTextEditor from "./_components/QuillTextEditor";
import CommonModalWindow from "../../../../components/ModalWindow/CommonModalWindow";
import ShowInstructionModal from "./_components/ShowInstructionModal/ShowInstructionModal";
import {Button} from "@mui/material";
import {useState} from "react";
const ShortInstruction = () => {
    const [isOpen, setIsOpen] = useState(false);
    return(
        <>
            {/*<video src={video} controls width="600" />
            <span>asdasdasds asdasd</span>*/}
            <ShowInstructionModal open={isOpen} onClose={() => setIsOpen(false)} />
            <Button variant={"contained"} onClick={() => setIsOpen(true)}>Открыть</Button>
            {/*<QuillTextEditor />*/}
        </>

    );
}

export default ShortInstruction;