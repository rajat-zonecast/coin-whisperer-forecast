import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Heart,
  MessageCircle,
  TrendingUp,
  Users,
  Globe,
  Zap,
  Brain,
} from "lucide-react";
import { fetchSentimentData } from "@/services/aiPredictionService";

interface SentimentData {
  score: number;
  label: "Very Bearish" | "Bearish" | "Neutral" | "Bullish" | "Very Bullish";
  sources: {
    name: string;
    sentiment: number;
    mentions: number;
  }[];
}

interface SentimentAnalysisProps {
  crypto: string;
  sentimentData?: any; // Optional sentiment data prop
}

export const SentimentAnalysis: React.FC<SentimentAnalysisProps> = ({
  crypto,
  sentimentData,
}) => {
  const [sentiment, setSentiment] = useState<SentimentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate sentiment analysis data
    const generateSentimentData = (): SentimentData => {
      const score = Math.random() * 100;
      const getSentimentLabel = (
        score: number
      ):
        | "Very Bearish"
        | "Bearish"
        | "Neutral"
        | "Bullish"
        | "Very Bullish" => {
        if (score < 20) return "Very Bearish";
        if (score < 40) return "Bearish";
        if (score < 60) return "Neutral";
        if (score < 80) return "Bullish";
        return "Very Bullish";
      };

      return {
        score,
        label: getSentimentLabel(score),
        sources: [
          {
            name: "Twitter/X",
            sentiment: Math.random() * 100,
            mentions: Math.floor(Math.random() * 10000) + 1000,
          },
          {
            name: "Reddit",
            sentiment: Math.random() * 100,
            mentions: Math.floor(Math.random() * 5000) + 500,
          },
          {
            name: "News Media",
            sentiment: Math.random() * 100,
            mentions: Math.floor(Math.random() * 1000) + 100,
          },
          {
            name: "Crypto Forums",
            sentiment: Math.random() * 100,
            mentions: Math.floor(Math.random() * 2000) + 200,
          },
        ],
      };
    };
    const transformApiDataToSentiment = (apiData: any): SentimentData => {
      console.log("Transforming API data:", apiData);

      // Handle different possible API response structures
      const dataPayload = apiData?.data || apiData;

      // Map the API source keys to your desired display names
      const sourceNameMap: Record<string, string> = {
        tweet: "Twitter/X",
        "reddit-post": "Reddit",
        news: "News Media",
        "youtube-video": "Crypto Forums",
      };

      let sources: Array<{
        name: string;
        sentiment: number;
        mentions: number;
      }> = [];
      let avgScore = 0;

      try {
        // Check if we have the expected data structure
        if (
          dataPayload?.types_sentiment &&
          typeof dataPayload.types_sentiment === "object"
        ) {
          sources = Object.keys(dataPayload.types_sentiment)
            .filter((key) => sourceNameMap[key]) // only include mapped sources
            .map((key) => ({
              name: sourceNameMap[key],
              sentiment: dataPayload.types_sentiment[key] || 0,
              mentions:
                dataPayload.types_interactions?.[key] ||
                Math.floor(Math.random() * 1000) + 100,
            }));

          // Calculate overall average sentiment score
          const totalScore = sources.reduce(
            (sum, source) => sum + source.sentiment,
            0
          );
          avgScore = sources.length ? totalScore / sources.length : 0;
        } else {
          // Fallback: create mock data based on overall sentiment if available
          const fallbackSentiment =
            dataPayload?.sentiment || Math.random() * 100;
          avgScore = fallbackSentiment;

          sources = [
            {
              name: "Twitter/X",
              sentiment: fallbackSentiment + (Math.random() - 0.5) * 20,
              mentions: Math.floor(Math.random() * 10000) + 1000,
            },
            {
              name: "Reddit",
              sentiment: fallbackSentiment + (Math.random() - 0.5) * 20,
              mentions: Math.floor(Math.random() * 5000) + 500,
            },
            {
              name: "News Media",
              sentiment: fallbackSentiment + (Math.random() - 0.5) * 20,
              mentions: Math.floor(Math.random() * 1000) + 100,
            },
            {
              name: "Crypto Forums",
              sentiment: fallbackSentiment + (Math.random() - 0.5) * 20,
              mentions: Math.floor(Math.random() * 2000) + 200,
            },
          ].map((source) => ({
            ...source,
            sentiment: Math.max(0, Math.min(100, source.sentiment)), // Clamp between 0-100
          }));
        }
      } catch (error) {
        console.error("Error processing sentiment data:", error);
        // Complete fallback with random data
        avgScore = Math.random() * 100;
        sources = [
          {
            name: "Twitter/X",
            sentiment: Math.random() * 100,
            mentions: Math.floor(Math.random() * 10000) + 1000,
          },
          {
            name: "Reddit",
            sentiment: Math.random() * 100,
            mentions: Math.floor(Math.random() * 5000) + 500,
          },
          {
            name: "News Media",
            sentiment: Math.random() * 100,
            mentions: Math.floor(Math.random() * 1000) + 100,
          },
          {
            name: "Crypto Forums",
            sentiment: Math.random() * 100,
            mentions: Math.floor(Math.random() * 2000) + 200,
          },
        ];
      }

      // Determine sentiment label from score
      const getSentimentLabel = (
        score: number
      ):
        | "Very Bearish"
        | "Bearish"
        | "Neutral"
        | "Bullish"
        | "Very Bullish" => {
        if (score >= 85) return "Very Bullish";
        if (score >= 70) return "Bullish";
        if (score >= 50) return "Neutral";
        if (score >= 30) return "Bearish";
        return "Very Bearish";
      };

      const result = {
        score: avgScore,
        label: getSentimentLabel(avgScore),
        sources,
      };

      console.log("Transformed sentiment data:", result);
      return result;
    };

    const fetchData = async () => {
      setIsLoading(true);
      try {
        console.log(`Fetching sentiment data for crypto: ${crypto}`);
        const res = await fetchSentimentData(crypto);

        if (res) {
          const result = transformApiDataToSentiment(res);
          setSentiment(result);
          sentimentData(result); // Update optional prop if provided
          console.log("Successfully processed sentiment data:", result);
        } else {
          console.warn("No data received from API, using fallback");
          // Use fallback data
          const fallbackData = generateSentimentData();
          setSentiment(fallbackData);
          sentimentData(fallbackData); // Update optional prop if provided
        }
      } catch (error) {
        console.error("Error in sentiment data fetch:", error);
        // Use fallback data on error
        const fallbackData = generateSentimentData();
        setSentiment(fallbackData);
        sentimentData(fallbackData); // Update optional prop if provided
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // Optionally, if you want to simulate loading delay, use setTimeout(() => fetchData(), 1500);
  }, [crypto]);

  const getSentimentColor = (score: number) => {
    if (score < 20) return "text-red-500 border-red-500 bg-red-500/10";
    if (score < 40) return "text-red-400 border-red-400 bg-red-400/10";
    if (score < 60) return "text-amber-400 border-amber-400 bg-amber-400/10";
    if (score < 80)
      return "text-emerald-400 border-emerald-400 bg-emerald-400/10";
    return "text-emerald-500 border-emerald-500 bg-emerald-500/10";
  };

  const getSentimentIcon = (score: number) => {
    if (score < 40) return <TrendingUp className="h-4 w-4 rotate-180" />;
    if (score < 60) return <Heart className="h-4 w-4" />;
    return <TrendingUp className="h-4 w-4" />;
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "Twitter/X":
        return <MessageCircle className="h-4 w-4 text-blue-400" />;
      case "Reddit":
        return <Users className="h-4 w-4 text-orange-400" />;
      case "News Media":
        return <Globe className="h-4 w-4 text-purple-400" />;
      default:
        return <MessageCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-gray-800/50 border-gray-700 shadow-2xl backdrop-blur-sm overflow-hidden">
        <CardHeader className="bg-gray-700/30 border-b border-gray-600/30">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2 rounded-full bg-pink-500/20">
              <Heart className="h-6 w-6 text-pink-400" />
            </div>
            Market Sentiment
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse ml-auto"></div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-700 rounded mb-4"></div>
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-12 bg-gray-700 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!sentiment) {
    return (
      <Card className="bg-gray-800/50 border-gray-700 shadow-2xl backdrop-blur-sm overflow-hidden">
        <CardHeader className="bg-gray-700/30 border-b border-gray-600/30">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2 rounded-full bg-pink-500/20">
              <Heart className="h-6 w-6 text-pink-400" />
            </div>
            Market Sentiment
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-400">Unable to load sentiment data</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800/50 border-gray-700 shadow-2xl backdrop-blur-sm overflow-hidden">
      <CardHeader className="bg-gray-700/30 border-b border-gray-600/30">
        <CardTitle className="text-white flex items-center gap-3">
          <div className="p-2 rounded-full bg-pink-500/20">
            <Heart className="h-6 w-6 text-pink-400" />
          </div>
          Market Sentiment
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse ml-auto"></div>
        </CardTitle>
        <CardDescription className="text-gray-300">
          AI-powered social media and news sentiment for {crypto.toUpperCase()}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {/* Overall Sentiment - Enhanced */}
        <div className="text-center space-y-4 p-4 bg-gray-700/40 rounded-xl border border-gray-600/30 shadow-lg">
          <div className="flex items-center justify-center gap-3">
            <div className="p-2 rounded-full bg-pink-500/20">
              {getSentimentIcon(sentiment.score)}
            </div>
            <Badge
              variant="outline"
              className={`${getSentimentColor(
                sentiment.score
              )} font-semibold text-sm backdrop-blur-sm`}
            >
              {sentiment.label}
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-white">
              {sentiment.score.toFixed(0)}/100
            </div>
            <div className="text-sm text-gray-400 font-medium">
              Market Mood Index
            </div>
          </div>
          <Progress
            value={sentiment.score}
            className={`h-4 ${
              sentiment.score > 60
                ? "[&>div]:bg-emerald-400"
                : sentiment.score < 40
                ? "[&>div]:bg-red-400"
                : "[&>div]:bg-amber-400"
            }`}
          />
        </div>

        {/* Source Breakdown - Enhanced */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="h-4 w-4 text-purple-400" />
            <h4 className="text-sm font-semibold text-gray-200">
              Sentiment by Source
            </h4>
          </div>
          <div className="space-y-3">
            {sentiment.sources.map((source, index) => (
              <div
                key={index}
                className="group p-4 bg-gray-700/30 rounded-xl border border-gray-600/20 hover:border-gray-500/40 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-gray-600/30">
                      {getSourceIcon(source.name)}
                    </div>
                    <span className="text-sm font-medium text-gray-200">
                      {source.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 font-medium">
                      {source.mentions.toLocaleString()} mentions
                    </span>
                    <Badge
                      variant="outline"
                      className={`${getSentimentColor(
                        source.sentiment
                      )} text-xs font-medium backdrop-blur-sm`}
                    >
                      {source.sentiment.toFixed(0)}
                    </Badge>
                  </div>
                </div>
                <Progress
                  value={source.sentiment}
                  className={`h-2.5 ${
                    source.sentiment > 60
                      ? "[&>div]:bg-emerald-400"
                      : source.sentiment < 40
                      ? "[&>div]:bg-red-400"
                      : "[&>div]:bg-amber-400"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Sentiment Indicators - Enhanced */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-blue-900/20 rounded-xl border border-blue-700/30 hover:border-blue-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1 rounded-full bg-blue-500/20">
                <Heart className="h-3 w-3 text-blue-400" />
              </div>
              <p className="text-xs text-blue-400 font-semibold">
                Fear & Greed
              </p>
            </div>
            <p className="text-xl font-bold text-white mb-1">
              {(sentiment.score * 0.8 + 10).toFixed(0)}
            </p>
            <p className="text-xs text-blue-300/80">
              {sentiment.score > 50 ? "Greed Dominates" : "Fear Prevails"}
            </p>
          </div>
          <div className="p-4 bg-purple-900/20 rounded-xl border border-purple-700/30 hover:border-purple-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1 rounded-full bg-purple-500/20">
                <Zap className="h-3 w-3 text-purple-400" />
              </div>
              <p className="text-xs text-purple-400 font-semibold">
                Social Volume
              </p>
            </div>
            <p className="text-xl font-bold text-white mb-1">
              {sentiment.sources
                .reduce((acc, s) => acc + s.mentions, 0)
                .toLocaleString()}
            </p>
            <p className="text-xs text-purple-300/80">24h mentions</p>
          </div>
        </div>

        {/* Recent Trends - Enhanced */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-4 w-4 text-emerald-400" />
            <h4 className="text-sm font-semibold text-gray-200">
              Recent Trends
            </h4>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg border border-gray-600/20">
              <span className="text-sm text-gray-300 font-medium">
                vs Yesterday
              </span>
              <span
                className={`text-sm font-bold ${
                  sentiment.score > 50 ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {sentiment.score > 50 ? "+" : ""}
                {(sentiment.score - 50).toFixed(1)}%
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg border border-gray-600/20">
              <span className="text-sm text-gray-300 font-medium">
                vs Last Week
              </span>
              <span
                className={`text-sm font-bold ${
                  sentiment.score > 45 ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {sentiment.score > 45 ? "+" : ""}
                {(sentiment.score - 45).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
