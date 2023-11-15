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
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { useSelector } from "react-redux";
import { food_available } from "../FoodInfo";
import React from "react";
  
  export function DetailsBtn() {
    const [data, setData] = React.useState({})
    const [address, setAddress] = React.useState<string[]>([''])
    const state = useSelector((state: any) => state.user);
  
    React.useEffect(() => {
      setAddress([state.wallet.address])
    }, [state.wallet.address])
  
    if (Object.values(address)[0] !== '') {
      food_available([state.wallet.address]).then((res) => {
        setData(res)
      }).catch((error) => {
        console.log('Error', error)
      })
    } else {
      console.log('connecting...')
    }
console.log(Object.values(data))
const result = Object.values(data).map((item:any,index:number)=>(
  <AlertDialog key={index}>
  <AlertDialogTrigger asChild>
    <Button variant="secondary">Details</Button>
  </AlertDialogTrigger>
  <AlertDialogContent className="">
    <AlertDialogHeader>
      <AlertDialogTitle>Food Contents</AlertDialogTitle>
      <AlertDialogDescription>
      <li>{item}</li>
</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
))
    return (<>
      {result}
      </>
    )
  }
  