import React, { Component } from "react";
import axios from "axios";
import { Table } from "reactstrap";

class ManageMovies extends Component {
  state = {
    nama: null,
    tahun: null,
    deskripsi: null,
    listMovie: [],
    selectedEdit: 0
  };

  componentDidMount = () => {
    this.getMovieList();
  };

  getMovieList = () => {
    axios
      .get("http://localhost:1990/movie/getlistmovie")
      .then(res => {
        console.log(res.data);
        this.setState({ listMovie: res.data, selectedEdit: 0 });
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

  handleClick = event => {
    var namamovie = this.state.nama;
    var tahun = this.state.tahun;
    var deskripsi = this.state.deskripsi;

    axios
      .post("http://localhost:1990/movie/addmovie", {
        namamovie,
        tahun,
        deskripsi
      })
      .then(res => {
        this.getMovieList();
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleSaveClick = id => {
    var nama = this.state.nama;
    var tahun = this.state.tahun;
    var description = this.state.deskripsi;

    axios
      .put("http://localhost:1990/movie/editmovie/" + id, {
        nama,
        tahun,
        description
      })
      .then(res => {
        this.getMovieList();
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleDeleteClick = id => {
    if (window.confirm("Yakin dihapus?")) {
      axios
        .delete("http://localhost:1990/movie/deletemovie/" + id)
        .then(res => {
          this.getMovieList();
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  renderMovie = () => {
    var listJSXMovie = this.state.listMovie.map(item => {
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
                type="number"
                name="tahun"
                onChange={this.handleChange}
                defaultValue={item.tahun}
              />
            </td>
            <td>
              <input
                type="text"
                name="deskripsi"
                onChange={this.handleChange}
                defaultValue={item.description}
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
          <td>{item.tahun}</td>
          <td>{item.description}</td>
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
    return listJSXMovie;
  };

  render() {
    const hStyle = {
      textAlign: "center",
      paddingTop: "50px"
    };

    return (
      <div>
        <h1 style={hStyle}>Movie List</h1>
        <div>
          <Table bordered>
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th>ID</th>
                <th>Nama</th>
                <th>Tahun</th>
                <th>Description</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>{this.renderMovie()}</tbody>
            <tfoot>
              <td />
              <td>
                <input
                  type="text"
                  name="nama"
                  placeholder="Nama Movie"
                  onChange={this.handleChange}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="tahun"
                  placeholder="Tahun"
                  onChange={this.handleChange}
                />
              </td>
              <td>
                <textarea
                  type="text"
                  name="deskripsi"
                  placeholder="Enter the Description here"
                  onChange={this.handleChange}
                />{" "}
                />
              </td>
              <td>
                <input
                  type="button"
                  className="btn btn-success"
                  value="Add"
                  onClick={this.handleClick}
                />
              </td>
            </tfoot>
          </Table>
        </div>
      </div>
    );
  }
}

export default ManageMovies;
