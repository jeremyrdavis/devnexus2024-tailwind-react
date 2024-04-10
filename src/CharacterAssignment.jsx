import { useState } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import axios from "axios";

export default function CharacterForm() {
  const [id, setId] = useState("");
  const [workflow, setWorkflow] = useState(0);
  const [name, setName] = useState("");
  const [characterName, setCharacterName] = useState("");
  const [whoIs, setWhoIs] = useState("");
  const [poem, setPoem] = useState("");
  const [updatedPoem, setUpdatedPoem] = useState("");
  const [prose, setProse] = useState("");
  const [isLiked, setIsLiked] = useState("");
  const [stage, setStage] = useState("");
  const [stars, setStars] = useState("");
  const [feedback, setFeedback] = useState("");

  async function assignCharacter() {
    const response = await fetch("http://localhost:8080/devnexus2024/assign", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: name,
    });

    const characterAssignment = await response.json();
    setId(characterAssignment.id);
    setName(characterAssignment.name);
    setCharacterName(characterAssignment.characterName);
    console.log(characterAssignment);
    return characterAssignment;
  }

  async function callWhoIs() {
    console.log("id: " + id);
    console.log("name: " + name);
    console.log("characterName: " + characterName);
    let bodyJson = {
      id,
      name,
      characterName,
      whoIs,
      poem,
      updatedPoem,
      isLiked,
    };

    const response = await fetch("http://localhost:8080/devnexus2024/whois", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyJson),
    });

    const characterAssignment = await response.json();
    console.log(characterAssignment);
    return characterAssignment;
  }

  async function callPoem() {
    console.log("id: " + id);
    console.log("name: " + name);
    console.log("characterName: " + characterName);
    console.log("whoIs: " + whoIs);
    let bodyJson = {
      id,
      name,
      characterName,
      whoIs,
      poem,
      updatedPoem,
      isLiked,
    };
    const response = await fetch("http://localhost:8080/devnexus2024/poem", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyJson),
    });

    const characterAssignment = await response.json();
    console.log(characterAssignment);
    return characterAssignment;
  }

  async function callUpdatedPoem() {
    console.log("id: " + id);
    console.log("name: " + name);
    console.log("characterName: " + characterName);
    console.log("whoIs: " + whoIs);
    console.log("poem: " + poem);
    let bodyJson = {
      id,
      name,
      characterName,
      whoIs,
      poem,
      updatedPoem,
      isLiked,
    };
    const response = await fetch(
      "http://localhost:8080/devnexus2024/addtopoem",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyJson),
      },
    );

    const characterAssignment = await response.json();
    setUpdatedPoem(characterAssignment.updatedPoem);
    return characterAssignment;
  }

  // 0
  async function handleSubmitName(e) {
    e.preventDefault();
    setName(CharacterForm.name.value);
    console.log("assigning character for " + name);
    let characterAssignment = await assignCharacter(name);
    console.log("received characterAssignment: " + characterAssignment);
    setCharacterName(characterAssignment.characterName);
    console.log("character assigned: " + characterAssignment.characterName);
    setWorkflow(1);
  }

  // 2
  async function handleSubmitWhoIs(e) {
    e.preventDefault();
    console.log("calling whoIs for " + characterName);
    let characterAssignment = await callWhoIs(characterName);
    console.log(characterAssignment);
    setWhoIs(characterAssignment.whoIs);
    console.log("whoIs assigned: " + characterAssignment.whoIs);
    setWorkflow(2);
  }

  // 3
  async function handleSubmitPoem(e) {
    e.preventDefault();
    console.log("submitting poem for " + characterName);
    let characterAssignment = await callPoem(characterName);
    console.log("received characterAssignment: " + characterAssignment);
    setPoem(characterAssignment.poem);
    setWorkflow(3);
  }

  // 4
  async function handleSubmitUpdatePoem(e) {
    e.preventDefault();
    console.log("submitting updated poem for " + characterName);
    let characterAssignment = await callUpdatedPoem(characterName);
    console.log("received characterAssignment: " + characterAssignment);
    setUpdatedPoem(characterAssignment.updatedPoem);
    setWorkflow(4);
  }

  // 5
  function handleSubmitProse(e) {
    e.preventDefault();
    setProse(proseText);
    setWorkflow(5);
  }

  // 6
  function handleFeedback(e) {
    e.preventDefault();
    setFeedback(feedback);
  }

  function handleSubmitLike(e) {
    e.preventDefault();
    setIsLiked(true);
    setWorkflow(6);
  }

  function handleSubmitDislike(e) {
    e.preventDefault();
    if (workflow === 1) {
      setWorkflow(2);
    } else if (workflow === 2) {
      setWorkflow(3);
    } else if (workflow === 3) {
      setWorkflow(4);
    } else if (workflow === 4) {
      setWorkflow(5);
    } else if (workflow === 5) {
      setWorkflow(6);
    }
    setIsLiked(false);
  }

  return (
    <div>
      {workflow === 0 && (
        <form id="nameForm" className="flex max-w-md flex-col gap-4 pt-20">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Your name" />
            </div>
            <TextInput
              id="name"
              placeholder="Your name"
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <Button type="submit" onClick={handleSubmitName}>
            Submit
          </Button>
        </form>
      )}
      {workflow === 1 && (
        <>
          <div className="pt-20">
            <p>Your Star Wars Spirit Charachter is {characterName}!</p>
            <p className="pt-10">Do you feel a bond with {characterName}?</p>
          </div>
          <form
            id="characterForm"
            className="flex max-w-md flex-col gap-4 pt-5"
          >
            <Button type="submit" onClick={handleSubmitLike}>
              Yes
            </Button>
            <Button type="submit" onClick={handleSubmitWhoIs}>
              No
            </Button>
            <Button type="submit" onClick={handleSubmitWhoIs}>
              Who is {characterName}?
            </Button>
          </form>
        </>
      )}
      {workflow === 2 && (
        <>
          <div className="pt-20">
            <p className="whitespace-pre-line">{whoIs}.</p>
            <p className="pt-10">
              Do you feel a bond with {characterName} now?
            </p>
          </div>
          <form
            id="characterForm"
            className="flex max-w-md flex-col gap-4 pt-5"
          >
            <Button type="submit" onClick={handleSubmitLike}>
              Yes
            </Button>
            <Button type="submit" onClick={handleSubmitPoem}>
              No
            </Button>
          </form>
        </>
      )}
      {workflow === 3 && (
        <>
          <p className="pt-20">Does the following poem change your mind?</p>
          <p className="whitespace-pre-line pt-10">{poem}</p>
          <form
            id="characterForm"
            className="flex max-w-md flex-col gap-4 pt-5"
          >
            <Button type="submit" onClick={handleSubmitLike}>
              Yes
            </Button>
            <Button type="submit" onClick={handleSubmitUpdatePoem}>
              No
            </Button>
          </form>
        </>
      )}
      {workflow === 4 && (
        <>
          <p className="pt-20">What if we added something to the poem?</p>
          <p className="whitespace-pre-line pt-10">{updatedPoem}</p>
          <form
            id="updatedPoemForm"
            className="flex max-w-md flex-col gap-4 pt-5"
          >
            <Button type="submit" onClick={handleSubmitLike}>
              Yes
            </Button>
            <Button type="submit" onClick={handleSubmitDislike}>
              No
            </Button>
          </form>
        </>
      )}
      {workflow === 5 && (
        <>
          <h1 className="bold pt-20 italic">May the Force be with You!</h1>
          <h2 className="bold pt-5">Enjoy Devnexus 20!</h2>
        </>
      )}
      {workflow === 6 && (
        <form id="feedbackForm">
          <textarea
            cols="50"
            rows="10"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Enter your feedback here..."
          />
          <button type="submit" onClick={handleFeedback}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
