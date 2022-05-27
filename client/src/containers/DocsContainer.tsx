import React from "react";
import DocList from "../components/DocList";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";

const DocsContainer = () => {
    const names = ['First Doc', 'Hello there', 'Untitled']
    const navigate = useNavigate();
    const handleNewDoc = (e: React.SyntheticEvent) => {
        navigate(`/documents/${uuidv4()}`)
    }
    return (
        <div className="docs-container">
            <div className="docs-top">
                <div className="docs-top-main">
                    <p className="new-doc-title">Start a new document</p>
                    <div className="new-doc" onClick={handleNewDoc}>
                        <img src="/assets/images/docs-blank-googlecolors.png" />
                    </div>
                </div>
            </div>
            <div className="docs-items-container">
                <p className="doc-items-title">Documents</p>
                <div className="doc-items">
                    {names.map((name) => <DocList name={name} />)}
                </div>
            </div>
        </div>
    )
}

export default DocsContainer;