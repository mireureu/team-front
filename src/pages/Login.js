import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FaRegUser } from "react-icons/fa";
import { styled } from "@mui/material/styles";
import { AiFillLock } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { asyncLogin } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const StyledTextField = styled(TextField)({
    "& label.MuiInputLabel-asterisk": {
      display: "none",
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const id = e.target.id.value;
    const password = e.target.password.value;
    dispatch(asyncLogin({ id, password })).then((response) => {
      if (response.payload) {
        navigate('/'); 
      } else {
        alert('아이디 또는 비밀번호가 틀렸습니다.');
      }
    });

  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <a href="/" style={{ textDecoration: "none", color: "black" }}>
          <h1>중번당</h1>
        </a>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              로그인
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={onSubmit}
              sx={{ mt: 1 }}
            >
              <StyledTextField
                margin="normal"
                required
                fullWidth
                id="id"
                label={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <FaRegUser style={{ marginRight: "8px" }} />
                    아이디
                  </div>
                }
                name="id"
                autoFocus
                InputLabelProps={{ required: false }}
              />

              <StyledTextField
                margin="normal"
                required
                fullWidth
                name="password"
                label={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <AiFillLock style={{ marginRight: "8px" }} />
                    비밀번호
                  </div>
                }
                type="password"
                id="password"
                autoComplete="current-password"
                InputLabelProps={{ required: false }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ padding: "18px" }}
              >
                로그인
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    href="#"
                    variant="body2"
                    style={{ textDecoration: "none" }}
                  >
                    비밀번호를 잊어버렸나요?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href="#"
                    variant="body2"
                    style={{ textDecoration: "none" }}
                  >
                    {"회원가입"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
