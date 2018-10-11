import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class RentParkingSpot extends Component {
    constructor() {
        super()
        this.state = {
            licensePlate: '',
            model: '',
            date: '',
            time: '',
            redirectTo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    // confirm with jolie
    handleSubmit(event) {
        event.preventDefault();
        console.log("handleSubmit");

        axios.post("/api" + window.location.pathname, {
            licensePlate: this.state.licensePlate,
            model: this.state.model,
            date: this.state.date,
            time: this.state.time
        })
        .then(response => {
            console.log('Renters info: ');
            console.log(response);
            if(response === 200) {
                console.log("Post Sent")
                this.setState({
                    redirectTo: "/"
                })
            }
        }).catch(error => {
            console.log("Post error: ");
            console.log(error);
        });
    };

    // React render function
    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div>
                    <div className="rentParkingSpotForm">
                        <form>
                            <div className="form__container">

                                <h1 className="heading-primary">
                                    <span className="heading-primary--form left">Reserve your spot</span>
                                </h1>

                                <div className="form__group">
                                    <input className="form__input"
                                        type="text"
                                        id="licensePlate"
                                        name="licensePlate"
                                        placeholder="License plate number"
                                        value={this.state.licensePlate}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form__group">
                                    <input className="form__input"
                                        type="text"
                                        id="model"
                                        name="model"
                                        placeholder="Car model"
                                        value={this.state.carModel}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form__group">
                                    <input className="form__input"
                                        type="text"
                                        id="date"
                                        name="date"
                                        placeholder="MM/DD/YYYY"
                                        value={this.state.date}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form__group">
                                    <input className="form__input"
                                        type="text"
                                        id="time"
                                        name="time"
                                        placeholder="HH:MM"
                                        value={this.state.time}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form__group">
                                    <input
                                        className="btn btn--form"
                                        type="submit"
                                        value="Submit"
                                        onClick={this.handleSubmit}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
    }
}

export default RentParkingSpot;