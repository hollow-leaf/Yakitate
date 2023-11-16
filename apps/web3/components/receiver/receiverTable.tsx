import ReceiverTableItem from "./receiverTableItem";


function ReceiverTable(props: any) {

    console.log(props.foods)
  return (
    <>
        <div className="bg-white bg-opacity-50 shadow-lg backdrop-blur-2xl border-1 border-white border-opacity-20 rounded-2xl">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">Food Available</h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {
                props.foods.map((item:any)=>{
                    return <ReceiverTableItem amount={item.amount} id={item.id} name={item.name} provider={item.provider} total={item.total} url={item.url} key={item.id}/>
                })
              }
            </div>
          </div>
        </div>
    </>
        
    )
    
}

export default ReceiverTable;