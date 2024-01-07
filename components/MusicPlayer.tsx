import { useEffect, useState } from "react";
import useSound from "use-sound";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";
import Image from "next/image";

interface MusicPlayerProps {
  url: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ url }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState({
    min: "",
    sec: "",
  });
  const [currTime, setCurrTime] = useState({
    min: "",
    sec: "",
  });

  const [seconds, setSeconds] = useState();

  const [play, { pause, duration, sound }] = useSound(url);

  useEffect(() => {
    if (duration) {
      const sec = duration / 1000;
      const min = Math.floor(sec / 60);
      const secRemain = Math.floor(sec % 60);
      setTime({
        min: min as unknown as string,
        sec: secRemain as unknown as string,
      });
    }
  }, [isPlaying,duration]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek([]));
        const min = Math.floor(sound.seek([]) / 60) as unknown as string;
        const sec = Math.floor(sound.seek([]) % 60) as unknown as string;
        setCurrTime({
          min,
          sec,
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sound]);

  const playingButton = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="component p-5">
      <div className="p-4">
        <div className="flex flex-col items-center justify-center">
          <Image
            alt=""
            height={180}
            width={180}
            className="rounded-lg "
            src="https://www.altnews.in/wp-content/themes/newsbeat/images/wp-includes/images/media/audio.png"
          />
          <input
            type="range"
            min="0"
            max={duration! / 1000}
            value={seconds}
            className="timeline my-2"
            onChange={(e) => {
              sound.seek([e.target.value]);
            }}
          />
          <div className="flex flex-row gap-3">
            <button className="playButton">
              <IconContext.Provider value={{ size: "3em", color: "#0EA5E9" }}>
                <BiSkipPrevious />
              </IconContext.Provider>
            </button>
            {!isPlaying ? (
              <button className="playButton" onClick={playingButton}>
                <IconContext.Provider value={{ size: "3em", color: "#0EA5E9" }}>
                  <AiFillPlayCircle />
                </IconContext.Provider>
              </button>
            ) : (
              <button className="playButton" onClick={playingButton}>
                <IconContext.Provider value={{ size: "3em", color: "#0EA5E9" }}>
                  <AiFillPauseCircle />
                </IconContext.Provider>
              </button>
            )}
            <button className="playButton">
              <IconContext.Provider value={{ size: "3em", color: "#0EA5E9" }}>
                <BiSkipNext />
              </IconContext.Provider>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
