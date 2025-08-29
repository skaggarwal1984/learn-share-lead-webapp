import React from "react";
import { Typography, Container, Grid, Button, Tooltip } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";

/* Palette */
const darkBlue = "#1976d2";
const white = "#ffffff";
const textColor = "#333";
const gray = "#e0e0e0";

/* Layout */
const Wrap = styled("main")({
  background: "transparent",
  color: textColor,
  fontFamily:
    'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, "Helvetica Neue", Arial',
});

const Hero = styled("section")({
  padding: "40px 0 8px",
  marginTop: 64,
  textAlign: "center",
});

const Kicker = styled(Typography)({
  textTransform: "uppercase",
  letterSpacing: ".08em",
  fontWeight: 700,
  fontSize: 12,
  color: "#6b7280",
  marginBottom: 6,
});

const Title = styled(Typography)({
  fontWeight: 800,
  lineHeight: 1.15,
  marginBottom: 6,
});

const Lead = styled(Typography)({
  color: "#374151",
});

/* Card grid */
const GridWrap = styled("section")({
  padding: "16px 0 32px",
});

/* Prevent `disabled` prop from reaching the DOM */
const ProblemSection = styled("div", {
  shouldForwardProp: (prop) => prop !== "disabled",
})(({ disabled }) => ({
  padding: 20,
  textAlign: "center",
  backgroundColor: disabled ? gray : white,
  color: disabled ? "#a0a0a0" : darkBlue,
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  boxSizing: "border-box",
  width: "100%",
  height: 220,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  transition: "background-color .25s ease, transform .2s ease, color .25s ease",
  ...(disabled
    ? {}
    : {
        "&:hover": {
          backgroundColor: darkBlue,
          color: white,
          transform: "scale(1.02)",
        },
      }),
}));

const ProblemTitle = styled(Typography)({
  fontWeight: 800,
  marginBottom: 8,
  color: "inherit", // inherit for hover contrast
});

const ProblemDescription = styled(Typography)({
  color: "inherit", // inherit for hover contrast
  marginBottom: 12,
});

const ActionButton = styled(Button)({
  backgroundColor: darkBlue,
  color: white,
  borderRadius: 8,
  fontWeight: 600,
  textTransform: "none",
  "&:hover": { backgroundColor: "#115293" },
});

export default function Home() {
  React.useEffect(() => {
    document.title = "Sandeep Aggarwal — Learn · Share · Keep Learning";
  }, []);

  return (
    <Wrap>
      <Container maxWidth="lg">
        {/* Hero */}
        <Hero>
          <Kicker component="p">Engineering Leadership</Kicker>
          <Title variant="h4">Learn. Share. Keep learning.</Title>
        </Hero>

        {/* Three simple cards */}
        <GridWrap>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <ProblemSection>
                <ProblemTitle variant="h6">My Profile</ProblemTitle>
                <ProblemDescription variant="body2">
                  Scope, impact, and operating principles.
                </ProblemDescription>
                <ActionButton
                  component={Link}
                  to="/profile"
                  size="small"
                  aria-label="Open my profile"
                >
                  View Profile
                </ActionButton>
              </ProblemSection>
            </Grid>

            <Grid item xs={12} md={4}>
              <ProblemSection>
                <ProblemTitle variant="h6">Articles</ProblemTitle>
                <ProblemDescription variant="body2">
                  Bookmark-worthy guides you can use in design reviews.
                </ProblemDescription>
                <ActionButton
                  component={Link}
                  to="/articles"
                  size="small"
                  aria-label="Browse articles"
                >
                  Read Articles
                </ActionButton>
              </ProblemSection>
            </Grid>

            <Grid item xs={12} md={4}>
              <Tooltip title="Coming soon" arrow disableInteractive>
                <span style={{ display: "block" }}>
                  <ProblemSection disabled>
                    <ProblemTitle variant="h6">Newsletter</ProblemTitle>
                    <ProblemDescription variant="body2">
                      One email a month. No spam.
                    </ProblemDescription>
                    <ActionButton size="small" disabled>
                      Subscribe
                    </ActionButton>
                  </ProblemSection>
                </span>
              </Tooltip>
            </Grid>
          </Grid>
        </GridWrap>
      </Container>
    </Wrap>
  );
}
