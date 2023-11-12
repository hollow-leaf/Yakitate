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
            Address:
            <Input type="text"/>
            <br/>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Submit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  