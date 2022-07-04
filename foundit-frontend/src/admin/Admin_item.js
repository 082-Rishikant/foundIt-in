import React, { useContext } from 'react'
import Itemcontext from '../context APIs/items/Itemcontext';

function Admin_item(props) {
  const context = useContext(Itemcontext);
  const { deleteItem } = context;
  const { _id, name, type, place, date, isreported, status, image_name , user_name} = props.item;
  return (
    <>
      <tr>
        <th scope="row">{props.cnt}</th>
        <td>{name}</td>
        <td>{user_name}</td>
        <td>{type}</td>
        <td>{place}</td>
        <td>{date.slice(0, 10)}</td>
        <td>{isreported ? "Yes" : "No"}</td>
        <td>{status}</td>
        <td>
          {<img src={`http://localhost:5000/item-img/${image_name}`}
            className="card-img-top rounded" alt="course"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "http://localhost:5000/item-img/default.png";
            }} style={{ "width": 50, "height": 50 }} />}
        </td>
        <td>
          <span className="h6 fw-light mb-0">
            <button type="button" onClick={() => {
              let flag = window.confirm("Do you realy want to delete this Item?");
              if (flag) {
                let a = deleteItem(_id);
                a.then((d) => {
                  if (d) {
                    props.showAlert("Item deleted successfully", 'success');
                  }
                })
              }
            }} className="btn btn-light btn-lg p-0">
              <i className="bi bi-trash"></i>
            </button>
          </span>
        </td>
      </tr>


    </>
  )
}

export default Admin_item