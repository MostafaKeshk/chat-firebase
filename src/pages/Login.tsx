import { LoadingButton } from "@mui/lab";
import FormikInput from "../components/form/FormikInput";
import AlertMessage from "../components/general/AlertMessage";
import useLoginContainer from "../containers/useLoginContainer";
import { useAlert } from "../contexts/AlertContext";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import LoginSvg from "../assets/svg/LoginSvg";
const Login = () => {
  const { value, msg, setValue, error } = useAlert();

  const {
    loading,
    formik,
    formikCode,
    isPhoneNumberContainer,
    isConfirmationContainer,
    handleResendCode,
    showCaptcha,
  } = useLoginContainer();

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            display: "flex",
            height: "100vh",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <QuestionAnswerIcon color="primary" sx={{ fontSize: "80px" }} />
            <Typography
              variant="h3"
              component="h1"
              color="primary"
              sx={{ fontWeight: "bold" }}
            >
              Chatty
            </Typography>
            <Typography variant="h6" component="h2">
              Join Us Now!
            </Typography>
          </Box>
          {isPhoneNumberContainer && (
            <Box>
              <FormikInput
                formik={formik}
                name="phoneNumber"
                label="Phone Number"
                sx={{ my: 1 }}
                size="small"
              />

              <LoadingButton
                variant="contained"
                onClick={formik.handleSubmit}
                loading={loading}
                fullWidth
              >
                Login
              </LoadingButton>
            </Box>
          )}

          {isConfirmationContainer && (
            <>
              <FormikInput
                formik={formikCode}
                name="otp"
                label="OTP"
                sx={{ my: 2 }}
              />

              <LoadingButton
                variant="contained"
                onClick={formikCode.handleSubmit}
                loading={loading}
                fullWidth
              >
                Confirm
              </LoadingButton>
              <Button
                sx={{ mt: 1 }}
                onClick={handleResendCode}
                fullWidth
                variant="contained"
                color="secondary"
              >
                Resend Code
              </Button>
            </>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            display: "flex",
            height: "100vh",
          }}
        >
          <LoginSvg />
        </Grid>
      </Grid>
      {showCaptcha && <div id="recaptcha-container" />}

      <AlertMessage value={value} setValue={setValue} error={error} msg={msg} />
    </Container>
  );
};

export default Login;
