const DocList = ({ name }: { name: string }) => {
    return (
        <div className="doc-list">
            <img src='/assets/images/docs_icon.png' />
            <p className="doc-name">{name}</p>
        </div>
    )
}

export default DocList;