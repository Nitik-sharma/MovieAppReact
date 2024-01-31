import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Card,
  Modal,
  Label,
  TextInput,
  Checkbox,
} from "flowbite-react";

function Show() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchShowDetail = async () => {
      try {
        const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
        setShow(response.data);
      } catch (error) {
        console.error("Error fetching show detail:", error);
      }
    };

    fetchShowDetail();
  }, [id]);
  console.log(show && show.image && show.image.medium);

  return (
    <div className="flex h-screen items-center justify-center p-4">
      {show ? (
        <Card href="#" className=" max-w-1xl ">
          <div className=" flex  gap-3  flex-col md:flex-row">
            <img src={show && show.image && show.image.medium} alt="" />
            <div>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {show.name}
              </h5>
              <p className="font-normal text-xl text-gray-700 dark:text-gray-400">
                {show.summary}
              </p>
            </div>
          </div>
          <Button
            gradientDuoTone="redToYellow"
            className="text-gray-700 text-xl"
            onClick={() => setOpenModal(true)}
          >
            Book your Ticket
          </Button>
        </Card>
      ) : (
        <p>Loading...</p>
      )}

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          Book Your Ticket of{" "}
          <span className="text-blue-800">{show?.name}</span>
        </Modal.Header>
        <Modal.Body>
          <form className="flex max-w-md flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Your Name" />
              </div>
              <TextInput id="name" type="text" placeholder="name" required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Your email" />
              </div>
              <TextInput
                id="email1"
                type="email"
                placeholder="name@flowbite.com"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Your password" />
              </div>
              <TextInput id="password1" type="password" required />
            </div>

            <Button type="submit">Submit</Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Show;
