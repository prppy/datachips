import Header from "./Header.jsx"
import AreaFreqDist from './AreaFreqDist.jsx'
import CrmCdFreqDist from "./CrmCdFreqDist.jsx"
import GenderPie from "./GenderPie.jsx"
import WeaponPie from "./WeaponPie"
import TimeHist from "./TimeHist.jsx"

function App() {
  return (
    <>
      <Header></Header>
      <div 
        style={{
          display: "flex", 
          flexDirection: "row", 
          alignItems: "center",
          padding: "20px"
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
        <WeaponPie></WeaponPie>
      </div>
      <div 
        style={{
          display: "flex", 
          flexDirection: "row", 
          alignItems: "center",
          padding: "20px"
        }}>
        <TimeHist></TimeHist>
      </div>
    </>
  )
}

export default App
