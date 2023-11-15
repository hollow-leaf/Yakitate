import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog-for-register"
import { Button } from "@/components/ui/button"
import { Input } from "../ui/input"
import {register, provider_list} from "../../service/provider/provider"
import {peraWallet} from "../../service/perawallet"
  
export function RegitsterBtn() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Register</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div>
          Address:
          <Input type="text"/>
          <br/>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={()=>
            {
              if(peraWallet.connector?.accounts[0]){
                register(peraWallet.connector?.accounts[0])
                provider_list()
              }else{
                console.log(peraWallet.isConnected)
                console.log("not connect")
              }
            }
          }>Submit</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
  