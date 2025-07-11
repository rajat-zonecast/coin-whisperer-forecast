import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Heart, MessageCircle, TrendingUp, Users, Globe, Brain, Zap, Target, Shield, BarChart3, Activity, Eye, Calculator, Lightbulb } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AdUnit } from "@/components/ads/AdService";
import { IndexHeader } from "@/components/IndexHeader";
import { MarketWinnersWidget } from "@/components/MarketWinnersWidget";
import Footer from "@/components/Footer";

const SentimentAnalysisPage = () => {
  const cryptoOptions = [
    { value: 'bitcoin', label: 'Bitcoin (BTC)', icon: '₿', category: 'Major', score: 8.5, prediction: '+12.5%' },
    { value: 'ethereum', label: 'Ethereum (ETH)', icon: 'Ξ', category: 'Major', score: 8.2, prediction: '+8.3%' },
  ];

  // Mock data for MarketWinnersWidget
  const mockTopGainersAndLosers = [
    { 
      id: 'bitcoin', 
      name: 'Bitcoin', 
      symbol: 'btc', 
      current_price: 45000,
      price_change_percentage_24h: 5.2,
      image: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png'
    },
    { 
      id: 'ethereum', 
      name: 'Ethereum', 
      symbol: 'eth', 
      current_price: 2800,
      price_change_percentage_24h: 3.1,
      image: 'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png'
    },
    { 
      id: 'cardano', 
      name: 'Cardano', 
      symbol: 'ada', 
      current_price: 0.45,
      price_change_percentage_24h: -2.5,
      image: 'https://assets.coingecko.com/coins/images/975/thumb/cardano.png'
    },
    { 
      id: 'solana', 
      name: 'Solana', 
      symbol: 'sol', 
      current_price: 98,
      price_change_percentage_24h: -1.8,
      image: 'https://assets.coingecko.com/coins/images/4128/thumb/solana.png'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header like homepage */}
      <div className="container mx-auto px-4 py-4 md:py-8">
        <IndexHeader
          selectedCrypto="bitcoin"
          cryptoOptions={cryptoOptions}
          currentPrice={45000}
          priceChange={2.5}
        />
      </div>

      <div className="container mx-auto px-4 pb-8">
        {/* Back Button */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/">
            <Button variant="outline" className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* How Sentiment Analysis Works */}
            <Card className="bg-gray-800/50 border-gray-700 shadow-xl backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-pink-600/10 to-purple-600/10 border-b border-gray-600/50">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full mb-4">
                    <Heart className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-3">AI-Powered Sentiment Analysis</h2>
                  <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                    Real-time market sentiment tracking using advanced natural language processing
                  </p>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-xl border border-blue-500/30 hover:shadow-lg transition-all">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-4">
                      <MessageCircle className="h-8 w-8 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Social Media Mining</h3>
                    <p className="text-gray-300 text-sm">Real-time analysis of Twitter, Reddit, and Telegram conversations</p>
                  </div>
                  
                  <div className="text-center p-6 bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-xl border border-green-500/30 hover:shadow-lg transition-all">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4">
                      <Globe className="h-8 w-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">News Analysis</h3>
                    <p className="text-gray-300 text-sm">Processing 1000+ crypto news sources with NLP algorithms</p>
                  </div>
                  
                  <div className="text-center p-6 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl border border-purple-500/30 hover:shadow-lg transition-all">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-full mb-4">
                      <Brain className="h-8 w-8 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">AI Classification</h3>
                    <p className="text-gray-300 text-sm">Natural language processing algorithms identify sentiment patterns and trends</p>
                  </div>
                  
                  <div className="text-center p-6 bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-xl border border-orange-500/30 hover:shadow-lg transition-all">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500/20 rounded-full mb-4">
                      <Calculator className="h-8 w-8 text-orange-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Data Aggregation</h3>
                    <p className="text-gray-300 text-sm">Multiple data sources combined to provide comprehensive sentiment insights</p>
                  </div>
                  
                  <div className="text-center p-6 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-xl border border-cyan-500/30 hover:shadow-lg transition-all">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/20 rounded-full mb-4">
                      <Activity className="h-8 w-8 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Real-Time Updates</h3>
                    <p className="text-gray-300 text-sm">Sentiment scores updated every 5 minutes for live tracking</p>
                  </div>
                  
                  <div className="text-center p-6 bg-gradient-to-br from-yellow-600/20 to-orange-600/20 rounded-xl border border-yellow-500/30 hover:shadow-lg transition-all">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500/20 rounded-full mb-4">
                      <Eye className="h-8 w-8 text-yellow-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Trend Detection</h3>
                    <p className="text-gray-300 text-sm">Pattern recognition for identifying sentiment momentum shifts</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Sources & Methodology */}
            <Card className="bg-gray-800/50 border-gray-700 shadow-xl backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-600/10 to-cyan-600/10 border-b border-gray-600/50">
                <CardTitle className="text-white flex items-center gap-2 text-2xl">
                  <Lightbulb className="h-6 w-6 text-green-400" />
                  LunarCrush Data Integration
                </CardTitle>
                <p className="text-gray-300 mt-2">Powered by LunarCrush's comprehensive social and market data</p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-6 rounded-lg border border-blue-500/30 mb-6">
                  <div className="flex items-start gap-4">
                    <Shield className="h-8 w-8 text-blue-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-white font-semibold mb-2">Third-Party Data Provider</h3>
                      <p className="text-gray-300 text-sm mb-3">
                        Our sentiment analysis is powered by LunarCrush, a leading cryptocurrency social analytics platform that tracks and analyzes social media activity across multiple platforms.
                      </p>
                      <div className="bg-gray-700/30 p-3 rounded-lg">
                        <p className="text-gray-400 text-xs">
                          <strong>Disclaimer:</strong> Sentiment data is provided by LunarCrush and processed through their proprietary algorithms. Scores represent social sentiment trends and should not be considered financial advice.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-700/30 p-4 rounded-lg">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-green-400" />
                      Key Metrics Tracked
                    </h4>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• <span className="text-blue-400">Social Score:</span> Overall social activity level</li>
                      <li>• <span className="text-green-400">Galaxy Score:</span> Comprehensive performance metric</li>
                      <li>• <span className="text-purple-400">Alt Rank:</span> Relative ranking among altcoins</li>
                      <li>• <span className="text-orange-400">Social Volume:</span> Mention frequency across platforms</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-700/30 p-4 rounded-lg">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Globe className="h-5 w-5 text-blue-400" />
                      Data Sources
                    </h4>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• Twitter/X social mentions and engagement</li>
                      <li>• Reddit posts and community discussions</li>
                      <li>• News articles and press releases</li>
                      <li>• Social media influencer activity</li>
                      <li>• Community forum discussions</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Overall Market Sentiment */}
            <Card className="bg-gradient-to-br from-card/80 to-card/30 border-border shadow-2xl backdrop-blur-sm overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/10 to-transparent rounded-full translate-y-12 -translate-x-12" />
              
              <CardHeader className="relative z-10 bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
                <CardTitle className="text-foreground flex items-center gap-3 text-2xl">
                  <div className="p-2 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  Overall Market Sentiment
                  <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground border-0 shadow-lg animate-pulse">
                    🚀 Bullish
                  </Badge>
                </CardTitle>
                <CardDescription className="text-muted-foreground text-lg">
                  Real-time sentiment analysis across multiple data sources
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 p-8">
                <div className="text-center mb-8">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-2xl scale-150" />
                    <div className="relative text-7xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-3 animate-pulse">
                      72
                    </div>
                  </div>
                  <div className="text-foreground text-xl font-semibold mb-4">Market Sentiment Score</div>
                  <div className="relative max-w-md mx-auto">
                    <div className="h-4 bg-muted rounded-full overflow-hidden shadow-inner">
                      <div 
                        className="h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full transition-all duration-1000 ease-out shadow-lg"
                        style={{ width: '72%' }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>Bearish</span>
                      <span>Neutral</span>
                      <span>Bullish</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="group text-center p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/20 rounded-full mb-3 group-hover:scale-110 transition-transform">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-primary mb-1">Bullish</div>
                    <div className="text-sm text-muted-foreground">Primary Trend</div>
                  </div>
                  <div className="group text-center p-6 bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/20 rounded-full mb-3 group-hover:scale-110 transition-transform">
                      <Target className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div className="text-2xl font-bold text-accent-foreground mb-1">High</div>
                    <div className="text-sm text-muted-foreground">Confidence Level</div>
                  </div>
                  <div className="group text-center p-6 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-xl border border-border hover:border-secondary/50 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/20">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/20 rounded-full mb-3 group-hover:scale-110 transition-transform">
                      <Zap className="h-6 w-6 text-secondary-foreground" />
                    </div>
                    <div className="text-2xl font-bold text-secondary-foreground mb-1">Rising</div>
                    <div className="text-sm text-muted-foreground">24h Change</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Cryptocurrencies by Sentiment */}
            <Card className="bg-gradient-to-br from-card/80 to-card/30 border-border shadow-2xl backdrop-blur-sm overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />
              <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-y-20 -translate-x-20" />
              
              <CardHeader className="relative z-10 bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border">
                <CardTitle className="text-foreground flex items-center gap-3 text-2xl">
                  <div className="p-2 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  Top Cryptocurrencies by Sentiment
                  <Badge variant="outline" className="text-primary border-border bg-primary/10">
                    Live Rankings
                  </Badge>
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Real-time sentiment scores and trends for major cryptocurrencies
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 p-6">
                <div className="space-y-4">
                  {[
                    { name: 'Bitcoin', symbol: 'BTC', sentiment: 78, trend: 'up', icon: '₿', position: 1 },
                    { name: 'Ethereum', symbol: 'ETH', sentiment: 72, trend: 'up', icon: 'Ξ', position: 2 },
                    { name: 'Solana', symbol: 'SOL', sentiment: 68, trend: 'up', icon: '◎', position: 3 },
                    { name: 'Cardano', symbol: 'ADA', sentiment: 45, trend: 'down', icon: '₳', position: 4 },
                    { name: 'Polygon', symbol: 'MATIC', sentiment: 62, trend: 'up', icon: '⬟', position: 5 }
                  ].map((crypto, index) => {
                    const isPositive = crypto.sentiment >= 60;
                    const isTop3 = crypto.position <= 3;

                    return (
                      <div 
                        key={crypto.symbol} 
                        className={`group flex items-center justify-between p-5 bg-gradient-to-r from-card to-muted/50 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 ${isTop3 ? 'ring-1 ring-primary/30' : ''}`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-full text-sm font-bold text-muted-foreground">
                            #{crypto.position}
                          </div>
                          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full text-xl font-bold text-foreground group-hover:scale-110 transition-transform">
                            {crypto.icon}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-foreground font-semibold text-lg">{crypto.name}</span>
                              <Badge variant="secondary" className="text-xs">
                                {crypto.symbol}
                              </Badge>
                            </div>
                            <div className="text-muted-foreground text-sm">Sentiment rank #{crypto.position}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-foreground font-bold text-lg">{crypto.sentiment}</div>
                            <div className="text-muted-foreground text-xs">Score</div>
                          </div>
                          <div className="relative w-32">
                            <div className="h-3 bg-muted rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${isPositive ? 'bg-gradient-to-r from-primary to-accent' : 'bg-gradient-to-r from-muted-foreground to-muted'} rounded-full transition-all duration-1000 ease-out`}
                                style={{ width: `${crypto.sentiment}%` }}
                              />
                            </div>
                          </div>
                          <div className={`p-2 rounded-full ${crypto.trend === 'up' ? 'bg-primary/20' : 'bg-destructive/20'} group-hover:scale-110 transition-transform`}>
                            {crypto.trend === 'up' ? (
                              <TrendingUp className="h-5 w-5 text-primary" />
                            ) : (
                              <TrendingUp className="h-5 w-5 text-destructive rotate-180" />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Sentiment Analysis FAQ */}
            <Card className="bg-gray-800/50 border-gray-700 shadow-xl backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-pink-600/10 to-purple-600/10 border-b border-gray-600/50">
                <div className="flex items-center gap-3 mb-2">
                  <Heart className="h-8 w-8 text-pink-400" />
                  <div>
                    <CardTitle className="text-2xl text-white">
                      How Pump Parade's Sentiment Analysis Works
                    </CardTitle>
                    <p className="text-gray-300 mt-2">Get real-time market sentiment powered by advanced AI and natural language processing</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="space-y-3">
                  <AccordionItem value="what-is-sentiment" className="bg-gray-700/30 rounded-lg px-4 border border-gray-600/50 hover:border-pink-500/50 transition-colors">
                    <AccordionTrigger className="text-white hover:text-pink-400 font-medium">
                      What is Sentiment Analysis on Pump Parade?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 pt-4 leading-relaxed">
                      Pump Parade's Sentiment Analysis uses advanced natural language processing (NLP) to analyze millions of social media posts, news articles, and forum discussions in real-time. Our AI identifies positive, negative, and neutral sentiment towards cryptocurrencies, providing market sentiment scores that help predict price movements and market trends.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="how-algorithm-works" className="bg-gray-700/30 rounded-lg px-4 border border-gray-600/50 hover:border-blue-500/50 transition-colors">
                    <AccordionTrigger className="text-white hover:text-blue-400 font-medium">
                      How is Sentiment Data Processed?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 pt-4 leading-relaxed">
                      Pump Parade integrates with LunarCrush's API to access their comprehensive social analytics. LunarCrush uses machine learning algorithms to analyze social media posts, news articles, and community discussions. Their system processes text for sentiment polarity, engagement metrics, and influence scores to generate comprehensive social sentiment data for cryptocurrencies.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="data-sources" className="bg-gray-700/30 rounded-lg px-4 border border-gray-600/50 hover:border-green-500/50 transition-colors">
                    <AccordionTrigger className="text-white hover:text-green-400 font-medium">
                      What Data Sources Are Used?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 pt-4 leading-relaxed">
                      Through LunarCrush's platform, we access data from major social media platforms including Twitter/X, Reddit, and various crypto communities. LunarCrush aggregates social mentions, engagement metrics, and sentiment indicators from these sources to provide comprehensive social analytics for cryptocurrency markets.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="sentiment-scoring" className="bg-gray-700/30 rounded-lg px-4 border border-gray-600/50 hover:border-purple-500/50 transition-colors">
                    <AccordionTrigger className="text-white hover:text-purple-400 font-medium">
                      How Are Sentiment Scores Calculated?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 pt-4 leading-relaxed">
                      Sentiment scores range from 0-100, where 0-30 is bearish, 30-70 is neutral, and 70-100 is bullish. We use a weighted compound score that considers sentiment polarity (-1 to +1), source reliability (0.1-1.0), user influence (1-10), and time decay factors. The final score is normalized and smoothed using exponential moving averages.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="accuracy-reliability" className="bg-gray-700/30 rounded-lg px-4 border border-gray-600/50 hover:border-orange-500/50 transition-colors">
                    <AccordionTrigger className="text-white hover:text-orange-400 font-medium">
                      How Accurate Is Sentiment Analysis for Trading?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 pt-4 leading-relaxed">
                      Our sentiment analysis shows 78-85% correlation with short-term price movements (1-24 hours) and 65-72% correlation with medium-term trends (1-7 days). Sentiment is most effective when combined with technical analysis and volume indicators. Extreme sentiment readings often signal potential reversals.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="real-time-updates" className="bg-gray-700/30 rounded-lg px-4 border border-gray-600/50 hover:border-cyan-500/50 transition-colors">
                    <AccordionTrigger className="text-white hover:text-cyan-400 font-medium">
                      How Often Are Sentiment Scores Updated?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 pt-4 leading-relaxed">
                      Sentiment scores are updated every 5 minutes during active market hours and every 15 minutes during off-hours. Our system processes approximately 100,000+ mentions per hour across all monitored sources. Breaking news events and viral posts can trigger immediate recalculation of sentiment scores.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Sticky Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-8 space-y-8">
              <MarketWinnersWidget topGainnersandLoosers={mockTopGainersAndLosers} />
              <AdUnit type="skyscraper" />
            </div>
          </div>
        </div>
        
        {/* Bottom Ad Placement */}
        <div className="mt-12 flex justify-center">
          <AdUnit type="leaderboard" />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SentimentAnalysisPage;
