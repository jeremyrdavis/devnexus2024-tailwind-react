import { useState } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import axios from "axios";

export default function CharacterForm() {
  const [workflow, setWorkflow] = useState(0);
  const [name, setName] = useState("");
  const [character, setCharacter] = useState("");
  const [whoIs, setWhoIs] = useState("");
  const [poem, setPoem] = useState("");
  const [updatedPoem, setUpdatedPoem] = useState("");
  const [prose, setProse] = useState("");
  const [liked, setLiked] = useState("");
  const [stage, setStage] = useState("");
  const [stars, setStars] = useState("");
  const [feedback, setFeedback] = useState("");

  async function assignCharacter() {
    const response = await fetch("http://localhost:8080/devnexus2024/assign", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type" : "application/json",
      },
      body: name,
    }
    );

    const characterAssignment = await response.json();
    console.log(characterAssignment);
    return characterAssignment;
  }

  async function callWhoIs(){
    const response = await fetch("http://localhost:8080/devnexus2024/whois", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type" : "application/json",
      },
      body: name,
    }
    );

    const characterAssignment = await response.json();
    console.log(characterAssignment);
    return characterAssignment;
  }

  async function callPoem(){    
    const response = await fetch("http://localhost:8080/devnexus2024/poem", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type" : "application/json",
      },
      body: name,
    }
    );

    const characterAssignment = await response.json();
    console.log(characterAssignment);
    return characterAssignment;
  }

  async function callUpdatedPoem(){
    const response = await fetch("http://localhost:8080/devnexus2024/addtopoem", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type" : "application/json",
      },
      body: name,
    }
    );

    const characterAssignment = await response.json();
    console.log("received response: " + characterAssignment);
    return characterAssignment;
  }
  
  // 0
  async function handleSubmitName(e) {
    e.preventDefault();
    setName(CharacterForm.name.value);
    console.log("assigning character for " + name);
    let characterAssignment = await assignCharacter(name);
    console.log("received characterAssignment: " + characterAssignment);
    setCharacter(characterAssignment.characterName);
    console.log("character assigned: " + characterAssignment.characterName);
    setWorkflow(1);
  }

  // 2
  async function handleSubmitWhoIs(e) {
    e.preventDefault();
    console.log("calling whoIs for " + character);
    let characterAssignment = await callWhoIs(character);
    console.log("received characterAssignment: " + characterAssignment);
    setWhoIs(characterAssignment.whoIs);
    console.log("whoIs assigned: " + characterAssignment.whoIs);
    setWorkflow(2);
  }

  // 3
  async function handleSubmitPoem(e) {
    e.preventDefault();
    console.log("submitting poem for " + character);
    let characterAssignment = await callPoem(character);
    console.log("received characterAssignment: " + characterAssignment);
    setPoem(characterAssignment.poem);
    setWorkflow(3);
  }

  // 4
  async function handleSubmitUpdatePoem(e) {
    e.preventDefault();
    console.log("submitting updated poem for " + character);
    let characterAssignment = await callUpdatedPoem(character);
    console.log("received characterAssignment: " + characterAssignment);
    setUpdatedPoem(updatedPoemText);
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
    setLiked(true);
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
    setLiked(false);
  }

  return (
    <div>
      {workflow === 0 && (
        <form id="nameForm" className="flex max-w-md flex-col gap-4">
        <div>
        <div className="mb-2 block">
            <Label htmlFor="name" value="Your name" />
        </div>
        <TextInput id="name" placeholder="Your name" required onChange={(e) => {
              setName(e.target.value);
            }} />
        </div>
        <Button type="submit" onClick={handleSubmitName}>Submit</Button>
    </form>
    )}
      {workflow === 1 && (
        <>
        <div>
            <p>Your Star Wars Spirit Charachter is {character}!</p>
            Do you feel a bond with {character}?
        </div>
        <form id="characterForm" className="flex max-w-md flex-col gap-4">
            <Button type="submit" onClick={handleSubmitLike}>
                Yes
            </Button>
            <Button type="submit" onClick={handleSubmitWhoIs}>
                No
            </Button>
            <Button type="submit" onClick={handleSubmitWhoIs}>
                Who is {character}?
            </Button>
        </form>
        </>
    )}
      {workflow === 2 && (
        <>
        <p>{ character } is { whoIs }. Do you feel a bond with { character} now?</p>
        <form id="characterForm" className="flex max-w-md flex-col gap-4">
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
        <p>Does the following poem change your mind?</p>
        <p>{ poem }</p>
        <form id="characterForm" className="flex max-w-md flex-col gap-4">
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
        <WorkflowForm
          workflow={workflow}
          text={updatedPoemText}
          handleSubmitLike={handleSubmitLike}
          handleSubmitDislike={handleSubmitDislike}
        />
      )}
      {workflow === 5 && (
        <WorkflowForm
          workflow={workflow}
          text={proseText}
          handleSubmitLike={handleSubmitLike}
          handleSubmitDislike={handleSubmitDislike}
        />
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
