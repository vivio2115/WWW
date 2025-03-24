import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | LegitCheck",
  description: "Artykuły i aktualności dotyczące bezpieczeństwa zakupów online",
};

// Dane symulujące artykuły na blogu
const blogPosts = [
  {
    id: "jak-rozpoznac-oszustwo",
    title: "Jak rozpoznać oszustwo podczas zakupów online?",
    excerpt: "Poznaj 10 sygnałów ostrzegawczych, które mogą wskazywać na nieuczciwe praktyki sprzedawców internetowych.",
    coverImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop",
    date: "24.03.2025",
    readTime: "5 min",
    author: "Jan Kowalski",
    category: "Poradniki",
    featured: true,
  },
  {
    id: "nowe-metody-oszustw",
    title: "Nowe metody oszustw w 2025 roku - na co uważać?",
    excerpt: "Przedstawiamy najnowsze techniki, których używają oszuści, aby wyłudzać pieniądze od nieświadomych kupujących.",
    coverImage: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=800&auto=format&fit=crop",
    date: "18.03.2025",
    readTime: "7 min",
    author: "Magdalena Jabłońska",
    category: "Bezpieczeństwo",
  },
  {
    id: "historia-legitcheck",
    title: "Historia LegitCheck - jak powstał nasz projekt?",
    excerpt: "Dowiedz się, jak narodził się pomysł na stworzenie platformy weryfikującej wiarygodność sprzedawców online.",
    coverImage: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop",
    date: "10.03.2025",
    readTime: "6 min",
    author: "Anna Nowak",
    category: "O nas",
  },
  {
    id: "zwroty-reklamacje",
    title: "Zwroty i reklamacje - co musisz wiedzieć?",
    excerpt: "Kompleksowy poradnik na temat praw konsumenta w zakresie zwrotów i reklamacji zakupów internetowych.",
    coverImage: "https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=800&auto=format&fit=crop",
    date: "05.03.2025",
    readTime: "8 min",
    author: "Piotr Wiśniewski",
    category: "Prawo",
  },
  {
    id: "sposoby-platnosci",
    title: "Najbezpieczniejsze sposoby płatności w internecie",
    excerpt: "Porównanie różnych metod płatności pod kątem bezpieczeństwa i ochrony konsumenta.",
    coverImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop",
    date: "28.02.2025",
    readTime: "4 min",
    author: "Jan Kowalski",
    category: "Płatności",
  },
  {
    id: "legitcheck-api",
    title: "Jak zintegrować LegitCheck API ze swoją stroną?",
    excerpt: "Techniczny poradnik dla programistów, którzy chcą dodać weryfikację LegitCheck do swojego e-commerce.",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop",
    date: "20.02.2025",
    readTime: "10 min",
    author: "Anna Nowak",
    category: "Developers",
  },
];

export default function BlogPage() {
  // Znajdź wyróżniony post (jeśli istnieje)
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);
  
  return (
    <div className="container py-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
        <p className="text-muted-foreground">
          Najnowsze artykuły, poradniki i aktualności dotyczące bezpieczeństwa zakupów online.
        </p>
      </div>
      
      {/* Wyróżniony artykuł */}
      {featuredPost && (
        <div className="my-8">
          <Card className="overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 relative h-[250px] md:h-auto">
                <Image
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary hover:bg-primary/90">Wyróżniony</Badge>
                </div>
              </div>
              <div className="md:w-1/2 flex flex-col justify-between p-6">
                <div>
                  <Badge variant="outline" className="mb-2">{featuredPost.category}</Badge>
                  <Link href={`/blog/${featuredPost.id}`} className="inline-block group">
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                      {featuredPost.title}
                    </CardTitle>
                  </Link>
                  <CardDescription className="mt-2 text-base">{featuredPost.excerpt}</CardDescription>
                </div>
                <div className="mt-4 flex items-center text-sm text-muted-foreground">
                  <User className="h-4 w-4 mr-1" />
                  <span>{featuredPost.author}</span>
                  <span className="mx-2">•</span>
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  <span>{featuredPost.date}</span>
                  <span className="mx-2">•</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{featuredPost.readTime}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
      
      {/* Lista pozostałych artykułów */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {regularPosts.map((post, index) => (
          <BlogPostCard key={post.id} post={post} index={index} />
        ))}
      </div>
      
      {/* Sekcja subskrypcji newslettera */}
      <div className="mt-12 bg-muted rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Bądź na bieżąco</h2>
        <p className="mb-6 max-w-md mx-auto">
          Zapisz się do naszego newslettera, aby otrzymywać najnowsze artykuły i informacje o bezpieczeństwie zakupów online.
        </p>
        <div className="flex max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Twój adres email" 
            className="flex-1 px-4 py-2 rounded-l-md border border-input focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-r-md hover:bg-primary/90 transition-colors">
            Zapisz się
          </button>
        </div>
      </div>
    </div>
  );
}

// Komponent karty artykułu
function BlogPostCard({ post, index }: { post: any, index: number }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${index * 100}ms` }}>
      <div className="relative h-[200px]">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center mb-1">
          <Badge variant="outline">{post.category}</Badge>
          <span className="text-xs text-muted-foreground">{post.date}</span>
        </div>
        <Link href={`/blog/${post.id}`} className="inline-block group">
          <CardTitle className="group-hover:text-primary transition-colors">{post.title}</CardTitle>
        </Link>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground pt-0">
        <div className="flex items-center">
          <User className="h-4 w-4 mr-1" />
          <span>{post.author}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          <span>{post.readTime}</span>
        </div>
      </CardFooter>
    </Card>
  );
}