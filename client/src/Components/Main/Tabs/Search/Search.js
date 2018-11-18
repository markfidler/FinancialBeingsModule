import React from 'react';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import Button from '@material-ui/core/Button'
import { styles } from "./styles";
import { components } from "./Helpers";
import {Query} from 'react-apollo';
import {FB_BY_NAME} from "../../../../GraphQL/Calls";
import BotCard from '../Browse/views/Card'

class Search extends React.Component {
  state = {
    single: null,
    queryBot: ''
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

          <Query query={FB_BY_NAME} variables={{ name: this.state.queryBot }}>
            {({ loading, error, data }) => {
              if(loading) return "Please wait, loading in progress..";
              if(error) return `Error! ${error.message}`;
              const suggestions = data.financialBeings_FinancialBeingsByPartialName.map(suggestion => ({
                name: suggestion.name,
                label: suggestion.name,
                id: suggestion.id,
                kind: suggestion.kind,
              }));
              return <Select
                classes={classes}
                styles={selectStyles}
                options={suggestions}
                components={components}
                value={this.state.single}
                onChange={this.handleChange('single')}
                placeholder="Search financial being"
              />
            }}
          </Query>

          {this.state.single ? <BotCard className={classes.singleBot} botInfo={this.state.single} /> : ''}

        </NoSsr>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Search);
