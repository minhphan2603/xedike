import React, { useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { register } from "../../Store/Action/auth";
import { connect } from "react-redux";
function Register({ register, error, history }) {
  const initialState = {
    email: "",
    password: "",
    password2: "",
    fullName: "",
    phone: "",
    DOB: "",
    userType: ""
  };
  const [state, setstate] = useState(initialState);

  const onChangeInput = event => {
    setstate({ ...state, [event.target.name]: event.target.value });
  };

  const onSubmitForm = event => {
    event.preventDefault();
    register(state, history);
  };
  return (
    <div className="container text-left">
      <h1>Register</h1>
      <Form>
        <FormGroup>
          <Label for="email">
            Email:{" "}
            <span className="text-danger">{error ? error.email : ""} </span>
          </Label>
          <Input
            onChange={onChangeInput}
            name="email"
            type="email"
            id="email"
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">
            Password:{" "}
            <span className="text-danger">{error ? error.password : ""} </span>
          </Label>
          <Input
            onChange={onChangeInput}
            name="password"
            type="password"
            id="password"
          />
        </FormGroup>
        <FormGroup>
          <Label for="password2">
            Confirmed Password:{" "}
            <span className="text-danger">{error ? error.password2 : ""} </span>
          </Label>
          <Input
            onChange={onChangeInput}
            name="password2"
            type="password"
            id="password2"
          />
        </FormGroup>
        <FormGroup>
          <Label for="fullName">Fullname</Label>
          <Input
            onChange={onChangeInput}
            name="fullName"
            type="text"
            id="fullName"
          />
        </FormGroup>
        <FormGroup>
          <Label for="userType">User Type</Label>
          <Input
            onChange={onChangeInput}
            name="userType"
            type="select"
            id="userType"
          >
            <option value="-1">Select User Type:</option>
            <option value="driver">driver</option>
            <option value="passenger">passenger</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="phone">Phone</Label>
          <Input
            onChange={onChangeInput}
            name="phone"
            type="number"
            id="phone"
          />
        </FormGroup>
        <FormGroup>
          <Label for="DOB">DOB:</Label>
          <Input onChange={onChangeInput} name="DOB" type="date" id="DOB" />
        </FormGroup>
        <button onClick={onSubmitForm}>Submit</button>
      </Form>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    register: (data, history) => dispatch(register(data, history))
  };
};

const mapStateToProps = state => {
  return {
    error: state.error.register
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
