import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import styled from "styled-components";
import PropTypes from "prop-types";

const SLStyledForm = styled.form`
  margin-top: 15px;
`;
const SLStyledFormControl = styled(FormControl)`
  width: 100%;
`;

const SLStyledSelect = styled(Select)`
  & :focus {
    background-color: transparent;
  }
`;

class SLDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: props.disabled || false,
      required: props.required || false
    };
  }
  componentDidUpdate(nextProps) {
    if (
      nextProps !== this.props &&
      this.state.disabled !== nextProps.disabled
    ) {
      this.setState({
        disabled: nextProps.disabled
      });
    }
  }
  render() {
    return (
      <SLStyledForm autoComplete="off">
        <SLStyledFormControl
          required={this.state.required}
          // variant="standard"
          disabled={this.state.disabled}
        >
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="outlined-age-simple"
          >
            {this.props.title}
          </InputLabel>
          <SLStyledSelect
            error={this.props.error}
            key={"dropdownkeys"}
            value={
              this.props.value
                ? this.props.value
                : this.props.selectedItem.value === "none"
                ? ""
                : this.props.selectedItem.value
            }
            data-attr={this.props.attr}
            onChange={ev => {
              const selected = this.props.data.filter(
                item => item.value === ev.target.value
              );
              ev.target.selected = selected.length
                ? selected[0]
                : { key: ev.target.value, value: ev.target.value };
              if (this.props.optional) {
                this.props.action(ev.target, this.props.optional);
              } else {
                this.props.action(ev.target);
              }
            }}
            id={this.props.name}
            name={this.props.name}
          >
            {this.props.type ? (
              <MenuItem key="All" value={this.props.type}>
                {this.props.type}
              </MenuItem>
            ) : (
              ""
            )}
            {this.props.data.map((item, index) => (
              <MenuItem key={item.key + index} value={item.value}>
                {this.props.showKeyValue === "true"
                  ? `${item.key} (${item.value})`
                  : item.value}
              </MenuItem>
            ))}
            )}
          </SLStyledSelect>
        </SLStyledFormControl>
      </SLStyledForm>
    );
  }
}
SLDropdown.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  selectedItem: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired
};

export default SLDropdown;
