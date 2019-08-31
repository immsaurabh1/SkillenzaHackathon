import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Menu from "@material-ui/core/Menu";
import InputAdornment from "@material-ui/core/InputAdornment";
import ArrowDropDownSharp from "@material-ui/icons/ArrowDropDown";
import Tooltip from "@material-ui/core/Tooltip";
const SLAppLogo = styled.img`
  max-height: 22px;
  padding: 0;
`;
const SLStyledGridItem = styled(Grid)`
  && {
    padding: 0;
  }
`;
const SLStyledInput = styled(Input)`
  &.sl-input-root {
    color: #ffffff;
    cursor: pointer;
  }
  & .sl-input {
    cursor: pointer;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: all 0.2s linear;
    white-space: nowrap;
    padding: 0.25rem;
    word-wrap: break-word;
    pointer-events: none;
    text-align: right;
  }
`;
const SlMenu = styled(Menu)`
  && .sl-paper {
    right: 20px;
    max-width: 200px;
  }
`;
class HackAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <AppBar position="fixed" color="default">
          {" "}
          <Toolbar>
            <SLAppLogo
              src="https://static.shortlyst.com/assets/campaigns/Shopalyst_White_RobotoCondensed_1533899706853.png"
              alt="Logo"
            />
          </Toolbar>
        </AppBar>
        <div>
          <AppBar position="fixed" color="default">
            <Toolbar></Toolbar>
          </AppBar>
        </div>
      </div>
    );
  }
}
export default HackAppBar;
