import classes from './MeetupDetail.module.css';

const MeetupDetail = (props) => {
  return (
    <sextion className={classes.detail}>
      <img src={props.image} alt={props.title} />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </sextion>
  );
};

export default MeetupDetail;
