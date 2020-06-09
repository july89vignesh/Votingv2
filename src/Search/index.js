import React, { Component } from "react";
import {
  Button,
  Input,
  Footer,
  Card,
  CardBody,
  CardImage,
  CardTitle,
  CardText
} from "mdbreact";

import "./style.css";

import votersList from "./voters.json";

class App extends Component {
  state = {
    search: "",
    members: []
  };

  renderVoters = members => {
    return (
      <div className="col-md-3" style={{ marginTop: "20px" }}>
        <Card>
          <CardBody>
            <p className="">
              <img src={members.profile} alt={members.name} />
            </p>
            <CardTitle title={members.name}>
              {members.name.substring(0, 15)}
              {members.name.length > 15 && "..."}
            </CardTitle>
            <div className="desc">
              <p>Text Goes here</p>
            </div>
            <div className="votes">
              <p className="vote-btn">No. of votes</p> {members.votes}
              <p>
                <button
                  key={members.code}
                  value={members.code}
                  onClick={this.handleClick}
                >
                  vote
                </button>
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  };

  componentDidMount() {
    this.setState({ members: votersList });
  }

  handleClick = e => {
    const updatedList = this.state.members.map(voter => {
      console.log(voter.code);

      if (voter.code === parseInt(e.target.value)) {
        return Object.assign({}, voter, {
          votes: voter.votes + 1
        });
      } else {
        //console.log(e.target.value);

        return voter;
      }
    });

    this.setState({
      members: updatedList.sort((a, b) => b.votes - a.votes)
    });
  };

  onchange = e => {
    this.setState({ search: e.target.value });
  };

  render() {
    const { search } = this.state;
    const filteredVoters = this.state.members.filter(members => {
      return members.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });

    return (
      <div className="flyout">
        <main style={{ marginTop: "4rem" }}>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <center>
                  <h3>Filter Names of voters here </h3>
                </center>
              </div>
              <div className="col">
                <Input
                  label="Search Voters"
                  icon="search"
                  onChange={this.onchange}
                />
              </div>
              <div className="col" />
            </div>
            <div className="row">
              {filteredVoters.map(members => {
                return this.renderVoters(members);
              })}
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
