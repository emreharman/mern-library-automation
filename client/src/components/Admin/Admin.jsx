import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
    return (
        <div>
            <div style={{display:"flex",justifyContent:"center",marginTop:"2rem"}}>
                <Link to="/admin/add-book">Add Book</Link>
            </div>
        </div>
    )
}

export default Admin
