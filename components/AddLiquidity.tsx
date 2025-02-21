import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AddLiquidity({poolType1, poolType2}: {poolType1: string, poolType2:string}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full text-white p-3">Add Liquidity</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Liquidity</DialogTitle>
          <DialogDescription>
            Add liquidity to the pool to start trading.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="first" className="text-left">
              Balance: {0}
            </Label>
            <div className="hover:border-2 hover:border-blue-500 rounded-md flex items-center">
              <Input
                id="first"
                type="number"
                className="w-[70px] p-2 outline-none border-none focus:ring-0 focus:border-transparent focus:outline-none focus:ring-offset-0 hover:outline-none hover:border-none hover:ring-0 hover:ring-transparent ring-0 ring-transparent col-span-3"
              />
              <div className="flex-1 flex items-center justify-center">
                <p className="font-neuton">{poolType1}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="second" className="text-left">
              Balance: {0}
            </Label>
            <div className="hover:border-2 hover:border-blue-500 rounded-md flex items-center">
              <Input
                id="second"
                type="number"
                className="w-[70px] p-2 outline-none border-none focus:ring-0 focus:border-transparent focus:outline-none focus:ring-offset-0 hover:outline-none hover:border-none hover:ring-0 hover:ring-transparent ring-0 ring-transparent col-span-3"
              />
              <div className="flex-1 flex items-center justify-center">
                <p className="font-neuton">{poolType2}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          
        </div>
        <DialogFooter>
          <Button type="submit" className="w-full">
            Add Liquidity
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
