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
        <Button variant="outline" onClick={()=>
            {
              if(peraWallet.connector?.accounts[0]){
                try{
                  register(peraWallet.connector?.accounts[0]).catch(err=>{
                    alert("You have registered!")
                  })
                }catch(err){
                  alert("You have registered!")
                }
              }else{
                console.log(peraWallet.isConnected)
                console.log("not connect")
              }
            }
          }>Register</Button>
      </AlertDialogTrigger>
      
    </AlertDialog>
  )
}
  