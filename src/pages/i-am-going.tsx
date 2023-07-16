import React, { useState } from "react";
import { api } from "@/utils/api";
import LoggedPage from "@/layout/logged-page";
import SimplePaginate from "@/components/simple-paginate";
import Card from "@/components/card";

const IAmGoing = () => {
  const [offset, setOffset] = useState(0);
  const limit = 16;
  const eventsIamGoing = api.event.getEventsIamGoing.useQuery({
    offset: offset,
    limit: limit,
  });

  if (!eventsIamGoing || !eventsIamGoing.data) {
    return null;
  }

  return (
    <>
      <LoggedPage>
        <h1 className="mb-5 text-center text-2xl text-gray-300">
          Eventos Confirmados
        </h1>
        <SimplePaginate
          isLastPage={() => eventsIamGoing.data.length < 16}
          isFirstPage={() => offset === 0}
          backButtonClick={() =>
            setOffset((prevState) => prevState - eventsIamGoing.data.length)
          }
          forwardButtonClick={() => setOffset((prevState) => prevState + 16)}
        >
          {eventsIamGoing.data.map(({ name, eventDate, id }) => (
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

export default IAmGoing;
