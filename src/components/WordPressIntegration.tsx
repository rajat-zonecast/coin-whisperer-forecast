import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowRight } from "lucide-react";
import { ArticleCard } from "./ArticleCard";
import { getWordPressPost } from "../../utils/api";

const WordPressIntegration = () => {
  const [articles, setArticles] = useState<any[]>([]);

  const transformArticles = (posts: any[]) => {
    return posts.map((post) => {
      const title = post.title?.rendered || "No Title";
      const excerpt = post.excerpt?.rendered?.replace(/<[^>]+>/g, "") || "";
      const date = new Date(post.date).toISOString().split("T")[0];
      const author = post._embedded?.author?.[0]?.name || "Unknown";
      const image =
        post.jetpack_featured_media_url ||
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        "https://via.placeholder.com/300";
      const url = post.link;
      const content = post.content?.rendered || ""; // full HTML content
      const tagname = post.tagNames?.filter((t: string) => t)?.join(", ") || "";

      return {
        id: post.id,
        title,
        excerpt,
        author,
        date,
        category: "Blog",
        readTime: "4 min read",
        image,
        url,
        content,
        tagname,
      };
    });
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const articleData = await getWordPressPost();

    if (Array.isArray(articleData)) {
      const formattedArticles = transformArticles(articleData).slice(0, 6);
      setArticles(formattedArticles);
    } else {
      console.error("Fetched article data is not an array:", articleData);
    }
  };

  return (
    <Link to="/blog" className="block">
      <Card className="mb-8 bg-gray-800/50 border-gray-700 shadow-2xl hover:bg-gray-800/70 transition-colors cursor-pointer">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <ExternalLink className="h-5 w-5 text-blue-400" />
              Our Latest Articles
              <Badge className="bg-blue-600">Live Feed</Badge>
            </CardTitle>
            <Button 
              variant="outline"
              className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
              onClick={(e) => e.stopPropagation()}
            >
              View All Articles
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {articles.map((article) => (
              <div key={article.id} onClick={(e) => e.stopPropagation()}>
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default WordPressIntegration;
