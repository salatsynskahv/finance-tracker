import React, {useEffect, useState} from "react";
import Login from "@/components/Login";
import DownloadFile from "@/components/DownloadFile";
import {useAppStore} from "@/app/store/slice";
import {shallow} from "zustand/shallow";

const Multistep = () => {
    const [step, setStep] = useState(0);
    const handleNextStep = () => {

            setStep((prev) => prev + 1);

    };
    const defineStep = () => {
        switch (step) {
            case 0:
                return (<StepOne handleNextStep={handleNextStep}/>);
            case 1:
                return ( <DownloadFile/>);
        }
    }
    return (
        <div>
            <div className="multistep">
                <div className={(step === 0) ? "step-current" : 'step'}> Step 1</div>
                <div className="line"></div>
                <div className={(step === 1) ? "step-current" : 'step'}>Step 2</div>
            </div>

            {defineStep()}
        </div>
    );
}

const StepOne = ({handleNextStep}) => {
    const username = useAppStore(
        (state) => state.username, shallow);

    useEffect(() => {
        if(username){
            handleNextStep();
        }
    }, [username]);

    return (
        <div>
            <Login/>
        </div>
    )
}

export default Multistep;