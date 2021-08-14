import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
    return (
        <div>
            <h1>admin panel</h1>
            <div>
                <Link to="/admin/add-book">Add Book</Link>
            </div>
        </div>
    )
}

export default Admin
