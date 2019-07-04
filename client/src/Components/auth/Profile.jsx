import React from "react";
import { connect } from "react-redux";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { uploadAvatar } from "../../Store/Action/auth";
function Profile({ profile, onUploadAvatar }) {
  const uploadNewAvatar = event => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("avatar", document.getElementById("avatar").files[0]);
    console.log(formData);

    onUploadAvatar(token, formData);
  };

  return (
    <div className="container">
      <Form>
        <FormGroup>
          <img src={`http://localhost:5000/${profile.avatar}`} alt="avatar" />
          <Input name="avatar" type="file" id="avatar" />
          <button onClick={uploadNewAvatar}>upload avatar</button>
        </FormGroup>
        <FormGroup>
          <Label for="email">Email: </Label>
          <Input name="email" type="email" id="email" value={profile.email} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Fullname: </Label>
          <Input value={profile.fullName} />
        </FormGroup>
        <FormGroup>
          <Label for="userType">User Type</Label>
          <Input name="userType" id="userType" value={profile.userType} />
        </FormGroup>
      </Form>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    profile: state.auth.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUploadAvatar: (token, data) => dispatch(uploadAvatar(token, data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
