import Tabs from "./Tabs";
import CategoryList from "./CategoryList";
import AllList from "./AllList";
import {useState} from "react";
import CreateCategory from "./CreateCategory";
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
    const [rows, setRows] = useState([]);
    const [groupedByCategory, setGroupedByCategory] = useState([]);
    const [tabState, setTabState] = useState([1, 0]);

    const handleGoogleLogin = () => {
        signInWithPopup(auth, provider).then(
            (data) => {
                setUserName(data.user.email);
            }
        )

    }

    const defineCategory = (row) => {
        const category = categoriesToCode.find(({codes}) => {
            return codes.includes(row.categoryCode);
        });
        console.log(category);
        row['categoryName'] = category ? category.name : 'Other';
    }


    const groupByCategory = (rowsObj) => {
        console.log(rowsObj);
        const groupedRows = rowsObj.reduce((x, y) => {
            (x[y.categoryName] = x[y.categoryName] || []).push(y);
            return x;

        }, {});

        let groupedRowsValue = Object.entries(groupedRows).map(item => {
            const sum = item[1].reduce((acc, value) => acc + value.sum, 0);
            item.push(sum.toFixed(2));
            console.log(item)
            return item;
        }).sort((a, b) => a[2] - b[2]);
        console.log(groupedRowsValue);
        setGroupedByCategory(groupedRowsValue);
    }
    //
    // const input = document.getElementById('file-input')
    // input.addEventListener('change', () => {
    //     readXlsxFile(input.files[0]).then((rows) => {
    //         // `rows` is an array of rows
    //         // each row being an array of cells.
    //     })
    // })
    //todo: rewrite
    const changeCategory = (e, paymentItem) => {
        e.preventDefault();
        const newRows = rows.map(item => {
            if (item.dateOfOperation === paymentItem.dateOfOperation && item.details === paymentItem.details) {
                item.categoryName = paymentItem.categoryName;
                item.categoryCode = categoriesToCode.find(item => item.name === paymentItem.categoryName);
            }
            return item;

        });
        groupByCategory(newRows);
        setRows(newRows);
    }


    const addCategory = (categoryName) => {
        // categoriesToCode.
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
            <div className="d-flex">
                <div className="create-category">
                    <CreateCategory/>
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
            </div>
        </>

    )

}

export default HomeInner;