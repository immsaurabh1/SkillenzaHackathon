import React from "react";
import PropTypes from "prop-types";
import { Grid, Paper, Button } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import styled from "styled-components";
import SLBox from "../SLBoxContainer";
import SLDropdown from "../SLDropdown";
import SLAlert from "../SLAlert";
import Axios from "axios";
import countryList from "react-select-country-list";
import TextField from "@material-ui/core/TextField";
import Help from "@material-ui/icons/Help";
import InputAdornment from "@material-ui/core/InputAdornment";
import Tooltip from "@material-ui/core/Tooltip";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import grey from "@material-ui/core/colors/grey";
const headerBackground = grey[300];

const SLPageSubHeader = styled.h3`
  text-align: left;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  padding-bottom: 15px;
  border-bottom: 1px solid ${headerBackground};
`;
const SLFormControlLabel = styled(FormControlLabel)`
  font-size: 16px;
`;
const SLDropDownGrid = styled(Grid)`
  padding: 0px 10px;
`;
const SLGridContainer = styled(Grid)`
  height: 100%;
`;
const SLStyledButton = styled(Button)`
  margin: 20px 0px 20px 20px;
`;
const SLStyledTextfield = styled(TextField)`
  &.sl-root > div {
    flex-direction: row-reverse;
  }
  width: 100%;
`;
const SlButtonFloatingPaper = styled(Paper)`
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
  width: 100%;
  position: absolute;
  background-color: #fff;
  bottom: 0;
  z-index: 3;
  left: 0;
`;
const SlDiv = styled.div`
  // position: relative;
`;
class PredictEmployee extends React.Component {
  constructor(props) {
    super(props);

    this.options = countryList().getData();
    console.log(this.options);
    this.country = [];

    this.options.forEach((data, index) => {
      this.country.push({ key: data.value, value: data.label, index: index });
    });
    console.log(this.country);
    this.state = {
      gender: [],
      work_interfere: [],
      wellness_program: [],
      tech_company: [],
      supervisor: [],
      self_employed: [],
      seek_help: [],
      remote_work: [],
      phys_health_interview: [],
      phys_health_consequence: [],
      anonymity: [],
      benefits: [],
      care_options: [],
      coworkers: [],
      family_history: [],
      leave: [],
      mental_health_consequence: [],
      mental_health_interview: [],
      mental_vs_physical: [],
      no_employees: [],
      phys_health_consequence: [],
      options: this.country,
      selectedGender: { key: "", value: "" },
      selectedWork_interfere: { key: "", value: "" },
      selectedWellness_program: { key: "", value: "" },
      selectedTech_company: { key: "", value: "" },
      selectedSupervisor: { key: "", value: "" },
      selectedSelf_employed: { key: "", value: "" },
      selectedSeek_help: { key: "", value: "" },
      selectedRemote_work: { key: "", value: "" },
      selectedPhys_health_interview: { key: "", value: "" },
      selectedPhys_health_consequence: { key: "", value: "" },
      selectedAnonymity: { key: "", value: "" },
      selectedbenefits: { key: "", value: "" },
      selectedCare_options: { key: "", value: "" },
      selectedCoworkers: { key: "", value: "" },
      selectedFamily_history: { key: "", value: "" },
      selectedLeave: { key: "", value: "" },
      selectedMental_health_consequence: { key: "", value: "" },
      selectedMental_health_interview: { key: "", value: "" },
      selectedMental_vs_physical: { key: "", value: "" },
      selectedNo_employees: { key: "", value: "" },
      selectedCountry: { key: "", value: "" },
      country: "",
      age: "",
      states: [],
      selectedState: { key: "", value: "" },
      obs_consequence: [],
      selectedObs_consequence: { key: "", value: "" },
      panel1: true,
      panel2: false,
      panel3: false,
      panel4: false,
      panel5: false,
      comments: "",
      errorMessage: ""
    };
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  componentDidMount() {
    const getData = async () => {
      const response = await Axios.get("http://127.0.0.1:5000/getParams");
      if (response.status === 200) {
        console.log(response.data);
        let paramsObj = {};
        const gender = response.data.gender;
        const work_interfere = response.data.work_interfere;
        const wellness_program = response.data.wellness_program;
        const tech_company = response.data.tech_company;
        const supervisor = response.data.supervisor;
        const self_employed = response.data.self_employed;
        const seek_help = response.data.seek_help;
        const remote_work = response.data.remote_work;
        const phys_health_interview = response.data.phys_health_interview;
        const phys_health_consequence = response.data.phys_health_consequence;
        const anonymity = response.data.anonymity;
        const benefits = response.data.benefits;
        const care_options = response.data.care_options;
        const coworkers = response.data.coworkers;
        const family_history = response.data.family_history;
        const leave = response.data.leave;
        const mental_health_consequence =
          response.data.mental_health_consequence;
        const mental_health_interview = response.data.mental_health_interview;
        const mental_vs_physical = response.data.mental_vs_physical;
        const no_employees = response.data.no_employees;
        const options = response.data.country;
        const obs_consequence = response.data.obs_consequence;
        paramsObj = {
          gender,
          work_interfere,
          wellness_program,
          tech_company,
          supervisor,
          self_employed,
          seek_help,
          remote_work,
          phys_health_interview,
          phys_health_consequence,
          anonymity,
          benefits,
          care_options,
          coworkers,
          family_history,
          leave,
          mental_health_consequence,
          mental_health_interview,
          mental_vs_physical,
          no_employees,
          phys_health_consequence,
          options,
          obs_consequence
        };
        console.log("paramobj", paramsObj);
        this.setState(paramsObj, () => {
          console.log("state", this.state.gender);
        });
      }
    };
    getData();
  }
  postModelData = async () => {
    let finalObj = {};
    finalObj.Age = Number(this.state.age);
    finalObj.Gender = this.state.selectedGender.key;
    finalObj.Country = this.state.selectedCountry.value;
    finalObj.state = this.state.selectedState.value;
    finalObj.self_employed = this.state.selectedSelf_employed.key;
    finalObj.family_history = this.state.selectedFamily_history.key;
    finalObj.work_interfere = this.state.selectedWork_interfere.key;
    finalObj.no_employees = this.state.selectedNo_employees.key;
    finalObj.remote_work = this.state.selectedRemote_work.key;
    finalObj.tech_company = this.state.selectedTech_company.key;
    finalObj.benefits = this.state.selectedbenefits.key;
    finalObj.care_options = this.state.selectedCare_options.key;
    finalObj.wellness_program = this.state.selectedWellness_program.key;
    finalObj.seek_help = this.state.selectedSeek_help.key;
    finalObj.anonymity = this.state.selectedAnonymity.key;
    finalObj.leave = this.state.selectedLeave.key;
    finalObj.mental_health_consequence = this.state.selectedMental_health_consequence.key;
    finalObj.phys_health_consequence = this.state.selectedPhys_health_consequence.key;
    finalObj.coworkers = this.state.selectedCoworkers.key;
    finalObj.supervisor = this.state.selectedSupervisor.key;
    finalObj.mental_health_interview = this.state.selectedMental_health_interview.key;
    finalObj.phys_health_interview = this.state.selectedPhys_health_interview.key;
    finalObj.mental_vs_physical = this.state.selectedMental_vs_physical.key;
    finalObj.obs_consequence = this.state.selectedObs_consequence.key;
    finalObj.comments = this.state.comments;
    if (
      !finalObj.Age ||
      !finalObj.Gender ||
      !finalObj.Country ||
      !finalObj.state
    ) {
      this.showErrorMessage("Please answer all the question in Basic section");
      return;
    }
    if (
      !finalObj.work_interfere ||
      !finalObj.wellness_program ||
      !finalObj.tech_company ||
      !finalObj.supervisor ||
      !finalObj.self_employed ||
      !finalObj.coworkers ||
      !finalObj.leave ||
      !finalObj.remote_work ||
      !finalObj.no_employees
    ) {
      this.showErrorMessage(
        "Please answer all the question in Work Life section"
      );
      return;
    }
    if (
      !finalObj.phys_health_interview ||
      !finalObj.mental_health_interview ||
      !finalObj.mental_health_consequence ||
      !finalObj.phys_health_consequence ||
      !finalObj.mental_vs_physical ||
      !finalObj.obs_consequence
    ) {
      this.showErrorMessage(
        "Please answer all the question in Physical and Mental Issues in Life section"
      );
      return;
    }
    if (
      !finalObj.anonymity ||
      !finalObj.benefits ||
      !finalObj.care_options ||
      !finalObj.family_history ||
      !finalObj.seek_help
    ) {
      this.showErrorMessage(
        "Please answer all the question in section service provided by employer"
      );
      return;
    }
    const response = await Axios.post(
      "http://127.0.0.1:5000/getPrediction",
      finalObj
    );
    debugger;
    if (response.status === 200) {
      console.log("success");
    } else {
      console.log("faliure", response);
    }
  };
  handleDropdownChange = data => {
    console.log(data);
    this.setState({
      [data.name]: data.selected
    });
    if (data.name === "selectedCountry") {
      let states = [];
      if (data && data.selected && data.selected.states) {
        data.selected.states.forEach((val, index) => {
          states.push({ key: val, value: val, index: index });
        });
        this.setState({
          states
        });
      } else {
        this.setState({
          states: [{ value: "No Data Available", key: "NAN" }]
        });
      }
    }
  };
  textFieldchange(value, prop) {
    this.setState({
      [prop]: value
    });
  }
  handleChange(prop, value) {
    console.log(prop, value);
    // let panelState = JSON.parse(JSON.stringify(this.state.prop));
    this.setState(
      {
        [prop]: !value
      },
      () => {
        if (prop === "panel1") {
          this.setState({
            panel2: false,
            panel3: false,
            panel4: false,
            panel5: false
          });
        }
        if (prop === "panel2") {
          this.setState({
            panel1: false,
            panel3: false,
            panel4: false,
            panel5: false
          });
        }
        if (prop === "panel3") {
          this.setState({
            panel1: false,
            panel2: false,
            panel4: false,
            panel5: false
          });
        }
        if (prop === "panel4") {
          this.setState({
            panel1: false,
            panel2: false,
            panel3: false,
            panel5: false
          });
        }
        if (prop === "panel5") {
          this.setState({
            panel1: false,
            panel2: false,
            panel3: false,
            panel4: false
          });
        }
      }
    );
  }
  showErrorMessage(message) {
    this.setState(
      {
        errorMessage: ""
      },
      () => {
        this.setState({
          errorMessage: message
        });
      }
    );
  }
  render() {
    return (
      <SLBox>
        <SlDiv>
          {this.state.errorMessage.length ? (
            <SLAlert type="error" message={this.state.errorMessage} />
          ) : (
            ""
          )}
          <ExpansionPanel
            expanded={this.state.panel1}
            onChange={ev => this.handleChange("panel1", this.state.panel1)}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography variant="h5">Basic Details</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <SLGridContainer container>
                <SLDropDownGrid item xs={2} md={4}>
                  <SLStyledTextfield
                    id="standard-with-placeholder"
                    label="Enter Age"
                    placeholder="Enter Age"
                    margin="normal"
                    value={this.state.age}
                    ref="age"
                    type="number"
                    onChange={ev =>
                      this.textFieldchange(ev.target.value, "age")
                    }
                    required
                    classes={{
                      root: "sl-root"
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title="Enter Your Age">
                            <Help />
                          </Tooltip>
                        </InputAdornment>
                      )
                    }}
                  />
                </SLDropDownGrid>
                <SLDropDownGrid item xs={2} md={4}>
                  <SLDropdown
                    name="selectedGender"
                    selectedItem={this.state.selectedGender}
                    data={this.state.gender}
                    action={this.handleDropdownChange}
                    title="Select Gender"
                    classes={{ formControl: "sl-root-input" }}
                  />
                </SLDropDownGrid>
                <SLDropDownGrid item xs={2} md={4}>
                  <SLDropdown
                    name="selectedCountry"
                    selectedItem={this.state.selectedCountry}
                    data={this.state.options}
                    action={this.handleDropdownChange}
                    title="Select Country"
                    classes={{ formControl: "sl-root-input" }}
                  />
                </SLDropDownGrid>
                <SLDropDownGrid item xs={2} md={4}>
                  <SLDropdown
                    name="selectedState"
                    selectedItem={this.state.selectedState}
                    data={this.state.states}
                    action={this.handleDropdownChange}
                    title="Which state or territory do you live in?"
                    classes={{ formControl: "sl-root-input" }}
                  />
                </SLDropDownGrid>
              </SLGridContainer>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
            expanded={this.state.panel2}
            onChange={ev => this.handleChange("panel2", this.state.panel2)}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography variant="h5">
                {" "}
                Questions Related To Work Life
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <SLGridContainer container>
                <SLDropDownGrid item xs={2} md={4}>
                  <SLDropdown
                    name="selectedWork_interfere"
                    selectedItem={this.state.selectedWork_interfere}
                    data={this.state.work_interfere}
                    action={this.handleDropdownChange}
                    title="Do you feel that your health condition interferes with your work?"
                    classes={{ formControl: "sl-root-input" }}
                  />
                </SLDropDownGrid>
                <SLDropDownGrid item xs={2} md={4}>
                  <SLDropdown
                    name="selectedWellness_program"
                    selectedItem={this.state.selectedWellness_program}
                    data={this.state.wellness_program}
                    action={this.handleDropdownChange}
                    title="Have you ever been told about employee wellness program? "
                    classes={{ formControl: "sl-root-input" }}
                  />
                </SLDropDownGrid>
                <SLDropDownGrid item xs={2} md={4}>
                  <SLDropdown
                    name="selectedTech_company"
                    selectedItem={this.state.selectedTech_company}
                    data={this.state.tech_company}
                    action={this.handleDropdownChange}
                    title="Is your employer a tech company?"
                    classes={{ formControl: "sl-root-input" }}
                  />
                </SLDropDownGrid>
                <SLDropDownGrid item xs={2} md={4}>
                  <SLDropdown
                    name="selectedSupervisor"
                    selectedItem={this.state.selectedSupervisor}
                    data={this.state.supervisor}
                    action={this.handleDropdownChange}
                    title="Will you discuss mental Health issue with Supervisor?"
                    classes={{ formControl: "sl-root-input" }}
                  />
                </SLDropDownGrid>
                <SLDropDownGrid item xs={2} md={4}>
                  <SLDropdown
                    name="selectedSelf_employed"
                    selectedItem={this.state.selectedSelf_employed}
                    data={this.state.self_employed}
                    action={this.handleDropdownChange}
                    title="Are you self-employed?"
                    classes={{ formControl: "sl-root-input" }}
                  />
                </SLDropDownGrid>
                <SLDropDownGrid item xs={2} md={4}>
                  <SLDropdown
                    name="selectedCoworkers"
                    selectedItem={this.state.selectedCoworkers}
                    data={this.state.coworkers}
                    action={this.handleDropdownChange}
                    title="Do you want to discuss mental health issue with coworkers? "
                    classes={{ formControl: "sl-root-input" }}
                  />
                </SLDropDownGrid>
                <SLDropDownGrid item xs={2} md={4}>
                  <SLDropdown
                    name="selectedRemote_work"
                    selectedItem={this.state.selectedRemote_work}
                    data={this.state.remote_work}
                    action={this.handleDropdownChange}
                    title="Do you work remotely often?"
                    classes={{ formControl: "sl-root-input" }}
                  />
                </SLDropDownGrid>
                <SLDropDownGrid item xs={2} md={4}>
                  <SLDropdown
                    name="selectedLeave"
                    selectedItem={this.state.selectedLeave}
                    data={this.state.leave}
                    action={this.handleDropdownChange}
                    title="How easy is it for you to take medical leave? "
                    classes={{ formControl: "sl-root-input" }}
                  />
                </SLDropDownGrid>
                <SLDropDownGrid item xs={2} md={4}>
                  <SLDropdown
                    name="selectedNo_employees"
                    selectedItem={this.state.selectedNo_employees}
                    data={this.state.no_employees}
                    action={this.handleDropdownChange}
                    title="How many employees does your organization have?"
                    classes={{ formControl: "sl-root-input" }}
                  />
                </SLDropDownGrid>
              </SLGridContainer>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
            expanded={this.state.panel3}
            onChange={ev => this.handleChange("panel3", this.state.panel3)}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography variant="h5">
                Questions Related To Mental and Physical issues in Life
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <SLGridContainer container>
                {/* <SLPageSubHeader>
                  Select Your Marketing Objective
                </SLPageSubHeader>
                <Grid container>
                  <Grid item md={12}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        aria-label="Marketing Type"
                        name="marketingType"
                        value={this.state.marketingType}
                        onChange={this.handleChange}
                        row
                      >
                        <SLFormControlLabel
                          value="listType"
                          control={<Radio />}
                          label={
                            <Typography style={{ fontSize: "22px" }}>
                              Pick One From The List
                            </Typography>
                          }
                        />
                        <SLFormControlLabel
                          value="templateType"
                          control={<Radio />}
                          label={
                            <Typography style={{ fontSize: "22px" }}>
                              Pick From A Template
                            </Typography>
                          }
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid> */}

                <SLDropDownGrid item xs={2} md={4}>
                  <SLDropdown
                    name="selectedPhys_health_interview"
                    selectedItem={this.state.selectedPhys_health_interview}
                    data={this.state.phys_health_interview}
                    action={this.handleDropdownChange}
                    title="Will you bring up physical health in an interview with your employer?"
                    classes={{ formControl: "sl-root-input" }}
                  />
                </SLDropDownGrid>
                <SLDropDownGrid item xs={2} md={4}>
                  <SLDropdown
                    name="selectedPhys_health_consequence"
                    selectedItem={this.state.selectedPhys_health_consequence}
                    data={this.state.phys_health_consequence}
                    action={this.handleDropdownChange}
                    title="Any issues when physical health issues discussed with employer?"
                    classes={{ formControl: "sl-root-input" }}
                  />
                </SLDropDownGrid>

                <SLDropDownGrid item xs={2} md={4}>
                  <SLDropdown
                    name="selectedMental_health_consequence"
                    selectedItem={this.state.selectedMental_health_consequence}
                    data={this.state.mental_health_consequence}
                    action={this.handleDropdownChange}
                    title="Will there be issues when mental issues discussed with employer?"
                    classes={{ formControl: "sl-root-input" }}
                  />
                </SLDropDownGrid>
                <SLDropDownGrid item xs={2} md={4}>
                  <SLDropdown
                    name="selectedMental_health_interview"
                    selectedItem={this.state.selectedMental_health_interview}
                    data={this.state.mental_health_interview}
                    action={this.handleDropdownChange}
                    title="Will you bring up mental health in an interview with your employer?"
                    classes={{ formControl: "sl-root-input" }}
                  />
                </SLDropDownGrid>
                <SLDropDownGrid item xs={2} md={4}>
                  <SLDropdown
                    name="selectedMental_vs_physical"
                    selectedItem={this.state.selectedMental_vs_physical}
                    data={this.state.mental_vs_physical}
                    action={this.handleDropdownChange}
                    title="Does your employer take mental health seriously?"
                    classes={{ formControl: "sl-root-input" }}
                  />
                </SLDropDownGrid>

                <SLDropDownGrid item xs={2} md={4}>
                  <SLDropdown
                    name="selectedObs_consequence"
                    selectedItem={this.state.selectedObs_consequence}
                    data={this.state.obs_consequence}
                    action={this.handleDropdownChange}
                    title="Any negative consequences if your coworker having some issue?"
                    classes={{ formControl: "sl-root-input" }}
                  />
                </SLDropDownGrid>
              </SLGridContainer>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
            expanded={this.state.panel4}
            onChange={ev => this.handleChange("panel4", this.state.panel4)}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography variant="h5">
                Questions related to services provided by employer
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <SLGridContainer container>
                <SLDropDownGrid item xs={2} md={4}>
                  <SLDropdown
                    name="selectedSeek_help"
                    selectedItem={this.state.selectedSeek_help}
                    data={this.state.seek_help}
                    action={this.handleDropdownChange}
                    title="Does your employer provide resources seek help? "
                    classes={{ formControl: "sl-root-input" }}
                  />
                </SLDropDownGrid>

                <SLDropDownGrid item xs={2} md={4}>
                  <SLDropdown
                    name="selectedAnonymity"
                    selectedItem={this.state.selectedAnonymity}
                    data={this.state.anonymity}
                    action={this.handleDropdownChange}
                    title="Is your anonymity protected ? "
                    classes={{ formControl: "sl-root-input" }}
                  />
                </SLDropDownGrid>

                <SLDropDownGrid item xs={2} md={4}>
                  <SLDropdown
                    name="selectedbenefits"
                    selectedItem={this.state.selectedbenefits}
                    data={this.state.benefits}
                    action={this.handleDropdownChange}
                    title=" Does your employer provide mental health benefits?"
                    classes={{ formControl: "sl-root-input" }}
                  />
                </SLDropDownGrid>
                <SLDropDownGrid item xs={2} md={4}>
                  <SLDropdown
                    name="selectedCare_options"
                    selectedItem={this.state.selectedCare_options}
                    data={this.state.care_options}
                    action={this.handleDropdownChange}
                    title="Do you know the options for mental care your employer provides? "
                    classes={{ formControl: "sl-root-input" }}
                  />
                </SLDropDownGrid>

                <SLDropDownGrid item xs={2} md={4}>
                  <SLDropdown
                    name="selectedFamily_history"
                    selectedItem={this.state.selectedFamily_history}
                    data={this.state.family_history}
                    action={this.handleDropdownChange}
                    title="Do you have a family history of mental illness? "
                    classes={{ formControl: "sl-root-input" }}
                  />
                </SLDropDownGrid>
              </SLGridContainer>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
            expanded={this.state.panel5}
            onChange={ev => this.handleChange("panel5", this.state.panel5)}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography variant="h5">Any Suggestions / Comments</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <SLGridContainer container>
                <SLDropDownGrid item xs={10} md={4}>
                  <SLStyledTextfield
                    placeholder="Comments"
                    label="Comments"
                    value={this.state.comments}
                    onChange={ev =>
                      this.textFieldchange(ev.target.value, "comments")
                    }
                    multiline={true}
                    rows={4}
                    variant="outlined"
                  />
                </SLDropDownGrid>
              </SLGridContainer>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <SlButtonFloatingPaper>
            <SLStyledButton
              variant="contained"
              color="primary"
              onClick={() => this.postModelData()}
            >
              get Prediction
            </SLStyledButton>
          </SlButtonFloatingPaper>
        </SlDiv>
      </SLBox>
    );
  }
}

PredictEmployee.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles({ withTheme: true })(PredictEmployee);
