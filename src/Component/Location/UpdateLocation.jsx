import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {serverUrl, TOKEN_ID} from "../config";

toast.configure();

//New Location can create using This component
export default class UpdateLocation extends React.Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            locationName: "",
            locationDescription: "",
            locationLocation: "",
            locationImageUrl: "",
            addedBy: ""
        };
    }

    componentDidMount() {
        axios
            .get(serverUrl + "/locations/" + this.props.match.params.id)
            .then((response) => {
                console.log(response);
                this.setState({
                    locationName: response.data.location,
                    locationDescription: response.data.description,
                    locationLocation: response.data.location,
                    locationImageUrl: response.data.locationUrl,
                    addedBy: response.data.addedBy,
                });
            })
            .catch(function (error) {
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

        const locations = {
            locationName: this.state.locationName,
            locationDescription: this.state.locationDescription,
            locationLocation: this.state.locationLocation,
            locationUrl: this.state.locationImageUrl,
            addedBy: localStorage.getItem(TOKEN_ID)
        };

        console.log(locations)

        axios
            .post(serverUrl + "/locations/update/" + this.props.match.params.id, locations)
            .then((response) => {
                console.log(response);
                toast("Location Updated");
                this.setState({
                    locationName: "",
                    locationDescription: "",
                    locationLocation: "",
                    locationImageUrl: "",
                    addedBy: ""
                });
            })
            .catch((error) => {
                console.log(error.response);
                toast("Location Exists");
                this.setState({
                    locationName: "",
                    locationDescription: "",
                    locationLocation: "",
                    locationImageUrl: "",
                    addedBy: ""
                });
            });

    }

    render() {
        return (
            <div className="container" style={{paddingTop: 15}}>
                <div className="d-flex justify-content-center h-100">
                    <div className="card card-signup">
                        <div className="card-header">
                            <h3>Add Location</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit}>
                                <label className="control-label">Location Name</label>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fas fa-id-card" />
                                    </span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Location Name"
                                        value={this.state.locationName}
                                        onChange={(e) =>
                                            this.updateInput("locationName", e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <label className="control-label">Location Description</label>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fas fa-id-card" />
                                    </span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Location Description"
                                        value={this.state.locationDescription}
                                        onChange={(e) =>
                                            this.updateInput("locationDescription", e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <label className="control-label">Location</label>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fas fa-thumbtack" />
                                    </span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Location Location"
                                        value={this.state.locationLocation}
                                        onChange={(e) =>
                                            this.updateInput("locationLocation", e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <label className="control-label">Location URL</label>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      <i className="fas fa-link" />
                                    </span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Location URL"
                                        value={this.state.locationImageUrl}
                                        onChange={(e) =>
                                            this.updateInput("locationImageUrl", e.target.value)
                                        }
                                    />
                                </div>

                                <button type="submit" className="btn btn-warning">
                                    Update location
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