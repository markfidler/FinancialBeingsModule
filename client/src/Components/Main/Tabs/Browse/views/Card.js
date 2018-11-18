import React from 'react';
import { Link } from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {PROFILE} from "../../../../../constants/routes";

const styles = {
  card : {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  bot  : {
    textTransform: 'capitalize'
  }
};

function MediaCard(props) {
  const {classes, botInfo} = props;
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={botInfo.avatar || "https://msdnshared.blob.core.windows.net/media/2018/03/hero5.png"}
          title="Trading bot"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" className={classes.bot} component="h2">{botInfo.name}</Typography>
          <Typography component="p">
            In here should go some kind of bot description. Something like:
            Sub-Zero is a formidable fighter possessing the innate ability to control ice in many forms and whose
            defining character trait is his fierce rivalry with his nemesis Scorpion.
          </Typography>
          <br/>
          <Typography variant="button" gutterBottom>
            {`Type: ${botInfo.type}`}
          </Typography>
          <Typography variant="button" gutterBottom>
            {`Creator: ${botInfo.creator}`}
            </Typography>
          <Typography variant="button" gutterBottom>
            {`Team: ${botInfo.team || 'Unknown'}`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          <Link style={ { color: '#303036', textDecoration: 'none' } } to={`${PROFILE}/${botInfo.id}`}>View profile</Link>
        </Button>
        <Button size="small" color="primary">
          Fork
        </Button>
      </CardActions>
    </Card>
  );
}

export default withStyles(styles)(MediaCard);
