import Link from "next/link";
import {
  Box,
  Typography,
  Unstable_Grid2 as Grid,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";

export const LoginLayout = (props) => {
  const { children } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flex: "1 1 auto",
      }}
    >
      <Grid container sx={{ flex: "1 1 auto" }}>
        <Grid
          xs={12}
          lg={6}
          sx={{
            alignItems: "center",
            backgroundImage: `url("/assets/web_background.png")`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            color: "white",
            display: "flex",
            justifyContent: "center",
            "& img": {
              maxWidth: "100%",
            },
          }}
        >
          <Box component={Link} href="/">
            <Image
              src="/assets/skklub_logo.png"
              width={lgUp ? 300 : 100}
              height={lgUp ? 90 : 30}
              alt="logo"
            />
          </Box>
        </Grid>
        <Grid
          xs={12}
          lg={6}
          sx={{
            backgroundColor: "background.paper",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <Box
            component="header"
            sx={{
              left: 0,
              p: 3,
              position: "fixed",
              top: 0,
              width: "100%",
            }}
          ></Box>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};
