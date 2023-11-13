from pyteal import *

handle_creation = Seq(App.globalPut(Bytes("MemberIndex"), Int(0)),
                      Approve())

router = Router(
    "state manipulation",
    BareCallActions(
        no_op=OnCompleteAction.create_only(handle_creation),
        opt_in=OnCompleteAction.call_only(Approve()),
        close_out=OnCompleteAction.call_only(Approve()),
    ),
    clear_state=Approve(),
)

### Global State Operations ###
@router.method
def writeGlobal(quote: abi.Uint64):
    return App.globalPut(Bytes("membercount"), quote.get())

@router.method
def readGlobal(*, output: abi.Uint64):
    return output.set(App.globalGet(Bytes("membercount")))

@router.method
def readIndex(*, output: abi.Uint64):
    return output.set(App.globalGet(Bytes("MemberIndex")))

@router.method
def NewRegister(member: abi.Address, *, output: abi.Uint64):
    MemberIndex = abi.Uint64()
    BoxIndex = abi.Uint64()
    Zero64 = abi.Uint64()
    T32 = abi.Uint64()
    return Seq(
        Assert(BytesEq(member.get(), Txn.sender())),
        Zero64.set(0),
        T32.set(32),
        MemberIndex.set(App.globalGet(Bytes("MemberIndex"))),
        BoxIndex.set(Mul(MemberIndex.get(), T32.get())),
        If(MemberIndex.get() == Zero64.get()).Then(Assert(App.box_create(Bytes("Members"), Int(2048)))),
        ###Warn 2bytes
        App.box_replace(Bytes("Members"), BoxIndex.get(), member.get()),
        App.globalPut(Bytes("MemberIndex"), MemberIndex.get() + Int(1)),
        output.set(MemberIndex.get())
    )

@router.method
def AddressByIndex(index: abi.Uint64, *, output: abi.Address):
    return Seq(
        _AddressByIndex(index).store_into(output)
    )

@router.method
def IsRegister(offset: abi.Uint64, addr: abi.Address, *, output: abi.Bool):
    return Seq(
        _IsRegister(offset, addr).store_into(output)
    )


###Inner Function
@ABIReturnSubroutine
def _AddressByIndex(index: abi.Uint64, *, output: abi.Address)-> Expr:
    Addr = abi.Address()
    MemberIndex = abi.Uint64()
    BoxIndex = abi.Uint64()
    T32 = abi.Uint64()
    return Seq(
        T32.set(32),
        MemberIndex.set(index),
        BoxIndex.set(Mul(MemberIndex.get(), T32.get())),
        Addr.set(App.box_extract(Bytes("Members"), BoxIndex.get(), Int(32))),
        output.set(Addr.get())
    )

@ABIReturnSubroutine
def _IsRegister(offset: abi.Uint64, addr: abi.Address, *, output: abi.Bool)-> Expr:
    BoxIndex = abi.Uint64()
    T32 = abi.Uint64()
    addrNow = abi.Address()
    Index = abi.Uint64()
    return Seq(
        T32.set(32),
        Index.set(offset),
        While(Lt(Index.get(), Add(offset.get(), Int(20)))).Do(
            BoxIndex.set(Mul(Index.get(), T32.get())),
            addrNow.set(App.box_extract(Bytes("Members"), BoxIndex.get(), Int(32))),
            If(BytesEq(addrNow.get(),addr.get())).Then(output.set(True),Break()),
            Index.set(Add(Index.get(), Int(1))),
        )
    )

if __name__ == "__main__":
    import os
    import json

    path = os.path.dirname(os.path.abspath(__file__))
    approval, clear, contract = router.compile_program(version=8)

    # Dump out the contract as json that can be read in by any of the SDKs
    with open(os.path.join(path, "artifacts/contract.json"), "w") as f:
        f.write(json.dumps(contract.dictify(), indent=2))

    # Write out the approval and clear programs
    with open(os.path.join(path, "artifacts/approval.teal"), "w") as f:
        f.write(approval)

    with open(os.path.join(path, "artifacts/clear.teal"), "w") as f:
        f.write(clear)