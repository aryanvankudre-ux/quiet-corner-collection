import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Book, Calendar, Building2, Hash, Package, CheckCircle2 } from "lucide-react";

interface BookDetailsDialogProps {
  book: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BookDetailsDialog = ({ book, open, onOpenChange }: BookDetailsDialogProps) => {
  if (!book) return null;

  const availabilityColor = book.available > 0 ? "text-green-600" : "text-red-600";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{book.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">By {book.author}</h3>
            <div className="flex flex-wrap gap-2">
              {book.category && (
                <Badge variant="secondary">{book.category}</Badge>
              )}
              {book.publication_year && (
                <Badge variant="outline">{book.publication_year}</Badge>
              )}
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {book.isbn && (
              <div className="flex items-start gap-3">
                <Hash className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">ISBN</p>
                  <p className="text-sm text-muted-foreground">{book.isbn}</p>
                </div>
              </div>
            )}
            
            {book.publisher && (
              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Publisher</p>
                  <p className="text-sm text-muted-foreground">{book.publisher}</p>
                </div>
              </div>
            )}

            {book.publication_year && (
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Publication Year</p>
                  <p className="text-sm text-muted-foreground">{book.publication_year}</p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <Package className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Quantity</p>
                <p className="text-sm text-muted-foreground">
                  {book.quantity} total copies
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className={`h-5 w-5 mt-0.5 ${availabilityColor}`} />
              <div>
                <p className="text-sm font-medium">Availability</p>
                <p className={`text-sm ${availabilityColor}`}>
                  {book.available} of {book.quantity} available
                </p>
              </div>
            </div>
          </div>

          {book.description && (
            <>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Book className="h-4 w-4" />
                  Description
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {book.description}
                </p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
