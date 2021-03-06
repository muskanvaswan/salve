import React from "react";
import Layout from "../src/components/Layout";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import fetch from "node-fetch";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { HOST_URL } from "../settings";
import axios from "axios";

export default class ConnectView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      interests: [],
      allInterests: [],
    };
  }

  async componentDidMount() {
    const interests = await fetch(
      `${HOST_URL}/chat/interests/`
    ).then((response) => response.json());
    console.log();
    this.setState({ allInterests: interests });
  }

  handleInputChange = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  handleSelect(index) {
    const interest = this.state.allInterests[index];
    if (!this.state.interests.includes(interest)) {
      this.setState((state) => ({
        interests: [...state.interests, interest],
      }));
    } else {
      let arr = this.state.interests;
      arr = arr.filter((item) => item !== interest);
      this.setState(() => ({
        interests: arr,
      }));
    }
  }

  submitInterests = () => {
    const interests = this.state.interests;
    if (!this.state.username) {
      alert("Please enter a username first");
      return;
    }
    if (this.state.interests.length < 1) {
      alert("You need to select at least one interest");
      return;
    }
    axios
      .post(`${HOST_URL}/chat/induct/`, {
        interests: interests,
      })
      .then((res) => {
        location.href = `/chat/${res['data']['channel']}`;
      });
    localStorage.setItem("username", this.state.username);
  };

  render() {
    return (
      <React.Fragment>
        <Layout short subtitle="Connect">
          <div className="flex flex-col items-center justify-center h-screen w-full">
            <div className="w-4/5">
              <h6>Select any name for yourself and any of he oprtions below that you relate to, or think that you might go through.</h6>
              <form className="flex-none w-full">
                <TextField
                  id="outlined-basic"
                  label="Username"
                  variant="filled"
                  required
                  value={this.username}
                  onChange={this.handleInputChange}
                  type="text"
                  placeholder="Enter your username"
                  className="flex-none text-black"
                  fullWidth
                  margin="normal"
                  autoComplete="off"
                />
              </form>
              <div className="flex flex-wrap justify-center flex-grow overflow-auto h-2/3 sm:h-auto w-full">
                {this.state.allInterests.map((element, index) => (
                  <div
                    key={index}
                    id={`choice-`}
                    className="w-full p-2 sm:p-4 sm:w-1/2 md:w-1/3"
                  >
                    <div>
                      <div
                        onClick={() => this.handleSelect(index)}
                        className={`cursor-pointer h-10 sm:h-20 justify-center items-center flex rounded-lg transition-colors duration-700 ${
                          this.state.interests.includes(element)
                            ? "bg-paper"
                            : "bg-paperLight"
                        }`}
                      >
                        {element}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="contained"
                color="primary"
                endIcon={<ArrowForwardIosIcon />}
                onClick={this.submitInterests}
                className="w-full"
              >
                Next
              </Button>
            </div>
          </div>
        </Layout>
      </React.Fragment>
    );
  }
}
