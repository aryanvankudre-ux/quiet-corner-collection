import { Book, BookOpen, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BookCardProps {
  book: {
    id: string;
    title: string;
    author: string;
    category?: string;
    publication_year?: number;
    available: number;
    quantity: number;
    description?: string;
    publisher?: string;
    isbn?: string;
  };
  onEdit: (book: any) => void;
  onDelete: (id: string) => void;
  onViewDetails: (book: any) => void;
}

export const BookCard = ({ book, onEdit, onDelete, onViewDetails }: BookCardProps) => {
  const availabilityColor = book.available > 0 ? "bg-green-500" : "bg-red-500";
  
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {book.title}
            </CardTitle>
            <CardDescription className="mt-1.5 font-medium">
              {book.author}
            </CardDescription>
          </div>
          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(book);
              }}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(book.id);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex flex-wrap gap-2 mb-3">
          {book.category && (
            <Badge variant="secondary" className="text-xs">
              {book.category}
            </Badge>
          )}
          {book.publication_year && (
            <Badge variant="outline" className="text-xs">
              {book.publication_year}
            </Badge>
          )}
        </div>
        {book.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {book.description}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-3 border-t">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${availabilityColor}`} />
          <span className="text-sm text-muted-foreground">
            {book.available} of {book.quantity} available
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewDetails(book)}
          className="gap-1.5"
        >
          <BookOpen className="h-4 w-4" />
          Details
        </Button>
      </CardFooter>
    </Card>
  );
};
