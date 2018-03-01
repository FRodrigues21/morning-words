import React, { Component } from 'react';
import moment from 'moment';
import { Grid, PageHeader } from 'react-bootstrap';
import { Editor } from '../components';

const currentDay = moment().format('YYYY/MM/DD');

class Home extends Component {
  state = {
    minLength: 750,
    editor: {}
  };

  componentDidMount = () => {
    if (localStorage.getItem(`mw_${currentDay}`) != null)
      this.setState({
        editor: {
          ...this.state.editor,
          words: localStorage.getItem(`mw_${currentDay}`)
        }
      });
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ editor: { ...this.state.editor, [name]: value } });
  };

  onSubmit = () => {
    localStorage.setItem(`mw_${currentDay}`, this.state.editor.words);
    let _currentTime = moment().format('HH:mm:ss');
    this.setState({ editor: { ...this.state.editor, updated: _currentTime } });
  };

  render = () => {
    return (
      <Grid>
        <PageHeader>
          Morning Words <small>Free your mind in 750 words</small>
        </PageHeader>
        <Editor
          data={this.state.editor}
          minLength={this.state.minLength}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
      </Grid>
    );
  };
}

export default Home;
