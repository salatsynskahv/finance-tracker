"use client"
import {useAppStore} from "@/app/store/slice";
import {useState} from "react";
import CategoryList from "@/components/CategoryList";
import AllList from "@/components/AllList";
import Tabs from "@/components/Tabs";
import {shallow} from "zustand/shallow";
import Statistics from "@/components/Statistics";

export default function Page() {
    const [tabState, setTabState] = useState([1, 0, 0]);
    const [allExpences, username] = useAppStore(
        (state) => [state.allExpences, state.username],
        shallow
    );


    function getTargetComponent() {
        return (
            tabState[0] && <CategoryList allExpences={allExpences}/> ||
            tabState[1] && <AllList allExpences={allExpences}/> ||
            tabState[2] && <Statistics/>
    )
    }

    return (
        <div>
            {/*{username}*/}
            <div className="center-container">
                <Tabs tabState={tabState} setTabState={setTabState}/>
            </div>
            <div className="d-flex">
                <div className="tabs-container">
                    {
                          getTargetComponent()
                    }
                </div>
            </div>

        </div>);
}