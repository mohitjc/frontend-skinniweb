import React from "react";
import HtmlT from "./html";

const SelectDropdown = ({
  intialValue,
  options,
  isSingle,
  valueType = "string",
  className = "capitalize",
  inputValue = "",
  onInputChange = (e: any) => {},
  result,
  crossIcon=true,
  displayValue = "name",
  id,
  placeholder = "Select Status",
  disabled = false,
  name,
  required = false,
  theme = "normal",
  hideDefaultPosition,
}: any) => {
  const handleChange = (e: any) => {
    let v = e;
    if (valueType == "object") {
      v = options.find((itm: any) => itm.id == e);
    }
    result({ event: "value", value: v });
  };

  return (
    <>
      <HtmlT
        id={id}
        className={className}
        name={name}
        required={required}
        inputValue={inputValue}
        onInputChange={onInputChange}
        crossIcon={crossIcon}
        theme={theme}
        disabled={disabled}
        placeholder={placeholder}
        isSingle={isSingle}
        displayValue={displayValue}
        options={options}
        selectedValues={intialValue}
        handleChange={handleChange}
        hideDefaultPosition={hideDefaultPosition}
      />
    </>
  );
};

export default SelectDropdown;
