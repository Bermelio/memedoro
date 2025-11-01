import { useState, useEffect } from "react";

function MainLogic() {
  //hardcode first version
  const workTime = 2 * 60;
  const breakTime = 1 * 60;

  const [time, setTime] = useState(workTime); //25m, make it custom 
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<"work" | "break">("work");
  const [cycles, setCycles] = useState(0);
  


  useEffect(() =>{
    let timer:number;
    if(isActive){
      timer = setInterval(() => {
        setTime((prev) => {
          if(prev === 1) {
            handleTimerEnd();
            return 0
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer)
  }, [isActive]);

  const handleTimerEnd = () => {
    setIsActive(false);
    if (mode === "work"){
      setMode("break");
      setTime(breakTime);
    }else{
      setMode("work");
      setTime(workTime);
      setCycles((c) => c + 1);
    }
  };

  const formatTime = () => {
    const min = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
    const sec = (time % 60)
    .toString()
    .padStart(2, "0");
    return `${min}:${sec}`;
  };

  const handleReset = () => {
    setIsActive(false)
    setTime( mode === "work" ? workTime : breakTime);
    setMode("work");
  };

  return (
    <>
      <div className="flex flex-col justify-center align-middle pt-13">
        <h2 className="flex align-middle justify-center text-2xl">Hora de {mode === "work" ? "labubu" : "dormir"}</h2>
        <p className="flex justify-center pt-10 text-8xl">{formatTime()}</p>
        
        <div className=" flex justify-center m-12">
          <button className="p-10" onClick={() => setIsActive(!isActive)}>
            {isActive ? "STOP" : "PLAY" }
          </button>
          <button className="p-10" onClick={handleReset}>RESET</button>
        </div>

        <p>Vueltas: {cycles}</p>
      </div>
    </>
  );
}

export default MainLogic;