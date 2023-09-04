import readXlsxFile from "read-excel-file";
import {useRef} from "react";
import DownloadFile from "./DownloadFile";
import ConnectWithApi from "./ConnectWithApi";


export const HomePage = () => {



    return (<>

        <div className="home-page">
            <div className="info">
                <p>
                    Hello! I am your finance helper. I will help you to research your expenses and incomes.
                </p>
            </div>
            <div className="column">
                <h4>Provide data with Monobank API</h4>
                <ul>
                    <ConnectWithApi/>
                </ul>

            </div>
            <div className="column">
                <h4>Download Monobank generated stylesheet with expenses</h4>
                <ul>
                    <li>
                      <DownloadFile/>
                    </li>
                </ul>

            </div>
        </div>
    </>);
}