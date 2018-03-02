import React, { Component } from 'react';
import moment from 'moment';
import { Grid, PageHeader } from 'react-bootstrap';
import { Editor, MonthTimeline } from '../components';

const _moment = moment();
const INITIAL_EDITOR = { words: '', updated: null };
const parseCurrentDate = ({ year, month, day }) =>
  moment(`${year}-${month}-${day}`, 'YYYY-MM-D').format('YYYY/MM/DD');

class Home extends Component {
  state = {
    minLength: 750,
    history: [],
    currentDate: {
      year: _moment.format('YYYY'),
      month: _moment.format('MM'),
      day: _moment.format('D')
    },
    editor: INITIAL_EDITOR
  };

  loadWords = () => {
    if (localStorage.getItem('mw') != null)
      this.setState({ history: JSON.parse(localStorage.getItem('mw')) });
  };

  getDateWords = date => {
    if (this.state.history[parseCurrentDate(date)] != null)
      this.setState({
        editor: {
          ...this.state.editor,
          words: this.state.history[parseCurrentDate(date)]
        }
      });
    else this.setState({ editor: INITIAL_EDITOR });
  };

  componentWillMount = () => {
    this.loadWords();
  };

  componentDidMount = () => {
    this.getDateWords(this.state.currentDate);
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ editor: { ...this.state.editor, [name]: value } });
  };

  onSubmit = () => {
    localStorage.setItem(
      'mw',
      JSON.stringify({
        ...this.state.history,
        [parseCurrentDate(this.state.currentDate)]: this.state.editor.words
      })
    );
    let _currentTime = moment().format('HH:mm:ss');
    this.setState({ editor: { ...this.state.editor, updated: _currentTime } });
  };

  onDaySelect = d => {
    // Disable click on future days
    if (d <= _moment.format('D'))
      this.setState(
        { currentDate: { ...this.state.currentDate, day: d } },
        () => {
          this.loadWords();
          this.getDateWords(this.state.currentDate);
        }
      );
  };

  render = () => {
    return (
      <Grid>
        <PageHeader>
          Morning Words <small>Free your mind in 750 words</small>
        </PageHeader>
        <center>
          <MonthTimeline
            {...this.state.currentDate}
            onDaySelect={this.onDaySelect}
          />
        </center>
        <br />
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
