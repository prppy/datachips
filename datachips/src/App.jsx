import Header from "./Header.jsx"
import AreaFreqDist from './AreaFreqDist.jsx'
import CrmCdFreqDist from "./CrmCdFreqDist.jsx"
import GenderPie from "./GenderPie.jsx"

function App() {
  return (
    <>
      <Header></Header>
      <div 
        style={{
          display: "flex", 
          flexDirection: "row", 
          alignItems: "center",
        }}>
        <AreaFreqDist></AreaFreqDist>
        <CrmCdFreqDist></CrmCdFreqDist>
      </div>
      <div 
        style={{
          display: "flex", 
          flexDirection: "row", 
          alignItems: "center",
        }}>
        <GenderPie></GenderPie>
        <CrmCdFreqDist></CrmCdFreqDist>
      </div>
    </>
  )
}

export default App
