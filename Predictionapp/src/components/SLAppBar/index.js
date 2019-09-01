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
import { Typography } from "@material-ui/core";
const SLAppLogo = styled.img`
  width: 68px;
  border: 1px solid #80808087;
  border-radius: 50%;
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
const SLTypography = styled(Typography)`
  &.my-class-name {
    color: white;
    margin-left: 20px;
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
              src="https://yt3.ggpht.com/a/AGF-l78nkJQpo5K8eXcH_-lQyAZZqM-tW4OG_7Ojpw=s900-c-k-c0xffffffff-no-rj-mo"
              alt="Logo"
            />
            <SLTypography classes={{ h4: "my-class-name" }} variant="h4">
              Medi + Treat Survey
            </SLTypography>
          </Toolbar>
        </AppBar>
        <div></div>
      </div>
    );
  }
}
export default HackAppBar;
