import React from 'react'
import "./modal.css"

const Modal = ({title,message,handleDelete,setShowModal}) => {
    return (
        <div className="show-modal-container">
            <h3>{ title}</h3>
            <p>{message}</p>
            <div className="modal-buttons">
                <button id="modal-button-cancel" onClick={()=>setShowModal(false)}>Cancel</button>
                <button id="modal-button-ok" onClick={handleDelete}>Ok</button>
            </div>
        </div>
    )
}

export default Modal
