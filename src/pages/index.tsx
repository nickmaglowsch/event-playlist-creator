import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import LoggedPage from "@/layout/logged-page";
import Card from "@/components/card";
import {
  BiSolidSkipNextCircle,
  BiSolidSkipPreviousCircle,
} from "react-icons/bi";
import SimplePaginate from "@/components/simple-paginate";
import { api } from "@/utils/api";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import CreateEvent from "@/components/create-event";

export default function Home() {
  const { status } = useSession();

  if (status === "unauthenticated") {
    return (
      <>
        <Head>
          <title>Eventos Playlist</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div
          className="hero min-h-screen"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/2381596/pexels-photo-2381596.jpeg)",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">As melhores Playlists</h1>
              <p className="mb-5">
                Crie e ache eventos onde você sabe que vai curtir a música!!
              </p>
              <button className="btn btn-primary" onClick={() => void signIn()}>
                Entre Com o Spotify
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (status === "authenticated") {
    return <LoggedHome />;
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <span className="loading loading-bars loading-lg"></span>
    </div>
  );
}

function LoggedHome() {
  const [offset, setOffset] = useState(0);
  const limit = 16;
  const generalEvents = api.event.getAll.useQuery({
    offset: offset,
    limit: limit,
  });

  if (!generalEvents || !generalEvents.data) {
    return null;
  }

  return (
    <>
      <LoggedPage>
        <h1 className="mb-5 text-center text-2xl text-gray-300">Em Alta</h1>
        <SimplePaginate
          isLastPage={() => generalEvents.data.length < 16}
          isFirstPage={() => offset === 0}
          backButtonClick={() =>
            setOffset((prevState) => prevState - generalEvents.data.length)
          }
          forwardButtonClick={() => setOffset((prevState) => prevState + 16)}
        >
          {generalEvents.data.map(({ name, eventDate, id }) => (
            <Card
              key={id}
              title={name}
              buttonClick={() => console.log("TODO")}
              buttonText="Ver mais"
            >
              <p>{eventDate.toLocaleString()}</p>
            </Card>
          ))}
        </SimplePaginate>
      </LoggedPage>
    </>
  );
}
