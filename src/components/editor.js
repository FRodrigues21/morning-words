import React from 'react';
import {
  FormGroup,
  FormControl,
  HelpBlock,
  ButtonToolbar,
  Button,
  ProgressBar
} from 'react-bootstrap';

const Editor = ({
  data: { words, updated },
  minLength,
  onChange,
  onSubmit
}) => {
  const length = words ? words.match(/\S+/g).length : 0;
  const percentage = words ? Math.floor(length * 100 / minLength) : 0;
  return (
    <form>
      <ProgressBar
        now={percentage}
        label={`${percentage}% (${length})`}
        bsStyle={length >= minLength && 'success'}
      />
      <FormGroup controlId="formControlsTextarea">
        <FormControl
          name="words"
          value={words}
          onChange={onChange}
          componentClass="textarea"
          placeholder="Write here, let's go!"
          rows={20}
        />
      </FormGroup>
      <HelpBlock>
        Your words of the day are stored locally, and discarded the next day.
      </HelpBlock>
      <ButtonToolbar>
        <Button bsStyle="primary" onClick={onSubmit}>
          {updated ? `Saved at ${updated}` : 'Save'}
        </Button>
      </ButtonToolbar>
    </form>
  );
};

export default Editor;
