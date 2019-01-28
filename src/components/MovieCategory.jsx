import React, { Component } from "react";
import { Table } from "reactstrap";
import axios from "axios";

class MovieCategory extends Component {
  state = {
    namaMovie: null,
    namaCategory: null,
    listMovieCategory: [],
    selectedEdit: 0
  };

  componentDidMount = () => {
    this.getMovieCategoryList();
  };

  getMovieList = () => {
    axios
      .get("http://localhost:1990/movie/getlistmovie")
      .then(res => {
        console.log(res.data);
        this.setState({ namaMovie: res.data.nama, selectedEdit: 0 });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getMovieCategoryList = () => {
    axios
      .get("http://localhost:1990/movcat/getlistmovicategory")
      .then(res => {
        console.log(res.data);
        this.setState({ listMovieCategory: res.data, selectedEdit: 0 });
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
      .post("http://localhost:1990/movcat/addmovicategory", {
        namakategori
      })
      .then(res => {
        this.getMovieCategoryList();
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleDeleteClick = id => {
    if (window.confirm("Yakin dihapus?")) {
      axios
        .delete("http://localhost:1990/movcat/deletemovicategory/" + id)
        .then(res => {
          this.getMovieCategoryList();
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  renderMovieCategory = () => {
    var listJSXMoviCat = this.state.listMovieCategory.map(item => {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.namamovie}</td>
          <td>{item.namacategory}</td>
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
    return listJSXMoviCat;
  };

  renderMovie = () => {
    var listMovie = this.state.listMovie.map(item => {
      return (
        <select key={item.id}>
          <option>{item.nama}</option>
        </select>
      );
    });
    return listMovie;
  };

  render() {
    const hStyle = {
      textAlign: "center",
      paddingTop: "50px"
    };

    return (
      <div>
        <h1 style={hStyle}>Connection List</h1>
        <div>
          <Table bordered>
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th>Nama Movie</th>
                <th>Nama Category</th>
                <th />
              </tr>
            </thead>
            <tbody>{this.renderMovieCategory()}</tbody>
            <tfoot>
              <td>
                <select name="movie" onChange={this.handleChange}>
                  <option>coba</option>
                </select>
              </td>
              <td>
                <select name="movie" onChange={this.handleChange}>
                  <option>coba</option>
                </select>
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

export default MovieCategory;
