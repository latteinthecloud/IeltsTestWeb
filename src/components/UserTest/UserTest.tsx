import React, { useRef, useState } from "react";
import StartButton from "../StartButton/StartButton.tsx";
import RoundedButton from "../RoundedButton/RoundedButton.tsx";
import userTestApi from "../../api/userTestApi.tsx";
interface UserTestProps {
  id: number;
  name: string;
  type: string;
  skill: string;
  createDate: string;
  setModify: any;
}

export default function UserTest({
  id,
  name,
  type,
  skill,
  createDate,
  setModify,
}: UserTestProps) {

  const inputRef = useRef<HTMLInputElement>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [testName, setTestName] = useState(name);
  const [deleted, setDeleted] = useState(false);


  const handleChangeName = async () => {
    if (inputRef.current) {
      try {
        await userTestApi.updateName(id, inputRef.current.value);
        setOpenEdit(false);
        setTestName(inputRef.current.value);
        setModify(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.warn("Invalid input ref");
    }
  };

  const handleDelete = async () => {
    try{
      await userTestApi.delete(id);
      setDeleted(true);
      setModify(true);
    }
    catch(error)
    {
      console.log(error);
    }
  }
  
  return (
    <div hidden={deleted}>
      <div className="test-container">
        <div className="test">
          <img
            className="test-cover"
            src="https://inkythuatso.com/uploads/thumbnails/800/2022/03/avatar-chat-2-29-13-53-35.jpg"
            alt="cover"
          />

          <div className="info-container">
            <div style={{ display: "flex", justifyContent:"flex-start", alignItems: "center", gap: "10px"}}>
              <h2>{testName}</h2>
              <img src={require("../../assets/edit.png")} alt="edit-icon" onClick={() => setOpenEdit(true)} ></img>
            </div>
            <div className="type-container">
              <h4>{type}</h4>
              <h4>{createDate}</h4>
            </div>
            <div className="text-icon">
              {(skill === "Listening" && (
                <img
                  src={require("../../assets/headphones.png")}
                  alt="listening-iconcler"
                ></img>
              )) || (
                <img
                  src={require("../../assets/message-circle-dots.png")}
                  alt="reading-icon"
                ></img>
              )}
              <h3>{skill}</h3>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: "60px",
          }}
        >
          <i
            className="fa-regular fa-trash-can"
            style={{
              color: "red",
              fontSize: "24px",
              marginLeft: "60px",
            }}
            onClick={()=>setOpenDelete(true)}
          ></i>
          <StartButton id={id} skill={skill} testAccess="private"></StartButton>
        </div>
      </div>
      {
        openEdit &&
        <div className="overlay">
          <div className="popup-container" style={{ width: "250px"}}>
            <img src={require("../../assets/close.png")} alt="close-button" onClick={()=> setOpenEdit(false)}></img>
            <div style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px"}}>
              <div style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start"
              }}>
              <h1 style={{
                textAlign: "left",
                fontSize: "20px",
                color: "black"
              }}>
                Enter a new name
              </h1>
              <input type="text" style={{width: "90%"}} ref={inputRef} defaultValue={name}></input>
            </div>
            <RoundedButton
              title="Confirm"
              onClick={handleChangeName}>
            </RoundedButton>
          </div>
        </div>
      </div>
      }
      {
        openDelete &&
        <div className="overlay">
          <div className="popup-container" style={{ width: "250px"}}>
            <img src={require("../../assets/close.png")} alt="close-button" onClick={()=> setOpenDelete(false)}></img>
            <div style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
                marginTop: "10px"}}>
                <h1 style={{
                  fontSize: "20px",
                  color: "black"
                }}>
                Are you sure you want to delete this test?
                </h1>
              <div style={{ display: "flex", gap: "20px"}}>
              <RoundedButton
                title="No"
                colors={["#C9C9C9","#969696"]}
                onClick={()=> setOpenDelete(false)}>
              </RoundedButton>
              <RoundedButton
                title="Yes"
                colors={["#001A72","#1E1E1E"]}
                onClick={handleDelete}>
              </RoundedButton>
            </div>
          </div>
        </div>
      </div>
      }
    </div>
  );
}
