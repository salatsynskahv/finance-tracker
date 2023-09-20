import {useRef} from "react";
import {useRouter} from "next/navigation";
import {shallow} from "zustand/shallow";
import {useAppStore} from "@/app/store/slice";
import readXlsxFile from "read-excel-file";

const DownloadFile = () => {
    const fileInputRef = useRef();
    const router = useRouter();

    const [allExpences, initAllExpences] = useAppStore(
        (state) => [state.allExpences, state.initAllExpences],
        shallow
    );

    const onInputFileChange = (e) => {
        router.push('/dashboard');
        readXlsxFile(e.target.files[0]).then(rows => {
            const parsedRows = rows.slice(20).map(row => {
                return {
                    'dateOfOperation': row[0],
                    'details': row[1],
                    'categoryCode': row[2],
                    'sum': row[3]
                }
            });
            initAllExpences(parsedRows);
        });
    }


    return (<div className="download">
        <form action="">
            <label htmlFor="file-input">
                1. Select file with data and load
            </label>
            <input type="file"
                   id="file-input"
                   ref={fileInputRef}
                   accept=".xls"
                   onChange={onInputFileChange}
            />
        </form>
    </div>)
};

export default DownloadFile;