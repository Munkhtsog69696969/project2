import "./css/Song.css"
import { useRef, useState, useEffect } from "react"
import axios from "axios";
import { AiOutlineHeart } from "react-icons/ai";

const baseURL = "http://localhost:7000";

export const Song = () => {
    const songNameInput = useRef("");

    const [songs, setSongs] = useState();

    const [songs1, setSongs1] = useState([]);

    const playlistId = localStorage.getItem("playlist");

    const number = useRef(0);

    //console.log(playlistId);

    useEffect(() => {
        axios.get(baseURL + "/songs")
            .then(async (res) => {
                setSongs(res.data);
            }).catch((err) => {
                console.log(err);
            })
    }, []);

    useEffect(() => {
        songs && songs.map((item, i) => {
            if (item.playlistId == playlistId) {
                songs1.push(item);
                setSongs1([...songs1]);
            }
        })
    }, [songs])

    // console.log(songs1);

    async function Done() {
        const name = songNameInput.current.value;
        if (name != "") {
            await axios.post(baseURL + "/songs", { name: name, playlistId: playlistId });
        }
    }

    function favSong(item) {
        let prevData=localStorage.getItem("songData");
        prevData=prevData+item.id;
        localStorage.setItem("songData",prevData);
        console.log(232)
    }

    console.log(localStorage.getItem("songData"));

    return (
        <div className="songs-container">
            <div className="song-container-inner">
                <p className="desc1">Song name</p>
                <input placeholder="Song name" ref={songNameInput} />
                <button className="song-button" onClick={Done}>Done</button>
                <div className="songs">
                    {
                        songs1 && songs1.map((item, i) => {
                            // console.log(item)
                            return (
                                <div className="div-song" key={i}>
                                    <div className="div-number">{i + 1}</div>
                                    <div className="div-name">
                                        {item.name}
                                        <AiOutlineHeart style={{ marginLeft: "20px" }} onClick={() => favSong(item)}></AiOutlineHeart>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}