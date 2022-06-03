import React, { useEffect, useRef, useState } from "react";
import DocList from "../components/DocList";
import { useNavigate } from "react-router-dom";
import useRequest from "../hooks/use-request";
import { Docs } from "../App";

interface DocCreateData {
    id: string;
}

interface Props {
    docs: Docs[];
    setDocs(param: Docs[]):void
}


const DocsContainer = ({ docs, setDocs }: Props) => {
    const navigate = useNavigate();
    const { status, sendRequest } = useRequest();
    const mountedRef = useRef(false);

    useEffect(() => {
        if (!mountedRef.current) {
            mountedRef.current = true;
            sendRequest({ apiRoute: '/api/docs', from: 'getDocs', method: 'get', body: {}, onSuccess: (data: Docs[]) => {
                setDocs(data)
            } });
        }
    }, [])


    const handleNewDoc = (e: React.SyntheticEvent) => {
        sendRequest({ apiRoute: '/api/docs', from: 'newDoc', method: 'post', body: {}, onSuccess: (data: DocCreateData) => {
            navigate(`/documents/${data.id}`)
        } });
    }

    return (
        <div  className="docs-container">
            <div className="docs-top">
                <div className="docs-top-main">
                    <p className="new-doc-title">Start a new document</p>
                    <div className="new-doc" onClick={handleNewDoc}>
                        <img src="/assets/images/docs-blank-googlecolors.png" />
                    </div>
                    {status.current === 'newDoc' && status.error && <p className="error-text">{status.message}</p>}
                </div>
            </div>
            <div className="docs-items-container">
                <p className="doc-items-title">Documents</p>
                <div className="doc-items">
                    {status.current === 'getDocs' && status.error && <p className="error-text">{status.message}</p>}
                    {docs.map((doc) => <DocList onClick={() => navigate(`/documents/${doc.id}`)} name={doc.name} />)}
                </div>
            </div>
        </div>
    )
}

export default DocsContainer;