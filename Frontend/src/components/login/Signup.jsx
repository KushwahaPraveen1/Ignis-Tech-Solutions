import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Signup.css";
import OTPInput, { ResendOTP } from "otp-input-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function SignUp() {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errpass, seterrPass] = useState("");
  const [OTP, showOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [otp, setOtp] = useState("");
  const [erremail, seterremail] = useState(false);
  const emailpattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passpattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const showToast = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  var emailresp;
  let token;
  const handleSubmit = (event) => {
    event.preventDefault();
    if (email.match(emailpattern)) seterremail(false);
    if (password.match(passpattern)) seterrPass(false);
    if (name.length === 0 || email.length === 0 || password.length === 0) {
      showToast("Please Fill all the Entries");
    } else if (!email.match(emailpattern)) {
      seterremail(true);
      showToast("Please Enter a Valid Email");
    } else if (!password.match(passpattern)) {
      seterrPass(true);
      showToast("Please Enter a Strong Password");
    } else {
      setLoading(true);
      axios
        .post("https://testhost-fe1o.onrender.com/auth/signup", {
          email: email,
          password: password,
          name: name,
        })
        .then((result) => {
          emailresp = result.status;
          token = result.data.token;
          if (emailresp === 201) {
            showOTP(true);
            toast.success(`${result.data.msg}`, {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            // console.log(token)
            localStorage.setItem("token", token);
          } else {
            showToast(`${result.data.msg}`);
          }
          setLoading(false);
          console.log(result);
        })

        .catch((err) => {
          console.log(err);
          if (err.response && err.response.data && err.response.data.data) {
            setEmail("");
            showToast(`${err.response.data.data[0].msg}`);
          } else {
            setEmail("");
            showToast(`OTP not Sent`);
          }
          setLoading(false);
        });
    }
  };

  var otpresp;
  const handleOtp = () => {
    console.log(otp);
    if (otp.length !== 4) showToast(`Enter correct OTP`);
    else {
      const token = localStorage.getItem("token");
      setLoading2(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .post(
          "https://testhost-fe1o.onrender.com/auth/otpverify",
          {
            email: email,
            otp: otp,
          },
          { headers }
        )
        .then((result) => {
          otpresp = result.status;
          if (otpresp === 200 && result.data.success === true) {
            toast.success(`${result.data.msg}`, {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            localStorage.setItem("token", result.data.token);
            localStorage.setItem("login", true);
            localStorage.setItem("email", email);

            showOTP(false);
          } else {
            showToast(`${result.data.msg}`);
          }
          setLoading2(false);
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
          if (err.response && err.response.data && err.response.data.data) {
            showToast(`${err.response.data.data[0].msg}`);
            setOtp("");
            setLoading2(false);
          } else {
            showToast(`${err.message}`);
            setOtp("");
            setLoading2(false);
          }
        });
    }
  };
  var count = 1;
  const handleResend = () => {
    count++;
    setOtp("");
    if (count <= 4) {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .put("https://testhost-fe1o.onrender.com/auth/resendotp", {}, { headers })
        .then((result) => {
          console.log(result);
          toast.info(`OTP sent`, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          localStorage.setItem("login", true);
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.data) {
            showToast(`${err.response.data.data[0].msg}`);
            setOtp("");
            setLoading2(false);
          } else {
            showToast(`${err.message}`);
            setOtp("");
            setLoading2(false);
          }
        });
    }
  };

  useEffect(() => {
    let login = localStorage.getItem("login");
    if (login) {
      Navigate("/");
    }
  });

  return (
    <div className="fullsc">
      <ToastContainer autoClose={4000} theme="colored" newestOnTop={true} />
      <div className="mainbody">
        <div className="left_side">

        </div>
        <div className="right_side">
        <div className="container">
          <div className="head_log">
            Sign up
          </div>
          {OTP ? (
            <span className="ent">
              Enter OTP
              <OTPInput
                value={otp}
                onChange={setOtp}
                autoFocus
                OTPLength={4}
                otpType="number"
                disabled={false}
                className="otp-input "
                inputClassName="otp-num"
              />
              <ResendOTP onResendClick={handleResend} />
              <button type="submit" onClick={handleOtp} disabled={loading2} id="otpsb">
                {loading2 ? <>Verifying OTP ...</> : <>Verify OTP</>}
              </button>
            </span>
          ) : (
            <>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": {
                    m: 2,
                    width: "40ch",
                    "@media (max-width: 410px)": {
                      width: "30ch",
                    },
                    "@media (max-width: 338px)": {
                      width: "28ch",
                    },
                    "@media (max-width: 320px)": {
                      width: "26ch",
                    },
                    "@media (max-width: 300px)": {
                      width: "23ch",
                    },
                  },
                }}
                noValidate
                autoComplete="off"
                className="input"
              >
                <TextField
                  required
                  // id="standard-required"
                  label="Full Name"
                  variant="outlined"
                  type="name"
                  // error={erremail}
                  // helperText={erremail ? "Enter Correct Email" : ""}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);

                    // const emailpattern =
                    //   /^[a-zA-Z]{2,20}22\d{5,7}@akgec\.ac\.in$/gm;
                    // seterremail(!emailpattern.test(e.target.value));
                  }}
                  InputProps={{ style: { color: 'white' },
                  classes: { notchedOutline: 'white-border' }, }}
                  InputLabelProps={{ style: { color: 'white' } }}
                />
              </Box>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": {
                    m: 2,
                    width: "40ch",
                    "@media (max-width: 410px)": {
                      width: "30ch",
                    },
                    "@media (max-width: 338px)": {
                      width: "28ch",
                    },
                    "@media (max-width: 320px)": {
                      width: "26ch",
                    },
                    "@media (max-width: 300px)": {
                      width: "23ch",
                    },
                  },
                }}
                noValidate
                autoComplete="off"
                className="input"
              >
                <TextField
                  required
                  // id="standard-required"
                  label="Email"
                  variant="outlined"
                  type="email"
                  error={erremail}
                  helperText={erremail ? "Enter Correct Email" : ""}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value.toLowerCase());

                    const emailpattern =
                      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                    seterremail(!emailpattern.test(e.target.value));
                  }}
                  InputProps={{ style: { color: 'white' }, classes: { notchedOutline: erremail ? 'red-border' : 'white-border' },  }}
                  InputLabelProps={{ style: { color: 'white' } }}
                />
              </Box>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": {
                    m: 2,
                    width: "40ch",
                    "@media (max-width: 410px)": {
                      width: "30ch",
                    },
                    "@media (max-width: 338px)": {
                      width: "28ch",
                    },
                    "@media (max-width: 320px)": {
                      width: "26ch",
                    },
                    "@media (max-width: 300px)": {
                      width: "23ch",
                    },
                  },
                }}
                noValidate
                autoComplete="off"
                className="input"
              >
                <TextField
                  required
                  // id="standard-required"
                  label="Create Password"
                  variant="outlined"
                  type="password"
                  error={errpass}
                  helperText={errpass ? "Your password is weak" : ""}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);

                    const passpattern =
                      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
                    seterrPass(!passpattern.test(e.target.value));
                  }}
                  InputProps={{ style: { color: 'white' }, classes: { notchedOutline: errpass ? 'red-border' : 'white-border' },  }}
                  InputLabelProps={{ style: { color: 'white' } }}
                />
              </Box>

              <button type="submit" disabled={loading} onClick={handleSubmit}>
                {loading ? <>Sending Otp..</> : <>Send OTP</>}
              </button>
              <div className="bott_text">
                <p>Already registered?</p>
                <Link to="/login" id="bottnav">Login</Link>
              </div>
            </>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
