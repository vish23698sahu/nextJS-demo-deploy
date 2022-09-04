import { Fragment } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

function NewMeetupPage() {
    const router = useRouter();

    async function addMeeupHandler(enteredMeetupData) {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log(data);

        router.push('/');
    }

    return (<Fragment>
        <Head>
            <title>Add new Meetup</title>
            <meta
                name='description'
                content='Add your own new meetup'
            />
        </Head>
        <NewMeetupForm onAddMeetup={addMeeupHandler} />
    </Fragment>);
};

export default NewMeetupPage;