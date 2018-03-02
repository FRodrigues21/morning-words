import React, { Component } from 'react';
import moment from 'moment';
import { Grid, PageHeader } from 'react-bootstrap';
import { Editor, MonthTimeline } from '../components';

const _moment = moment();
const INITIAL_EDITOR = { words: '', updated: null };
const formatDate = ({ year, month, day }) =>
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

  getWordsByDate = date => {
    if (this.state.history[formatDate(date)] != null)
      this.setState({
        editor: {
          ...this.state.editor,
          words: this.state.history[formatDate(date)]
        }
      });
    else this.setState({ editor: { ...this.state.editor, ...INITIAL_EDITOR } });
  };

  componentWillMount = () => {
    this.loadWords();
  };

  componentDidMount = () => {
    this.getWordsByDate(this.state.currentDate);
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ editor: { ...this.state.editor, [name]: value } });
  };

  onSubmit = () => {
    let _currentTime = moment().format('HH:mm:ss');
    this.setState(
      {
        editor: { ...this.state.editor, updated: _currentTime },
        history: {
          ...this.state.history,
          [formatDate(this.state.currentDate)]: this.state.editor.words
        }
      },
      () => localStorage.setItem('mw', JSON.stringify(this.state.history))
    );
  };

  // Check if goal was reached on a certain day of current year and month
  goalCheck = d => {
    let _item = this.state.history[
      formatDate({ ...this.state.currentDate, day: d })
    ];
    return _item != null && _item.match(/\S+/g).length >= this.state.minLength;
  };

  onDaySelect = d => {
    // Disable click on future days
    if (d <= _moment.format('D'))
      this.setState(
        {
          currentDate: { ...this.state.currentDate, day: d },
          editor: {
            ...this.state.editor,
            disabled: !(d === Number(_moment.format('D')))
          }
        },
        () => {
          this.getWordsByDate(this.state.currentDate);
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
            goalCheck={this.goalCheck}
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
