"use client"
import {useAppStore} from "@/app/store/slice";
import {useEffect, useState} from "react";
import axios from "axios";
import CategoryList from "@/components/CategoryList";
import AllList from "@/components/AllList";
import Tabs from "@/components/Tabs";
import CreateCategory from "@/components/CreateCategory";
import {shallow} from "zustand/shallow";

export default function Page() {
    const [tabState, setTabState] = useState([1, 0]);
    const [allExpences, username] = useAppStore(
        (state) => [state.allExpences, state.username],
        shallow
    );


    return (
        <div>
            {/*{username}*/}
            <div className="center-container">
                <Tabs tabState={tabState} setTabState={setTabState}/>
            </div>
            <div className="d-flex">
                <div className="tabs-container">
                    {
                          tabState[0] ?
                                <CategoryList allExpences={allExpences}/> :
                                <AllList allExpences={allExpences}/>

                    }
                </div>
            </div>

        </div>);
}