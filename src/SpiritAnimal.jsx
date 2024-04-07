
"use client";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";

function SpiritAnimal() {
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState('');

  function onCloseModal() {
    setOpenModal(false);
    setEmail('');
  }

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Get Star Wars Character</Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">What's Your Name?</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your name" />
              </div>
              <TextInput
                id="name"
                placeholder="Your Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div className="w-full">
              <Button>Submit</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default SpiritAnimal;

