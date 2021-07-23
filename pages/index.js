import Head from 'next/head';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'First meetup',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg',
    address: 'Some address 5, 12345, Some City',
  },
  {
    id: 'm2',
    title: 'Second meetup',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg',
    address: 'Some address 7, 12345, Some City',
  },
  {
    id: 'm3',
    title: 'Third meetup',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg',
    address: 'Some address 9, 12345, Some City',
  },
  {
    id: 'm4',
    title: 'Fourth meetup',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg',
    address: 'Some address 1, 12345, Some City',
  },
];

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of active react meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </>
  );
};

// export async function getServerSideProps() {
//   /* Fetch some data */
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  /* Fetch data from an API */
  const client = await MongoClient.connect(
    'mongodb+srv://arynkr:aryn123@cluster0.tu0kh.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupCollection = db.collection('meetups');
  const meetups = await meetupCollection.find().toArray();

  client.close();
  return {
    props: {
      meetups: meetups.reverse().map((meetup) => ({
        title: meetup.title || null,
        address: meetup.address || null,
        image: meetup.image || null,
        id: meetup._id.toString() || null,
      })),
    },

    /* After how many seconds the this should be updated */
    revalidate: 1,
  };
}

export default HomePage;
