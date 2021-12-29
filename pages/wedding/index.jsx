import dbConnect from "../../db/utils/dbConnect.js";
import { WeddingVenue } from "../../db/model/Venue";
import { EventProvider } from "../../context/EventContext";
import { UserContext } from "../../context/Users";
import { useContext } from "react";
import { CircularProgress } from "@mui/material";
import Event from "../../components/Events/Event";
import EventName from "../../components/Misc/EventName";
import { useState } from "react";


const WeddingPage = ({ venues }) => {
  const user = useContext(UserContext);
  const [showModal, setShowModal] = useState(true);
  
  return (
    <>
      {user ? (
        <EventProvider>
          <div>
            <Event venues={venues} type="wedding" />
          </div>
        </EventProvider>
      ) : (
        <div className="flex h-screen w-screen fixed justify-center items-center text-xl text-center">
          <CircularProgress />
        </div>
      )}
      <EventName
        showModal={showModal}
        setShowModal={setShowModal}
        title="Enter Event Name"
      />
    </>
  );
};

export default WeddingPage;

export async function getStaticProps() {
  dbConnect();

  let data = await WeddingVenue.find({});
  let venues = JSON.parse(JSON.stringify(data));

  if (!venues) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      venues,
    },
  };
}
