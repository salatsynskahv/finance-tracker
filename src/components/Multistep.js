import {useEffect, useState} from "react";
import Login from "@/components/Login";
import DownloadFile from "@/components/DownloadFile";
import {useAppStore} from "@/app/store/slice";
import {shallow} from "zustand/shallow";
import ParseXlsFile from "@/components/ParseXlsFile";
import {useRouter} from "next/navigation";

function Multistep ()  {
    const [step, setStep] = useState(0);
    const handleNextStep = () => {

        setStep((prev) => prev + 1);

    };
    const defineStep = () => {
        switch (step) {
            case 0:
                return (<StepOne handleNextStep={handleNextStep}/>);
            case 1:
                return (<StepTwo/>);
        }
    }
    return (
        <div className="multistep-container">
            <div className="multistep">
                <div className="line"></div>
                <div className={(step === 0) ? "step-current" : 'step'}> Step 1</div>
                <div className="line"></div>
                <div className={(step === 1) ? "step-current" : 'step'}>Step 2</div>
                <div className="line"></div>
            </div>
            {defineStep()}
        </div>
    );
}

const StepOne = ({handleNextStep}) => {
    const username = useAppStore(
        (state) => state.username, shallow);

    useEffect(() => {
        if (username) {
            handleNextStep();
        }
    }, [username]);

    return (
        <div>
            <h4>Please, login with Google to manage categories</h4>
            <Login/>
        </div>
    )
}

const StepTwo = () => {
    const initAllExpences = useAppStore((state) => state.initAllExpences, shallow);
    const router = useRouter();
    const loadDemoData = async () => {
        const response = await fetch('/demo/demo.xlsx');
        const data = await response.arrayBuffer();
        ParseXlsFile(data, initAllExpences);
        router.push('/dashboard');
    }
    return (
        <div className="step-two-container">
            <div className="download-data">
                <DownloadFile/>
            </div>

            <div className="demo">
                <p>For Demo purpose use prepared data</p>
                <button type="button" onClick={loadDemoData} className="btn">Load Demo Data</button>
            </div>
        </div>
    )

}

export default Multistep;