import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import LoggedPage from "@/layout/logged-page";
import Card from "@/components/card";

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
  return (
    <>
      <LoggedPage>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Card
              buttonClick={() => console.log("teste")}
              buttonText={"teste"}
              title={"teste"}
            />
            <Card
              buttonClick={() => console.log("teste")}
              buttonText={"teste"}
              title={"teste"}
            />
            <Card
              buttonClick={() => console.log("teste")}
              buttonText={"teste"}
              title={"teste"}
            />
            <Card
              buttonClick={() => console.log("teste")}
              buttonText={"teste"}
              title={"teste"}
            />
            <Card
              buttonClick={() => console.log("teste")}
              buttonText={"teste"}
              title={"teste"}
            />
            <Card
              buttonClick={() => console.log("teste")}
              buttonText={"teste"}
              title={"teste"}
            />
            <Card
              buttonClick={() => console.log("teste")}
              buttonText={"teste"}
              title={"teste"}
            />
            <Card
              buttonClick={() => console.log("teste")}
              buttonText={"teste"}
              title={"teste"}
            />
            <Card
              buttonClick={() => console.log("teste")}
              buttonText={"teste"}
              title={"teste"}
            />
            <Card
              buttonClick={() => console.log("teste")}
              buttonText={"teste"}
              title={"teste"}
            />
          </div>
        </div>
      </LoggedPage>
    </>
  );
}
