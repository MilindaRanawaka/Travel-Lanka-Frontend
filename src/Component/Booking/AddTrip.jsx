import React from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { toast } from "react-toastify";
import { serverUrl, TOKEN_ID } from "../config";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default class UserHome extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      arrivalDate: "",
      departureDate: "",
      note: "",
      locations: "",
      hotelInfo: "",
      addedBy: "",
      locationsArr: [],
      hobbies: [],
    };
  }

  componentDidMount() {
    axios
      .get(serverUrl + "/locations/")
      .then((response) => {
        this.setState({
          locationsArr: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateInput(key, value) {
    this.setState({
      [key]: value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    console.log("this.state.hobbies");
    console.log(this.state.hobbies);

    const booking = {
      arrivalDate: this.state.arrivalDate,
      departureDate: this.state.departureDate,
      note: this.state.note,
      locations: this.state.hobbies,
      hotelInfo: this.menu.value,
      addedBy: localStorage.getItem(TOKEN_ID),
    };

    console.log(booking);
    console.log(booking.locations.length);

    axios
      .post(serverUrl + "/bookings/add", booking)
      .then((response) => {
        console.log(response);
        toast("Booking Added");
        this.setState({
          note: "",
          locations: "",
          hotelInfo: "",
          addedBy: "",
        });
      })
      .catch((error) => {
        console.log(error.response);
        toast("Booking Exists");
        this.setState({
          note: "",
          locations: "",
          hotelInfo: "",
          addedBy: "",
        });
      });
  }

  render() {
    return (
      <div className="container" style={{ paddingTop: 15 }}>
        <div className="d-flex justify-content-center h-100">
          <div className="card card-signup">
            <div className="card-header">
              <h3>Plan New Trip</h3>
            </div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <label className="control-label">Arrival Date</label>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-calendar-check" />
                    </span>
                  </div>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Event Date"
                    value={this.state.arrivalDate}
                    onChange={(e) =>
                      this.updateInput("arrivalDate", e.target.value)
                    }
                    required
                  />
                </div>
                <label className="control-label">Departure Date</label>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-calendar-check" />
                    </span>
                  </div>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Event Date"
                    value={this.state.departureDate}
                    onChange={(e) =>
                      this.updateInput("departureDate", e.target.value)
                    }
                    required
                  />
                </div>
                <label className="control-label">Location</label>
                {this.state.locationsArr.map((location) => (
                  <Grid key={location["_id"]} item xs={12} >
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={location.name}
                          value={location.name}
                        />
                      }
                      label={location.name}
                    />
                  </Grid>
                ))}

                <label className="control-label">Hotel Info</label>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-hotel" />
                    </span>
                  </div>
                  <select
                    className="form-control"
                    id="dropdown"
                    ref={(input) => (this.menu = input)}
                  >
                    <option value="1">One-star</option>
                    <option value="2">Two-star</option>
                    <option value="3">Three-star</option>
                    <option value="4">Four-star</option>
                    <option value="4">Five-star</option>
                  </select>
                </div>
                <label className="control-label">Note</label>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-id-card" />
                    </span>
                  </div>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Note"
                    value={this.state.note}
                    onChange={(e) => this.updateInput("note", e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-warning">
                  Add location
                </button>
              </form>
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}
