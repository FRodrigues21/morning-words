import React from "react";
import {
  FormGroup,
  FormControl,
  HelpBlock,
  ButtonToolbar,
  Button,
  ProgressBar
} from "react-bootstrap";
import sentiment from "sentiment";

const getSentiment = words => {
  let Sentiment = new sentiment();
  console.dir(Sentiment.analyze(words));
  return Sentiment.analyze(words).score > 0;
};

const Editor = ({
  data: { words, disabled, updated },
  minLength,
  onChange,
  onSubmit,
  onStats
}) => {
  const length = words ? words.match(/\S+/g).length : 0;
  const percentage = words ? Math.floor((length * 100) / minLength) : 0;
  return (
    <form>
      <ProgressBar
        now={percentage}
        label={`${percentage}% (${length})`}
        bsStyle={length >= minLength ? "success" : null}
      />
      <FormGroup controlId="formControlsTextarea">
        <FormControl
          name="words"
          value={words}
          onChange={onChange}
          componentClass="textarea"
          placeholder="Write here, let's go!"
          rows={20}
          readOnly={disabled}
        />
      </FormGroup>
      <HelpBlock>
        Your words of the day are stored locally, and can only be viewed on this
        browser.
      </HelpBlock>
      <ButtonToolbar>
        <Button bsStyle="primary" onClick={onSubmit}>
          {updated ? `Saved at ${updated}` : "Save"}
        </Button>

        <Button bsStyle={getSentiment(words) ? "success" : "danger"}>
          Sentiment: {getSentiment(words) ? "Positive" : "Negative"}
        </Button>
      </ButtonToolbar>
    </form>
  );
};

export default Editor;
