import { Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

export async function getStaticProps() {
  // fetch data from API

  const client = await MongoClient.connect(
    "mongodb+srv://imrantahir16:o7amo9Jy5LYDrygx@cluster0.g5cf3rs.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupCollection = db.collection("meetups");

  const meetups = await meetupCollection.find().toArray();

  client.close();

  // always return object which props property of object which hold other props
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
      })),
    },
    // below property will revalidate every second on server for incoming request
    revalidate: 1,
  };
}

// export async function getStaticProps(context) {
//   const req = context.req;
//   const res = context.res;
//   // fetch data from API

//   // always return object which props property of object which hold other props
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }
export default function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active react meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}
