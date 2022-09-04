import { Fragment } from 'react';
import Head from 'next/head';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';


function HomePage(props) {
    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta
                    name='description'
                    content='Browse a huge list of React Meetups'
                />
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>
    );
}

//Data fetching: pre-rendering on server end: Feature of nextJS
export async function getStaticProps() {
    //fetch data from API
    const client = await MongoClient.connect('mongodb+srv://vishh:vishH@cluster0.qxn9fyr.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();
    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 1
    };
}

export default HomePage;