import React from 'react';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import Button from '@material-ui/core/Button'
import { styles } from "./styles";
import { components } from "./Helpers";

const suggestions = [
  { label: 'BarryBot' },
  { label: 'LuisBot' },
  { label: 'NikolaBot' },
  { label: 'VladaBot' },
  { label: 'AndreyaBot' },
  { label: 'KillerBot' },
  { label: 'NoobBot' },
  { label: 'ArgentinaBot' },
  { label: 'Use' },
  { label: 'Gitflow' },
  { label: 'Please' },
  { label: 'Santa Claus bot' },
  { label: 'ReactBot' },
  { label: 'Pavle' },
  { label: 'Filip' },
  { label: 'Vucicu pederu' },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
  rank: Math.random(),
}));


class Search extends React.Component {
  state = {
    single: null,
  };

  handleChange = name => value => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { classes, theme } = this.props;

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    };

    return (
      <div className={classes.root}>
        <NoSsr>
          <Select
            classes={classes}
            styles={selectStyles}
            options={suggestions}
            components={components}
            value={this.state.single}
            onChange={this.handleChange('single')}
            placeholder="Search financial being"
          />

          {this.state.single ?
            <div>
              <img src="https://placekitten.com/200/200" alt="" />
              <p>Bot name: {this.state.single.label}</p>
              <p>Bot rank: {this.state.single.rank}</p>
              <Button variant='contained' color='secondary' className={{ margin: theme.spacing.unit, marginTop: theme.spacing.unit * 3 }}>Go to profile</Button>
            </div>: ''}

        </NoSsr>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Search);
