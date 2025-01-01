import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ role }) => {
    const links = {
        Admin: ["/admin", "/roles"],
        Coordinator: ["/coordinator", "/assign-labs"],
        Teacher: ["/teacher", "/classes"],
        LabAssistant: ["/labassistant", "/labs"],
        Student: ["/student", "/schedule"],
    };

    return (
        <aside className="sidebar">
            <ul>
                {links[role]?.map((link, index) => (
                    <li key={index}>
                        <Link to={link}>{link.replace('/', '')}</Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;