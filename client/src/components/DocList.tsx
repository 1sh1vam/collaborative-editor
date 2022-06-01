import React from "react";

interface Props {
    name: string;
    onClick(e: React.SyntheticEvent): void;
}

const DocList = ({ name, ...props }: Props) => {
    return (
        <div {...props} className="doc-list">
            <img src='/assets/images/docs_icon.png' />
            <p className="doc-name">{name}</p>
        </div>
    )
}

export default DocList;