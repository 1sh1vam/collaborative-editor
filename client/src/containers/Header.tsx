import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Docs } from "../App";
import useRequest from "../hooks/use-request";

interface State {
    docId?: string;
}

const Header = ({ docs } : { docs: Docs[] }) => {
    const location = useLocation();
    let doc;

    if (location.state) {
        const { docId: id } = location.state as State;
        doc = docs.find((data) => data.id === id);
    }

    return (
        <div className="header">
            <div className="header-left">
                <img src="/assets/images/docs_icon.png" />
                {location.pathname === '/' ? <p className="header-title">Docs</p> : <FilenameInp title={doc?.name} />}
            </div>
        </div>
    )
}

const FilenameInp = ({ title } : { title?: string }) => {
    const [name, setName] = useState(title || '');
    const { status, sendRequest } = useRequest();

    useEffect(() => {
        if (title) {
            setName(title);
        }
    }, [title])

    const saveName = () => {
        sendRequest({
            apiRoute: '/api/docs',
            method: 'patch',
            body: { name },
        })
    }
    return (
        <div className="file-input-container">
            <div className="hidden-file-name">{name}</div>
            <input
                className="file-name-input"
                onChange={({ target }) => setName(target.value)}
                value={name}
                onBlur={saveName}
            />
        </div>
    )
}

export default Header;