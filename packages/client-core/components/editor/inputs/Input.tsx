import styled from "styled-components";

/**
 * [borderColor used to return border color]
 * @param  {object} props
 * @param  {string} defaultColor
 */
function borderColor(props, defaultColor) {
  if (props.canDrop) {
    return props.theme.blue;
  } else if (props.error) {
    return props.theme.error;
  } else {
    return defaultColor;
  }
}

/**
 * [ used to provide styles for input field]
 * @type {styled component}
 */
const Input = styled.input`
  background-color: ${props => (props.disabled ? props.theme.disabled : props.theme.inputBackground)};
  border-radius: 4px;
  border: 1px solid ${props => borderColor(props, props.theme.border)};
  color: ${props => (props.disabled ? props.theme.disabledText : props.theme.text)};
  height: 24px;
  padding: 6px 8px;

  &:hover {
    border-color: ${props => borderColor(props, props.theme.blueHover)};
  }

  &:focus {
    border-color: ${props => borderColor(props, props.theme.blue)};
  }

  &:disabled {
    background-color: ${props => props.theme.disabled};
    color: ${props => props.theme.disabledText};
  }
`;
/**
 * [used to render component view]
 */
export default Input;
