import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import VenueTypeDropdown from "./VenueTypeDropdown";
import { useState } from "react";

const DualInput = ({ label, phStart, phEnd, value, setValue }) => {
  return (
    <div>
      <label className="leading-7 capitalize text-sm text-gray-600">
        {label}
      </label>
      <div className="flex gap-4">
        <input
          type="text"
          autoComplete="off"
          placeholder={phStart}
          value={value.start}
          onChange={(e) => {
            setValue({
              start: e.target.value,
              end: value.end,
            });
          }}
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
        <input
          type="text"
          autoComplete="off"
          placeholder={phEnd}
          value={value.end}
          onChange={(e) => {
            setValue({
              start: value.start,
              end: e.target.value,
            });
          }}
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
    </div>
  );
};

const SingleInput = ({ label, value, setValue }) => {
  return (
    <div>
      <label className="leading-7 capitalize text-sm text-gray-600">
        {label}
      </label>
      <div>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="off"
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
    </div>
  );
};

export default function AlertDialog({ open, setOpen }) {
  const [venueType, setVenueType] = useState("");
  const [venueName, setVenueName] = useState("");
  const [venueAddress, setVenueAddress] = useState("");

  const [venueCity, setVenueCity] = useState("");
  const [venueMobile, setVenueMobile] = useState("");
  const [capacity, setCapacity] = useState({
    start: "",
    end: "",
  });
  const [venueImage, setVenueImage] = useState("");
  const [venuePrice, setVenuePrice] = useState({
    start: "",
    end: "",
  });

  const handleClose = () => {
    setOpen(false);
  };
  const handleConfirm = () => {
    const obj = {
      venueType,
      venueName,
      venueAddress,
      venueCity,
      venueMobile,
      capacity,
      venueImage,
      venuePrice
     };
     console.log(obj);
}


  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="h-screen"
      >
        <div className="px-4 pt-4 font-medium text-2xl" id="alert-dialog-title">
          {"Register Venue"}
        </div>
        <div className="px-4 py-2">
          <VenueTypeDropdown value={venueType} setValue={setVenueType} />
          <SingleInput
            value={venueName}
            setValue={setVenueName}
            label="venue name"
          />
          <SingleInput
            value={venueAddress}
            setValue={setVenueAddress}
            label="address"
          />
          <SingleInput value={venueCity} setValue={setVenueCity} label="city" />
          <SingleInput
            value={venueMobile}
            setValue={setVenueMobile}
            label="Mobile No"
          />
          <DualInput
            value={capacity}
            setValue={setCapacity}
            phStart={"Min"}
            phEnd={"Max"}
            label="capacity"
          />
          <SingleInput
            value={venueImage}
            setValue={setVenueImage}
            label="image url"
          />
          <DualInput
            value={venuePrice}
            setValue={setVenuePrice}
            phStart={"veg"}
            phEnd={"non-veg"}
            label="price per plate"
          />
        </div>
        <div className="flex justify-end gap-3 p-4">
          <Button onClick={handleClose}>
            <div className=" capitalize text-gray-500">Cancel</div>
          </Button>
          <Button variant="contained" onClick={handleConfirm}>
            <div className="capitalize text-gray-50">Confirm</div>
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
