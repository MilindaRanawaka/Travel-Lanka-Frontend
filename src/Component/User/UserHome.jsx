import React from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { toast } from "react-toastify";
import { serverUrl, TOKEN_ID } from "../config";

export default class UserHome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    axios
      .get(serverUrl + "/bookings/")
      .then((response) => {
        this.setState({
          events: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteCategory(id) {
    axios.delete(serverUrl + "/bookings/" + id).then((response) => {
      console.log(response);
      toast("Event Deleted");
      setTimeout(() => {
        window.location = "/user";
      }, 5000);
    });
  }

  render() {
    return (
      <div className="container" style={{ paddingTop: 10 }}>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Arrival Date</th>
              <th>Departure Date</th>
              <th>Location</th>
              <th>Hotel Info</th>
              <th>Note</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.events
              .filter(
                (item) => item["addedBy"] === localStorage.getItem(TOKEN_ID)
              )
              .map((item) => {
                return (
                  <tr key={item["_id"]}>
                    <td>
                      {new Intl.DateTimeFormat("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                        hour: "numeric",
                        minute: "numeric",
                      }).format(new Date(item["arrivalDate"]))}
                    </td>
                    <td>
                      {new Intl.DateTimeFormat("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                        hour: "numeric",
                        minute: "numeric",
                      }).format(new Date(item["departureDate"]))}
                    </td>
                    <td>{item["locations"]}</td>
                    <td>{item["hotelInfo"]}</td>
                    <td>{item["note"]}</td>
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
