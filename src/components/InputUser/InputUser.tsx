import * as React from 'react';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

interface IInputUser {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputUser: React.FC<IInputUser> = (props: IInputUser): JSX.Element => {
  const { handleChange } = props;
  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder="GITHUB username"
        aria-label="GITHUB username"
        aria-describedby="basic-addon2"
        onChange={handleChange}
      />
    </InputGroup>
  );
};

export default InputUser;
