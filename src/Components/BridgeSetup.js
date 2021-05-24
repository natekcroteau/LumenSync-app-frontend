import BridgeConnected from './BridgeConnected'
import HueBridgeSetup from './HueBridgeSetup'


export default function BridgeSetup(props) {


    const { hueAddress, hueUsername, userState, setHueUsername } = props
 
    const showSetupComponent = () => !hueUsername ? 
            <HueBridgeSetup userState={userState} setHueUsername={setHueUsername} /> : 
            null 

    return (
        <div className='bridge-setup-component'>
            <BridgeConnected 
                hueAddress={hueAddress} 
                hueUsername={hueUsername} 
            />
            {showSetupComponent()}
        </div>
    )
}
