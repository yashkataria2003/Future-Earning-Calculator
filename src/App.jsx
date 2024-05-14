import Form from "./Components/Form/Form"
import ReactPlayer from 'react-player'
import Background from '../src/assets/Background.mp4'

const App = () => {
  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh]  px-[1vw] py-[2vh] overflow-hidden">
      <div className="flex justify-center items-center py-[1vh] h-[100vh] w-[100vw] relative">
        <ReactPlayer
          url={Background} // Change 'temp' to the actual path of your video file
          playing
          loop
          muted
          width="100vw"
          height="" // Adjust the height to your desired size
          className=""
        />
        <Form />
      </div>

    </div>
  )
}

export default App
