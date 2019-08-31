import React from "react";
import styled from "styled-components";

const SLAppBox = styled.div`
  margin: 15px;
  padding: 20px;
  border: 1px solid #bdbdbd;
  border-radius: 4px;
  height: auto;
  min-height: 85vh;
  position: relative;
  top: 70px;
  margin-left: 80px;
  text-align: left;
`;
class SLBox extends React.Component {
  render() {
    return (
      <div>
        <SLAppBox>{this.props.children}</SLAppBox>
      </div>
    );
  }
}

export default SLBox;
