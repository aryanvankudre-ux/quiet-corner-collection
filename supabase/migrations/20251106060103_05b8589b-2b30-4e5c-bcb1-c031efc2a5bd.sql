-- Create books table for library management
CREATE TABLE public.books (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  isbn TEXT UNIQUE,
  publisher TEXT,
  publication_year INTEGER,
  category TEXT,
  description TEXT,
  cover_url TEXT,
  quantity INTEGER NOT NULL DEFAULT 1,
  available INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to read books (public library)
CREATE POLICY "Anyone can view books" 
ON public.books 
FOR SELECT 
USING (true);

-- Create policy to allow anyone to insert books
CREATE POLICY "Anyone can add books" 
ON public.books 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow anyone to update books
CREATE POLICY "Anyone can update books" 
ON public.books 
FOR UPDATE 
USING (true);

-- Create policy to allow anyone to delete books
CREATE POLICY "Anyone can delete books" 
ON public.books 
FOR DELETE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_books_updated_at
BEFORE UPDATE ON public.books
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add some sample books
INSERT INTO public.books (title, author, isbn, publisher, publication_year, category, description, quantity, available) VALUES
('To Kill a Mockingbird', 'Harper Lee', '9780061120084', 'HarperCollins', 1960, 'Fiction', 'A classic novel about racial injustice and childhood innocence in the American South.', 3, 3),
('1984', 'George Orwell', '9780451524935', 'Signet Classic', 1949, 'Fiction', 'A dystopian social science fiction novel and cautionary tale about totalitarianism.', 5, 5),
('Pride and Prejudice', 'Jane Austen', '9780141439518', 'Penguin Classics', 1813, 'Romance', 'A romantic novel of manners following the character development of Elizabeth Bennet.', 4, 4),
('The Great Gatsby', 'F. Scott Fitzgerald', '9780743273565', 'Scribner', 1925, 'Fiction', 'A novel set in the Jazz Age that explores themes of decadence and excess.', 6, 6),
('Moby-Dick', 'Herman Melville', '9780142437247', 'Penguin Classics', 1851, 'Adventure', 'The narrative of Captain Ahab''s obsessive quest to seek revenge on Moby Dick.', 2, 2),
('War and Peace', 'Leo Tolstoy', '9780199232765', 'Oxford University Press', 1869, 'Historical Fiction', 'An epic novel chronicling the French invasion of Russia and its impact on society.', 3, 3),
('The Catcher in the Rye', 'J.D. Salinger', '9780316769174', 'Little, Brown', 1951, 'Fiction', 'A story about teenage rebellion and alienation.', 4, 4),
('Harry Potter and the Sorcerer''s Stone', 'J.K. Rowling', '9780590353427', 'Scholastic', 1997, 'Fantasy', 'The first novel in the Harry Potter series about a young wizard.', 8, 8),
('The Hobbit', 'J.R.R. Tolkien', '9780547928227', 'Houghton Mifflin', 1937, 'Fantasy', 'A fantasy novel about hobbit Bilbo Baggins'' quest to win treasure from a dragon.', 5, 5),
('Brave New World', 'Aldous Huxley', '9780060850524', 'Harper Perennial', 1932, 'Science Fiction', 'A dystopian novel set in a futuristic World State of genetically modified citizens.', 4, 4);