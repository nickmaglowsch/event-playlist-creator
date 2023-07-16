import React, { useRef, useState } from "react";
import { api } from "@/utils/api";
import LoggedPage from "@/layout/logged-page";
import CreateEvent from "@/components/create-event";
import SimplePaginate from "@/components/simple-paginate";
import Card from "@/components/card";

const MyEvents = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [offset, setOffset] = useState(0);
  const limit = 16;
  const myEvents = api.event.getMyEvents.useQuery({
    offset: offset,
    limit: limit,
  });

  const showModal = () => {
    if (modalRef.current) modalRef.current.showModal();
  };

  if (!myEvents || !myEvents.data) {
    return null;
  }

  return (
    <>
      <LoggedPage>
        <CreateEvent modalRef={modalRef} />

        <div className="mb-5 flex justify-center">
          <button className="btn btn-secondary" onClick={() => showModal()}>
            Criar Evento
          </button>
        </div>
        <h1 className="mb-5 text-center text-2xl text-gray-300">
          Meus Eventos
        </h1>
        <SimplePaginate
          isLastPage={() => myEvents.data.length < 16}
          isFirstPage={() => offset === 0}
          backButtonClick={() =>
            setOffset((prevState) => prevState - myEvents.data.length)
          }
          forwardButtonClick={() => setOffset((prevState) => prevState + 16)}
        >
          {myEvents.data.map(({ name, eventDate, id }) => (
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
};

export default MyEvents;
