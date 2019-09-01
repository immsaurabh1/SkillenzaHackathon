import React from "react";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";
import amber from "@material-ui/core/colors/amber";
import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/green";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { withTheme } from "@material-ui/core/styles";
import styled from "styled-components";

const SLStyledAlert = styled(SnackbarContent)`
  &.sl-root {
    background-color: #ee6e73;
  }
`;
const SLStyledAlertMessage = styled.span`
  display: flex;
  align-items: center;
  font-size: 15px;
`;

class SLAlert extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
  }

  handleClose = (event, reason) => {
    this.setState({ open: false });
  };

  render() {
    const { type, message, onClose } = this.props;

    return (
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        autoHideDuration={3000}
        open={this.state.open}
        onClose={() => this.setState({ open: false })}
      >
        <SLStyledAlert
          classes={{ root: "sl-root" }}
          type={type}
          theme={this.props.theme}
          message={
            <SLStyledAlertMessage>
              <SLStyledAlertMessage>{message}</SLStyledAlertMessage>
            </SLStyledAlertMessage>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={onClose || this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </Snackbar>
    );
  }
}

SLAlert.propTypes = {
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  type: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired
};

export default withTheme()(SLAlert);
