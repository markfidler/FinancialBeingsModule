import React, {Component} from "react";
import {Query} from 'react-apollo';
import BannerTopBar from '../BannerTopBar';
import Typography from '@material-ui/core/Typography';
import {FB_BY_ID} from "../../GraphQL/Calls";


class Profile extends Component {

  render() {
    const {id} = this.props.match.params;
    return (
      <div>
        <BannerTopBar
          size='medium'
          title='Financial Beings'
          text='Bot profile'
          backgroundUrl='https://aacorporatesitedevelop.azurewebsites.net/img/photos/events.jpg'
        />
        <Typography variant="h4" gutterBottom>
          Bot name
        </Typography>
        <Query query={FB_BY_ID} variables={{id}}>
          {({loading, error, data}) => {
            if(loading) return "Please wait, loading in progress..";
            if(error) return `Error! ${error.message}`;
            const data = data.financialBeings_FinancialBeingsByID;
            return (
              <div>
                <Typography variant="h4" gutterBottom>{data.name}</Typography>
              </div>
            )
          }}
        </Query>
      </div>
    )
  }
}

export default Profile;
