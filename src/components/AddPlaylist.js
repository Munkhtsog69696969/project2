import "../components/css/AddPlaylist.css"
import { Link } from "react-router-dom";
import { useRef } from "react";
import { client } from "../client";


export const AddPlaylist = () => {
    const inputTitle = useRef("");

    const userId = window.localStorage.getItem("user");


    async function Done() {
        const title = inputTitle.current.value;

        await client.post("/playlists", { title: title, date: new Date().toLocaleString(), creatorId: userId });
    }

    return (
        <div className="AddPlaylist-container">
            <div className="inner">
                <p className="desc">Create Playlist</p>

                <div style={{ margin: "30px" }}>
                    <p className="desc">PlayList title</p>
                    <input placeholder="Title" ref={inputTitle} />
                </div>

                <Link to="/playlists" onClick={Done} className="done">Done</Link>
            </div>
        </div>
    )
}