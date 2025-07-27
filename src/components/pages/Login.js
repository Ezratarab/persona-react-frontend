import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import authServiceInstance from "../../components/service/APIService";
import loginImage from "../../assets/log_in.jpg";
import { useAuth } from "../service/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();
  const notify = (data) => toast(data);
  const navigate = useNavigate();
  const login = async (email, password) => {
    try {
      const data = await authServiceInstance.login(email, password);
      notify(data.message);
      setUsername("");
      setPassword("");
      setUser(data.name);
      navigate(`/profile/${data.name}`);
    } catch (error) {
      notify(error.message);
    }
  };

  return (
    <MDBContainer
      fluid
      className="d-flex align-items-center justify-content-center vh-100"
    >
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          className: "",
          duration: 5000,
          removeDelay: 1000,
          style: {
            color: "#be823c",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <MDBRow className="g-0 align-items-center w-100">
        {/* Left Column */}
        <MDBCol md="6">
          <MDBCard
            className="cascading-right mx-auto"
            style={{
              background: "hsla(0, 0%, 100%, 0.55)",
              backdropFilter: "blur(30px)",
              maxWidth: "500px", // Limit card width
              color: "#be823c",
            }}
          >
            <MDBCardBody className="p-5 shadow-5 text-center">
              <h2 className="fw-bold mb-5">Log in now</h2>

              <MDBInput
                wrapperClass="mb-4"
                label="Username"
                id="username"
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <MDBBtn
                className="w-100 mb-4"
                size="md"
                onClick={(e) => login(username, password)}
              >
                Log in
              </MDBBtn>
              <div className="text-center">
                <p>if you are new, get password to your email:</p>
                <MDBInput
                  wrapperClass="mb-4"
                  label="Email"
                  id="form3"
                  type="email"
                />
              </div>
              <MDBBtn className="w-100 mb-4" size="md">
                send to my email
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        {/* Right Column */}
        <MDBCol md="6" className="d-none d-md-block">
          <img
            src={loginImage}
            className="w-100 rounded-4 shadow-4 img-fluid"
            alt="Sample"
            style={{ maxHeight: "100vh", objectFit: "cover" }}
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
