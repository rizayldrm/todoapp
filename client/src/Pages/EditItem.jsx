import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const EditItem = () => {

  const [itemName, setItemName] = useState("")
  const [itemDesc, setItemDesc] = useState("")
  const [message, setMessage] = useState("")

  const { id } = useParams()

  useEffect(() => {
    axios.get("http://localhost:8080/api/listItems/" + id)
      .then(response => {
        var resData = response.data.db[0]
        setItemName(resData.itemName)
        setItemDesc(resData.itemDescription)
      }).catch(err => {
        console.error(err)
      })
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:8080/api/editItem/" + id, {
      itemName: itemName,
      itemDesc: itemDesc
    }).then(response => {
      setMessage(response.data.message)
      const modal = document.getElementById("modal")
      modal.classList.add("show")
    }).catch(err => {
      console.error(err)
    })


  }

  return (
    <div className='container mt-3'>
      <div className="card shadow">
        <div className="card-header">Ürün Düzenle</div>
        <div className="card-body">
          <form onSubmit={handleSubmit} >
            <label htmlFor="name">Eleman İsmi</label><br />
            <input type="text" className="form-control" id='name' value={itemName} onChange={e => setItemName(e.target.value)} />
            <hr />
            <label htmlFor="description">Açıklama</label>
            <textarea name="description" id="description" cols="30" rows="5" value={itemDesc} onChange={e => setItemDesc(e.target.value)} className='form-control'>

            </textarea>
            <hr />
            <div className="btn-group">
              <a href='/' className="btn bg-body border">Vazgeç</a>
              <button className="btn btn-success" data-bs-target="#modal" data-bs-toggle="modal">Kaydet</button>
            </div>
          </form>
        </div>
      </div>
      <div className="modal fade" id='modal'>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Mesaj</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>{message}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Geri</button>
              <a href='/' type="button" className="btn btn-primary">Ana Menü</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditItem
