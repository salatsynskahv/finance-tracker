import Login from "@/components/Login";
import Multistep from "@/components/multistep/Multistep";
import DownloadFile from "@/components/DownloadFile";


export const HomePage = () => {


    return (<>
        <div className="home-page">
            <header>
                <div className="info">
                    <span>
                        Hello! I am your finance helper. I will help you to research your expenses and incomes.
                    </span>
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
               <Multistep/>
            </div>
        </div>
    </>);
}