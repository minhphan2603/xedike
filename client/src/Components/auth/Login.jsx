import React, { useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import fingerprintjs from "fingerprintjs2";
import { connect } from "react-redux";
import { login } from "../../Store/Action/auth";

function Login({ onLoginSubmit, history }) {
  const initialState = {
    email: "",
    password: "",
    err: undefined
  };
  const [state, setstate] = useState(initialState);

  const onChangeInput = event => {
    setstate({ ...state, [event.target.name]: event.target.value });
  };

  const onSubmitForm = event => {
    event.preventDefault();
    onLoginSubmit(state, history);
  };
  const onTestPrivate = event => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    fingerprintjs.getV18({}, (fingerprint, component) => {
      axios({
        method: "get",
        url: "/api/user/",
        headers: { Authorization: token, fingerprint }
      })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    });
  };
  return (
    <div className="container text-left">
      <h1>LOG IN</h1>
      <Form>
        <span className="text-danger">
          {state.err ? "Email or Password wrong" : ""}
        </span>
        <FormGroup>
          <Label for="email">Email: </Label>
          <Input
            onChange={onChangeInput}
            name="email"
            type="email"
            id="email"
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password: </Label>
          <Input
            onChange={onChangeInput}
            name="password"
            type="password"
            id="password"
          />
        </FormGroup>
        <button onClick={onSubmitForm}>Submit</button> <br />
        <button onClick={onTestPrivate}>Test Private</button>
      </Form>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onLoginSubmit: (data, history) => dispatch(login(data, history))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
