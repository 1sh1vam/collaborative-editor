import { useState } from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
    const location = useLocation();
    console.log('location', location);

    return (
        <div className="header">
            <div className="header-left">
                <img src="/assets/images/docs_icon.png" />
                {location.pathname === '/' ? <p className="header-title">Docs</p> : <FilenameInp />}
            </div>
        </div>
    )
}

const FilenameInp = () => {
    const [name, setName] = useState('');
    return (
        <input
            className="file-name-input"
            onChange={({ target }) => setName(target.value)}
            value={name}
        />
    )
}

export default Header;