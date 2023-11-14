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
} from "@/components/ui/alert-dialog-for-Provide"
import { Button } from "@/components/ui/button"
import { Input } from "../ui/input"
import { provide_food } from "@/service/provider/provider";
import { useState } from "react";

export function ProvideBtn() {
  const [inputcreator, setInputcreator] = useState<string>('');
  const [inputfood, setInputfood] = useState<string>('');
  const [inputamount, setInputamount] = useState<string>('');

  const handleInputcreator = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setInputcreator(e.target.value)
  }
  const handleInputfood = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setInputfood(e.target.value)
  }
  const handleInputamount = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setInputamount(e.target.value)
  }
  const handleSubmit = ()=>{
    const numberValue: number = parseInt(inputamount, 10);
    provide_food(inputcreator,inputfood,numberValue)
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Provide Food</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div>
          creator:
          <Input type="text" value={inputcreator} onChange={(e)=>handleInputcreator(e)} />
          food:
          <Input type="text" onChange={(e)=>handleInputfood(e)}/>
          amount:
          <Input type="text" onChange={(e)=>handleInputamount(e)}/>
          <br/>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Submit</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
