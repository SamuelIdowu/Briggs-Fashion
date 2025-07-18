import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

export function AddProductDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new product to your store.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-6">
          <form className="grid gap-6 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" placeholder="Regal Agbada Ensemble" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="A masterpiece of tailoring..."
                className="col-span-3"
              />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price (NGN)
              </Label>
              <Input id="price" type="number" placeholder="120000" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="traditional">Traditional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
               <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ready-made">Ready-made</SelectItem>
                  <SelectItem value="made-to-order">Made-to-order</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="images" className="text-right">
                Image URLs
              </Label>
              <Input id="images" placeholder="https://...png, https://...png" className="col-span-3" />
               <p className="col-span-3 col-start-2 text-xs text-muted-foreground">
                Enter comma-separated URLs for product images.
              </p>
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sizes" className="text-right">
                Sizes
              </Label>
              <Input id="sizes" placeholder="S, M, L, XL" className="col-span-3" />
              <p className="col-span-3 col-start-2 text-xs text-muted-foreground">
                Enter comma-separated values.
              </p>
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="colors" className="text-right">
                Colors
              </Label>
              <Input id="colors" placeholder="Royal Blue, Ivory White" className="col-span-3" />
               <p className="col-span-3 col-start-2 text-xs text-muted-foreground">
                Enter comma-separated values.
              </p>
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="materials" className="text-right">
                Materials
              </Label>
              <Input id="materials" placeholder="Guinea Brocade, Aso-Oke" className="col-span-3" />
               <p className="col-span-3 col-start-2 text-xs text-muted-foreground">
                Enter comma-separated values.
              </p>
            </div>

             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="materialComposition" className="text-right">
                Composition
              </Label>
              <Input id="materialComposition" placeholder="100% Premium Cotton Brocade" className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="careInstructions" className="text-right">
                Care
              </Label>
              <Textarea id="careInstructions" placeholder="Dry clean only. Iron on low heat." className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sizingInfo" className="text-right">
                Sizing Info
              </Label>
              <Textarea id="sizingInfo" placeholder="Custom measurements required..." className="col-span-3" />
            </div>
          </form>
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit">Save Product</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
