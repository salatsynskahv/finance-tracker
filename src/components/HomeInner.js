import Tabs from "./Tabs";
import CategoryList from "./CategoryList";
import AllList from "./AllList";
import {useState} from "react";
import {signInWithPopup } from "firebase/auth";
import {auth, provider} from "../firebase";


const HomeInner = ({categoriesToCode}) => {
    const categoryNames = categoriesToCode.map(item => item.name);
    categoryNames.push('Other');
    console.log(categoriesToCode);
    const sumByCategories = {}
    categoryNames.forEach(category => sumByCategories[category] = 0);
    console.log(sumByCategories);

    const [userName, setUserName] = useState();
    const [groupedByCategory, setGroupedByCategory] = useState([]);
    const [tabState, setTabState] = useState([1, 0]);

    const handleGoogleLogin = () => {
        signInWithPopup(auth, provider).then(
            (data) => {
                setUserName(data.user.email);
            }
        )

    }

    return (
        <>
            <header>
                <button onClick={() => handleGoogleLogin()}> Login </button>
                {userName}
                <input type="file" id="file-input" ref={fileInputRef} onChange={onInputFileChange}/>
            </header>
            <div className="center-container">
                <Tabs tabState={tabState} setTabState={setTabState}/>
            </div>
                <div className="tabs-container">
                    {
                        tabState[0] ?
                            <CategoryList groupedByCategory={groupedByCategory}
                                          changeCategory={changeCategory}
                                          categoryNames={categoryNames}/> :
                            <AllList rows={rows}/>
                    }
                </div>
        </>

    )

}

export default HomeInner;