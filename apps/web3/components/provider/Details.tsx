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
  
  export function DetailsBtn() {
    
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="secondary">Details</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="">
          <AlertDialogHeader>
            <AlertDialogTitle>NFT Contents</AlertDialogTitle>
            <AlertDialogDescription>
              {}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  