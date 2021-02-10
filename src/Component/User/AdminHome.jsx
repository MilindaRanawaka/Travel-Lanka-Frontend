import React from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { toast } from "react-toastify";
import { serverUrl, TOKEN_ID } from "../config";

export default class AdminHome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locations: [],
    };
  }

  componentDidMount() {
    axios
      .get(serverUrl + "/locations/")
      .then((response) => {
        this.setState({
          locations: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteCategory(id) {
    axios.delete(serverUrl + "/locations/" + id).then((response) => {
      console.log(response);
      toast("Event Deleted");
      setTimeout(() => {
        window.location = "/admin";
      }, 5000);
    });
  }

  render() {
    return (
      <div className="container" style={{ paddingTop: 10 }}>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Location Name</th>
              <th>Description</th>
              <th>Location</th>
              <th>Location URL</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.locations.map((item) => {
              return (
                <tr key={item["_id"]}>
                  <td>{item["name"]}</td>
                  <td>{item["description"]}</td>
                  <td>{item["location"]}</td>
                  <td>{item["locationUrl"]}</td>
                  <td>
                    <a href={"/updatelocation/" + item["_id"]}>Edit</a>
                  </td>
                  <td>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a
                      onClick={(e) => this.deleteCategory(item["_id"])}
                      href="#"
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
