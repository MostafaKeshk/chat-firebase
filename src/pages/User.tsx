import { Container, Toolbar } from "@mui/material";
import withAuth from "../routes/withAuth";

import { LoadingButton } from "@mui/lab";
import FormikInput from "../components/form/FormikInput";
import AppBar from "../components/Layout/AppBar";
import useUserContainer from "../containers/useUserContainer";

const User = () => {
  const drawerWidth = 0;
  const { formik, loading } = useUserContainer();
  return (
    <>
      <AppBar drawerWidth={drawerWidth} />
      <Toolbar />
      <Container maxWidth="xl" sx={{ my: 2 }}>
        <FormikInput formik={formik} name="name" label="Name" />
        <LoadingButton
          onClick={formik.handleSubmit}
          loading={loading}
          fullWidth
          sx={{ my: 1 }}
          variant="contained"
        >
          Submit
        </LoadingButton>
      </Container>
    </>
  );
};

export default withAuth(User);
