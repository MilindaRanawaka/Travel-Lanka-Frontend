import React, { Component } from "react";
import ParticlesBg from "particles-bg";
import "./CovidDashboard.css";

export default class CovidDashboard extends Component {
  state = {
    loading: true,
    update_date_time: null,
    local_new_cases: null,
    local_total_cases: null,
    local_active_cases: null,
    local_total_number_of_individuals_in_hospitals: null,
    local_deaths: null,
    local_new_deaths: null,
    local_recovered: null,
    global_new_cases: null,
    global_total_cases: null,
    global_deaths: null,
    global_new_deaths: null,
    global_recovered: null,
  };

  async componentDidMount() {
    const url = "https://hpb.health.gov.lk/api/get-current-statistical";

    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      update_date_time: data.data.update_date_time,
      local_new_cases: data.data.local_new_cases,
      local_total_cases: data.data.local_total_cases,
      local_active_cases: data.data.local_active_cases,
      local_total_number_of_individuals_in_hospitals:
        data.data.local_total_number_of_individuals_in_hospitals,
      local_deaths: data.data.local_deaths,
      local_new_deaths: data.data.local_new_deaths,
      local_recovered: data.data.local_recovered,
      global_new_cases: data.data.global_new_cases,
      global_total_cases: data.data.global_total_cases,
      global_deaths: data.data.global_deaths,
      global_new_deaths: data.data.global_new_deaths,
      global_recovered: data.data.global_recovered,
      loading: false,
    });
    console.log(data);
  }

  render() {
    return (
      <div>
        <div className="bubbles">
          {" "}
          <ParticlesBg type="color" bg={true} />
        </div>

        {this.state.loading || !this.state.update_date_time ? (
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <h3>Sri Lanka</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <div className="card text-white bg-primary">
                  <h5 className="card-header">New Cases</h5>
                  <div className="card-body">
                    <p className="card-text">{this.state.local_new_cases}</p>
                  </div>
                  <div className="card-footer">
                    Last updated {this.state.update_date_time}
                  </div>
                </div>
                <br />
              </div>

              <div className="col-md-3">
                <div className="card text-white bg-warning">
                  <h5 className="card-header">Total Cases</h5>
                  <div className="card-body">
                    <p className="card-text">{this.state.local_total_cases}</p>
                  </div>
                  <div className="card-footer">
                    Last updated {this.state.update_date_time}
                  </div>
                </div>
                <br />
              </div>
              <div className="col-md-3">
                <div className="card text-white bg-danger">
                  <h5 className="card-header bg-danger">Deaths</h5>
                  <div className="card-body">
                    <p className="card-text">{this.state.local_deaths}</p>
                  </div>
                  <div className="card-footer">
                    Last updated {this.state.update_date_time}
                  </div>
                </div>
                <br />
              </div>
              <div className="col-md-3">
                <div
                  className="card text-white"
                  style={{ "background-color": "#7D10CC" }}
                >
                  <h5 className="card-header">Active Cases</h5>
                  <div className="card-body">
                    <p className="card-text">{this.state.local_active_cases}</p>
                  </div>
                  <div className="card-footer">
                    Last updated {this.state.update_date_time}
                  </div>
                </div>
                <br />
              </div>
            </div>

            <br />
            <br />
            <div className="row">
              <div className="col-md-4">
                <div className="card text-white bg-success">
                  <h5 className="card-header">Recovered</h5>
                  <div className="card-body">
                    <p className="card-text">{this.state.local_recovered}</p>
                  </div>
                  <div className="card-footer">
                    Last updated {this.state.update_date_time}
                  </div>
                </div>
                <br />
              </div>
              <div className="col-md-4">
                <div className="card text-white bg-danger">
                  <h5 className="card-header">New Deaths</h5>
                  <div className="card-body">
                    <p className="card-text">{this.state.local_new_deaths}</p>
                  </div>
                  <div className="card-footer">
                    Last updated {this.state.update_date_time}
                  </div>
                </div>
                <br />
              </div>
              <div className="col-md-4">
                <div className="card text-white bg-info">
                  <h5 className="card-header">
                    Suspicious Patients in Hospitals
                  </h5>
                  <div className="card-body">
                    <p className="card-text">
                      {
                        this.state
                          .local_total_number_of_individuals_in_hospitals
                      }
                    </p>
                  </div>
                  <div className="card-footer">
                    Last updated {this.state.update_date_time}
                  </div>
                </div>
                <br />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12"></div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
