import React from 'react'
import { Link } from 'react-router-dom'
import "./adminHeader.css"

const AdminHeader = () => {
    return (
        <div className="admin-header">
            <ul>
                <li><Link to="/books">Book Operations</Link></li>
            </ul>
        </div>
    )
}

export default AdminHeader
