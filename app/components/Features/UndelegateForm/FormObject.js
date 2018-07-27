import React from 'react';

// core components
import GridItem from 'components/Grid/GridItem';
import Button from 'components/CustomButtons/Button';

import ToolForm from 'components/Tool/ToolForm';
import ToolInput from 'components/Tool/ToolInput';

const FormData = [
  {
    id: "name",
    label: "Stake Holder",
    placeholder: "Account that holds the stake",
  },
  {
    id: "owner",
    label: "Stake Owner",
    placeholder: "Account that controls the stake",
  },
  {
    id: "cpu",
    label: "CPU Stake (in EOS)",
    placeholder: "How much EOS to unstake",
  },
  {
    id: "net",
    label: "Net Stake (in EOS)",
    placeholder: "How much EOS to unstake",
  }
];

const FormObject = props => {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
  const formProps = {
    handleSubmit: handleSubmit,
    submitColor: "rose",
    submitText: "Undelegate",
  }
  return (
    <ToolForm {...formProps}>
      {FormData.map(form => {
        return (<ToolInput key={form.id} {...form} {...props}/>)
      })}
    </ToolForm>
  );
};

export default FormObject;
