import { PeraWalletConnect } from "@perawallet/connect"
import { useEffect, useState,useRef } from "react";
import { useSelector,useDispatch } from "react-redux";
import { setLogout, setLogin } from "@/store/userSlice";

// Create the PeraWalletConnect instance outside of the component
export const peraWallet = new PeraWalletConnect(
  { chainId: 416002 }
);


export function Wallet() {
  const [accountAddress, setAccountAddress] = useState('');
  const isConnectedToPeraWallet = !!accountAddress;

  useEffect(() => {
    // Reconnect to the session when the component is mounted
    peraWallet.reconnectSession().then((accounts) => {
      // Setup the disconnect event listener
      peraWallet.connector?.on("disconnect", handleDisconnectWalletClick);

      if (accounts.length) {
        setAccountAddress(accounts[0]);
        dispatch(setLogin({address:accounts[0]}))
      }
    });
  }, []);

  const state = useSelector((state:any)=>state.user)
  
  const dispatch = useDispatch()
  return (
    <div className="text-white flex items-center space-x-4">
      <div>
        <p onClick={handleCopyClick}>{accountAddress}</p>
      </div>
      <div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={isConnectedToPeraWallet ? handleDisconnectWalletClick : handleConnectWalletClick}>
          {isConnectedToPeraWallet ? `Disconnect` : "Connect to Pera Wallet"}
        </button>
      </div>
    </div>
  );

  function handleConnectWalletClick() {
    peraWallet
      .connect()
      .then((newAccounts) => {
        // Setup the disconnect event listener
        peraWallet.connector?.on("disconnect", handleDisconnectWalletClick);   
        setAccountAddress(newAccounts[0]);
      })
      .catch((error) => {
        // You MUST handle the reject because once the user closes the modal, peraWallet.connect() promise will be rejected.
        // For the async/await syntax you MUST use try/catch
        if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
          // log the necessary errors
        }
      });
  }

  function handleDisconnectWalletClick() {
    peraWallet.disconnect();
    dispatch(setLogout())
    setAccountAddress("");
  }

  function handleCopyClick(){
        // Create a temporary input element
        const tempInput = document.createElement('textarea');
        tempInput.value = accountAddress;
    
        // Append the input element to the DOM
        document.body.appendChild(tempInput);
    
        // Select the text inside the input
        tempInput.select();
    
        try {
          // Execute the copy command
          document.execCommand('copy');
          alert('Address copied to clipboard!');
        } catch (err) {
          console.error('Unable to copy text', err);
        } finally {
          // Remove the temporary input element
          document.body.removeChild(tempInput);
        }
  }
}