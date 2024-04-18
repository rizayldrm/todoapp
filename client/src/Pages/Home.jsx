import React, { useState, useEffect } from 'react'
import axios from 'axios'

document.title = "ToDo App"

const Home = () => {
    const [db, setDB] = useState([])

    useEffect(() => {
        renderItems()
    }, [])

    const renderItems = () => {
        axios.get("http://localhost:8080/api/listItems")
            .then(result => {
                setDB(result.data.db)
            }).catch(err => {
                console.error(err)
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        var nameInput = document.getElementById("name")
        var descInput = document.getElementById("description")

        axios.post("http://localhost:8080/api/newItem", {
            itemName: nameInput.value,
            itemDesc: descInput.value
        }).then(response => {
            renderItems()
        }).catch(err => {
            console.error("Error Message: " + err)
        })

    }

    const deleteItem = (e) => {
        axios.post("http://localhost:8080/api/deleteItem", {
            itemId: e.target.classList[2]
        }).then(response => {
            renderItems()
        }).catch(err => {
            console.error("Error Message: " + err)
        })
    }

    const searchItem = (e) => {
        var input, filter, tr, txtValue
        input = document.getElementById("searchInput")
        filter = input.value.toLowerCase()
        tr = document.getElementsByTagName("tr")

        for (var i = 0; i < tr.length; i++) {
            var tdName = tr[i].getElementsByTagName("td")[1] // name
            var tdDesc = tr[i].getElementsByTagName("td")[2] // desc
            if (tdDesc || tdName) {
                txtValue = tdName.textContent + tdDesc.textContent
                if (txtValue.toLowerCase().indexOf(filter) > -1) {
                    tr[i].style.display = ""
                } else {
                    tr[i].style.display = "none"
                }
            }
        }
    }
    return (
        <div className="d-flex align-items-center justify-content-center mt-5">
            <div className="container">
                <div className="card shadow">
                    <h5 className="card-header bg-primary text-light text-center">To Do List Uygulaması</h5>
                    <div className="card-header input-group">
                        <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Yeni Ekle</button>
                        <input type="search" className="form-control" placeholder='Ara...' onChange={searchItem} id='searchInput' />
                    </div>
                    <div className="card-body">
                        <div className="container">
                            <table className="table table-bordered table-striped" id='table'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>İsim</th>
                                        <th width="60%">Açıklama</th>
                                        <th width="10%">Düzenle</th>
                                    </tr>
                                </thead>
                                <tbody id='tbody'>
                                    {db.length > 0 ? db.map((item, index) => <tr key={index} id={`item-` + item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.itemName}</td>
                                        <td>{item.itemDescription}</td>
                                        <td>
                                            <div className="btn-group">
                                                <a href={`/editItem/${item.id}`} className="btn btn-primary">Düzenle</a>
                                                <button className={`btn btn-danger ` + item.id} onClick={deleteItem}>Sil</button>
                                            </div>
                                        </td>
                                    </tr>) : (<tr>
                                        <td colSpan={10} className="text-muted text-center">Hiç bir şey eklemediniz</td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Yeni Eleman</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit} method='post'>
                                <div className="mb-3">
                                    <label className="col-form-label">Başlık</label>
                                    <input type="text" className="form-control" id='name' name='name' placeholder='Bir isim ver...' />
                                </div>
                                <div className="mb-3">
                                    <label className="col-form-label">Açıklama</label>
                                    <textarea className="form-control" id='description' name='description' placeholder='Bir açıklama yazın...'>

                                    </textarea>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Kapat</button>
                                    <button type="submit" className="btn btn-primary">Ekle</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
