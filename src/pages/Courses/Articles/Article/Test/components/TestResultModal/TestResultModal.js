import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import HappyFox from "../../../../../../../assets/img/foxes/environment-fox-svg.svg";
import SadFox from "../../../../../../../assets/img/foxes/list-environment-fox-min.svg";
import {useEffect, useState} from "react";

const TestResultModal = ({trigger = false, testResult }) => {
    const [isOpen, setIsOpen] = useState(trigger)
    useEffect(() => {
        setIsOpen(trigger);
    }, [trigger]);

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} fullWidth>
            <DialogTitle>Результаты теста</DialogTitle>
            <DialogContent>
                <Typography className="modal-window-content-container">
                    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                        {testResult && (
                            <>
                                {testResult.isPassed ? (
                                    <>
                                        <h1>Тест успешно пройден!</h1>
                                        <img src={HappyFox} alt={"asd"} style={{marginTop: "1rem", marginBottom: "1rem"}}/>
                                        <h2>Количество набранных очков: {testResult.totalPoints} из {testResult.totalPointsRequired}</h2>
                                    </>
                                ) : (
                                    <>
                                        <h1>Тест не пройден!</h1>
                                        <img src={SadFox} alt={"asd"} width={"500"} style={{marginTop: "1rem", marginBottom: "1rem"}}/>
                                        <h2>Количество набранных очков: {testResult.totalPoints} из {testResult.totalPointsRequired}</h2>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => setIsOpen(false)} color="error">
                    Закрыть
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default TestResultModal;