import React, { Component } from "react";
import { Table } from "reactstrap";
import axios from "axios";

class ManageCategories extends Component {
  state = {
    nama: null,
    listCategory: [],
    selectedEdit: 0
  };

  componentDidMount = () => {
    this.getCategoryList();
  };

  getCategoryList = () => {
    axios
      .get("http://localhost:1990/kategori/getlistkategori")
      .then(res => {
        console.log(res.data);
        this.setState({ listCategory: res.data, selectedEdit: 0 });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleAddClick = event => {
    var namakategori = this.state.nama;

    axios
      .post("http://localhost:1990/kategori/addkategori", {
        namakategori
      })
      .then(res => {
        this.getCategoryList();
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleSaveClick = id => {
    var nama = this.state.nama;

    axios
      .put("http://localhost:1990/kategori/editkategori/" + id, {
        nama
      })
      .then(res => {
        this.getCategoryList();
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleDeleteClick = id => {
    if (window.confirm("Yakin dihapus?")) {
      axios
        .delete("http://localhost:1990/kategori/deletekategori/" + id)
        .then(res => {
          this.getCategoryList();
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  renderCategory = () => {
    var listJSXCategory = this.state.listCategory.map(item => {
      if (this.state.selectedEdit === item.id) {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>
              <input
                type="text"
                name="nama"
                onChange={this.handleChange}
                defaultValue={item.nama}
              />
            </td>
            <td>
              <input
                className="btn btn-primary"
                type="button"
                value="Save"
                onClick={() => this.handleSaveClick(item.id)}
              />
            </td>
            <td>
              <input
                className="btn btn-danger"
                type="button"
                value="Cancel"
                onClick={() => this.setState({ selectedEdit: 0 })}
              />
            </td>
          </tr>
        );
      }
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.nama}</td>
          <td>
            <input
              className="btn btn-primary"
              type="button"
              value="Edit"
              onClick={() => this.setState({ selectedEdit: item.id })}
            />
          </td>
          <td>
            <input
              className="btn btn-danger"
              type="button"
              value="Delete"
              onClick={() => this.handleDeleteClick(item.id)}
            />
          </td>
        </tr>
      );
    });
    return listJSXCategory;
  };

  render() {
    const hStyle = {
      textAlign: "center",
      paddingTop: "50px"
    };
    return (
      <div>
        <h1 style={hStyle}>Category List</h1>
        <div>
          <Table bordered>
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th>ID</th>
                <th>Nama</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>{this.renderCategory()}</tbody>
            <tfoot>
              <td />
              <td>
                <input
                  type="text"
                  name="nama"
                  placeholder="Nama Kategori"
                  onChange={this.handleChange}
                />
              </td>
              <td>
                <input
                  type="button"
                  className="btn btn-success"
                  value="Add"
                  onClick={this.handleAddClick}
                />
              </td>
            </tfoot>
          </Table>
        </div>
      </div>
    );
  }
}

export default ManageCategories;
