import readXlsxFile from "read-excel-file";
import {useRef, useState} from "react";
import DownloadFile from "./DownloadFile";
import ConnectWithApi from "./ConnectWithApi";
import Login from "@/components/Login";


export const HomePage = () => {


    return (<>
        <div className="home-page">
            <header>
                <div className="info">
                    <span>
                        Hello! I am your finance helper. I will help you to research your expenses and incomes.
                    </span>
                    <Login/>
                </div>
            </header>
{/*Todo: imlement */}
            {/*<div className="column">*/}
            {/*    <h4>Provide data with Monobank API</h4>*/}
            {/*    <div className="content">*/}
            {/*        <ul>*/}
            {/*            <ConnectWithApi/>*/}
            {/*        </ul>*/}
            {/*    </div>*/}

            {/*</div>*/}
            <div className="column">
                <h4> Download Monobank generated stylesheet with expenses </h4>
                <div className="content">
                    <ul>
                        <li>
                            <DownloadFile/>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </>);
}