import {useRef} from "react";
import readXlsxFile from "read-excel-file";

const DownloadFile = () => {

    const fileInputRef = useRef();

    const onInputFileChange = (e) => {
        readXlsxFile(e.target.files[0]).then(rows => {
            const rowsObj = rows.slice(20).map(row => {
                return {
                    'dateOfOperation': row[0],
                    'details': row[1],
                    'categoryCode': row[2],
                    'sum': row[3]
                }
            });
            // newRows.concat(rowsObj);

            rowsObj.forEach(
                row => {
                    defineCategory(row);
                }
            );
            groupByCategory(rowsObj);
            setRows(rowsObj);
        });

    }

    return <>
        <form action="">
            <label htmlFor="file-input">1. Select file with data and load</label>
            <input type="file" id="file-input" ref={fileInputRef} onChange={onInputFileChange}/>
        </form>
    </>
};

export default DownloadFile;