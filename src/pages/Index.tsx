import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Users, Clock, BarChart3, Zap, Globe, MessageSquare, Target, TrendingUp, Shield, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Index = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const pricing = {
    symbol: '$',
    free: 0,
    pro: 19,
    enterprise: 99,
  };

  const formatPrice = (amount: number) => {
    if (amount === 0) return '0';
    return amount.toLocaleString();
  };

  const getPrice = (monthlyPrice: number) => {
    if (monthlyPrice === 0) return 0;
    if (billingPeriod === 'yearly') {
      // 15% discount for yearly billing
      return Math.round(monthlyPrice * 12 * 0.85);
    }
    return monthlyPrice;
  };

  const getPriceDisplay = (monthlyPrice: number) => {
    const price = getPrice(monthlyPrice);
    const formattedPrice = formatPrice(price);
    
    if (billingPeriod === 'yearly') {
      return `$${formattedPrice}/year`;
    }
    return `$${formattedPrice}/month`;
  };

  const features = [
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "WhatsApp Native",
      description: "Works seamlessly in your existing WhatsApp groups - no new apps to learn or download",
      gradient: "from-green-400 to-emerald-500"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Universal Integration", 
      description: "Currently supports Jira and Trello. ClickUp, Asana, and Monday.com coming soon!",
      gradient: "from-blue-400 to-cyan-500"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Instant Updates",
      description: "Get real-time notifications on project progress, deadlines, and team activities",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Smart Analytics",
      description: "Track team performance, project health, and productivity insights in one dashboard",
      gradient: "from-orange-400 to-red-500"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Zero Learning Curve",
      description: "Simple @bot commands that anyone can master in minutes - no training sessions needed",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Enterprise Ready",
      description: "Bank-level security with SOC2 compliance and advanced permission controls",
      gradient: "from-indigo-400 to-purple-500"
    }
  ];

  const useCases = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Sales Teams",
      description: "Manage deals, update CRM, and coordinate follow-ups without leaving your team chat. Keep conversations flowing while staying on top of every opportunity.",
      color: "from-green-500 to-emerald-600",
      accentColor: "green",
      teamName: "Sales Team",
      example: {
        user: "Sarah",
        command: "@bot deal update TechCorp",
        response: "✅ Deal updated in Salesforce\n💰 Value: $45,000 → $52,000\n📅 Close date moved to Mar 15\n🎯 Probability: 75%"
      }
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Marketing Teams",
      description: "Coordinate campaigns, track content calendars, and launch initiatives seamlessly. Stay creative while keeping projects organized.",
      color: "from-purple-500 to-pink-600",
      accentColor: "purple",
      teamName: "Marketing Team",
      example: {
        user: "Mike",
        command: "@bot campaign status Q1Launch",
        response: "🚀 Q1 Launch Campaign Status:\n✅ Email sequence: Ready\n🟡 Social assets: In review\n📊 Landing page: 85% complete"
      }
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Product Teams",
      description: "Sync roadmaps, track feature requests, and coordinate releases effortlessly. Build better products with better communication.",
      color: "from-blue-500 to-cyan-600",
      accentColor: "blue",
      teamName: "Product Team",
      example: {
        user: "Alex",
        command: "@bot feature status user-auth",
        response: "🔧 User Authentication Feature:\n✅ Backend API: Complete\n⚡ Frontend UI: 90% done\n🧪 Testing: In progress\n📅 Release: On track for Mar 20"
      }
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Leadership",
      description: "Get real-time insights, team performance metrics, and project health updates instantly. Make informed decisions faster.",
      color: "from-orange-500 to-red-600",
      accentColor: "orange",
      teamName: "Leadership Team",
      example: {
        user: "David",
        command: "@bot team overview",
        response: "📊 Team Performance Summary:\n🎯 Projects on track: 12/15\n⚡ Team velocity: +15% this sprint\n🚨 Attention needed: Design review backlog"
      }
    }
  ];

  const testimonials = [
    {
      quote: "Our sales team closed 30% more deals since using ProjectBot. No more switching between Slack, Salesforce, and WhatsApp.",
      author: "Sarah Chen",
      role: "VP of Sales",
      company: "TechFlow",
      avatar: "SC"
    },
    {
      quote: "Project delivery time dropped by 40% and our team actually enjoys project management now. It's that simple.",
      author: "Marcus Rodriguez",
      role: "Product Manager",
      company: "InnovateCorp",
      avatar: "MR"
    },
    {
      quote: "Finally, our remote marketing team stays in sync. Campaign launches have never been smoother.",
      author: "Emily Park",
      role: "Marketing Director",
      company: "BrandWorks",
      avatar: "EP"
    }
  ];

  const companyLogos = [
    { name: "TechFlow", initial: "TF" },
    { name: "InnovateCorp", initial: "IC" },
    { name: "BrandWorks", initial: "BW" },
    { name: "SalesForce", initial: "SF" },
    { name: "ProductCo", initial: "PC" },
    { name: "MarketPro", initial: "MP" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-green-50/30 overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-green-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-lg">PB</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              ProjectBot
            </span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 hover:scale-105 transform">Features</a>
            <a href="#teams" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 hover:scale-105 transform">For Teams</a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 hover:scale-105 transform">Pricing</a>
            <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 hover:scale-105 transform">Reviews</a>
          </nav>
          <div className="flex space-x-3">
            <Link to="/login">
              <Button variant="outline" size="sm" className="hover:scale-105 transition-transform duration-200">Login</Button>
            </Link>
            <Link to="/dashboard">
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-24 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="animate-fade-in">
            <Badge className="mb-6 px-4 py-2 bg-gradient-to-r from-blue-100 to-green-100 text-blue-700 border-0 hover:scale-105 transition-transform duration-200">
              ✨ Trusted by 10,000+ teams worldwide
            </Badge>
            <h1 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-blue-700 to-green-600 bg-clip-text text-transparent leading-tight">
              Project Management
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>
            <p className="text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform any WhatsApp group into a powerful project management hub. 
              Currently supports Jira and Trello, with Slack support coming soon!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in delay-200">
            <Link to="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-xl px-10 py-4 rounded-xl hover:scale-105 transition-all duration-200 shadow-2xl hover:shadow-blue-200">
                Start Free Trial
                <span className="ml-2">→</span>
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-xl px-10 py-4 rounded-xl hover:scale-105 transition-all duration-200 border-2 hover:border-blue-300 hover:bg-blue-50">
              Watch Demo
              <span className="ml-2">▶</span>
            </Button>
          </div>
          
          {/* Demo Preview */}
          <div className="relative animate-fade-in delay-400">
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-3xl mx-auto border border-gray-100 hover:shadow-3xl transition-shadow duration-300">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-green-400/10 rounded-full blur-2xl"></div>
                <div className="relative">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold">📱</span>
                    </div>
                    <div>
                      <p className="font-bold text-lg">Marketing Team</p>
                      <p className="text-sm text-gray-500">5 members • Always active</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-blue-500 text-white rounded-2xl p-4 max-w-md animate-slide-in-right">
                      <p className="font-medium">Sarah: @bot campaign status</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-md border-l-4 border-blue-500 animate-slide-in-right delay-100">
                      <p className="font-semibold text-gray-800 mb-2">🚀 <strong>Campaign "Summer Sale" Status:</strong></p>
                      <p className="text-sm text-gray-600">• Email templates: ✅ Ready</p>
                      <p className="text-sm text-gray-600">• Social media posts: 🟡 In review</p>
                      <p className="text-sm text-gray-600">• Landing page: ✅ Live</p>
                      <p className="text-sm text-green-600 font-medium mt-2">Launch ready: 80% complete</p>
                    </div>
                    <div className="bg-green-500 text-white rounded-2xl p-4 max-w-md animate-slide-in-right delay-200">
                      <p className="font-medium">Mike: @bot approve social posts</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-md border-l-4 border-green-500 animate-slide-in-right delay-300">
                      <p className="font-semibold text-gray-800">✅ Social posts approved! Campaign is 100% ready to launch! 🎉</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Logos */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 mb-8 font-medium">Trusted by teams at these companies</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {companyLogos.map((company, index) => (
              <div key={index} className="flex items-center space-x-2 hover:opacity-100 transition-opacity duration-200">
                <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{company.initial}</span>
                </div>
                <span className="font-semibold text-gray-600">{company.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built for Every Team Section - New Clean Design */}
      <section id="teams" className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent">
              Built for Every Team
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Manage and track your team's progress without leaving your main chat conversation. 
              From WhatsApp (and soon Slack) to project tools - seamlessly.
            </p>
          </div>

          <div className="grid gap-8 md:gap-12 max-w-6xl mx-auto">
            {useCases.map((useCase, index) => (
              <div key={index} className={`relative ${index % 2 === 1 ? 'md:flex-row-reverse' : ''} flex flex-col md:flex-row items-center gap-8 md:gap-12`}>
                {/* Team Info & Description */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start mb-6">
                    <div className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r ${useCase.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <div className="text-white">
                        {useCase.icon}
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900">{useCase.title}</h3>
                      <p className="text-sm md:text-base text-gray-500">{useCase.teamName}</p>
                    </div>
                  </div>
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6 max-w-md mx-auto md:mx-0">
                    {useCase.description}
                  </p>
                  <div className="flex items-center justify-center md:justify-start space-x-2 text-blue-600 font-medium hover:text-green-600 transition-colors duration-300 cursor-pointer">
                    <span className="text-sm md:text-base">See how it works</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>

                {/* WhatsApp Chat Mockup */}
                <div className="flex-1 w-full max-w-md mx-auto">
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-4 md:p-6 shadow-2xl">
                    {/* WhatsApp Header */}
                    <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-gray-700">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-lg">📱</span>
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">{useCase.teamName}</p>
                        <p className="text-gray-400 text-xs">online</p>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="space-y-3">
                      {/* User Message */}
                      <div className="flex justify-end">
                        <div className="bg-green-600 text-white rounded-2xl rounded-tr-md px-4 py-2 max-w-xs">
                          <p className="text-xs font-medium mb-1">{useCase.example.user}</p>
                          <p className="text-sm">{useCase.example.command}</p>
                        </div>
                      </div>

                      {/* Bot Response */}
                      <div className="flex justify-start">
                        <div className="bg-gray-700 text-white rounded-2xl rounded-tl-md px-4 py-3 max-w-xs">
                          <p className="text-xs font-medium mb-2 text-blue-400">ProjectBot</p>
                          <div className="text-sm whitespace-pre-line">
                            {useCase.example.response}
                          </div>
                        </div>
                      </div>

                      {/* Status indicator */}
                      <div className="flex justify-center">
                        <div className="bg-gray-800 text-gray-300 rounded-full px-3 py-1 text-xs flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span>Updated in real-time</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Redesigned with Modern Cards */}
      <section id="features" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-green-50/30"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-green-700 bg-clip-text text-transparent">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to make project management effortless for teams of all sizes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-green-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                  <div className="flex flex-col h-full">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg relative`}>
                      <div className="text-white relative z-10">
                        {feature.icon}
                      </div>
                      <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-4 group-hover:text-blue-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed flex-grow">
                      {feature.description}
                    </p>
                    
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-2 text-sm text-gray-400 group-hover:text-blue-500 transition-colors duration-300">
                        <Sparkles className="h-4 w-4" />
                        <span>Ready to use</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gradient-to-br from-gray-50 to-green-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-green-700 bg-clip-text text-transparent">
              Simple, Fair Pricing
            </h2>
            <p className="text-xl text-gray-600 mb-8">Choose the perfect plan for your team's needs</p>
            
            {/* Billing Period Toggle */}
            <div className="flex justify-center mb-6">
              <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
                <div className="flex space-x-1">
                  <button
                    onClick={() => setBillingPeriod('monthly')}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                      billingPeriod === 'monthly'
                        ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingPeriod('yearly')}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 relative ${
                      billingPeriod === 'yearly'
                        ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    Yearly
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      Save 15%
                    </span>
                  </button>
                </div>
              </div>
            </div>
            
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <Card className="border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Free</CardTitle>
                <div className="text-4xl font-bold py-6 bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
                  ${formatPrice(pricing.free)}
                </div>
                <CardDescription className="text-base">Perfect for small teams getting started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>1 Integration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Up to 5 team members</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Basic commands & notifications</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Community support</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full hover:scale-105 transition-transform duration-200" variant="outline">
                  Get Started Free
                </Button>
              </CardFooter>
            </Card>

            {/* Pro Plan */}
            <Card className="border-2 border-blue-500 relative hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-blue-50/50 to-white">
              <Badge className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-1 shadow-lg">
                Most Popular
              </Badge>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Pro</CardTitle>
                <div className="py-6">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    {getPriceDisplay(pricing.pro)}
                  </div>
                  {billingPeriod === 'yearly' && (
                    <div className="text-sm text-gray-500 mt-2">
                      ${formatPrice(pricing.pro)}/month billed yearly
                    </div>
                  )}
                </div>
                <CardDescription className="text-base">For growing teams that need more power</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>3 Integrations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Up to 25 team members</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Advanced analytics & reporting</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Priority support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Custom commands & workflows</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 hover:scale-105 transition-all duration-200 shadow-lg">
                  Start Pro Trial
                </Button>
              </CardFooter>
            </Card>

            {/* Enterprise Plan */}
            <Card className="border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Enterprise</CardTitle>
                <div className="py-6">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
                    {getPriceDisplay(pricing.enterprise)}
                  </div>
                  {billingPeriod === 'yearly' && (
                    <div className="text-sm text-gray-500 mt-2">
                      ${formatPrice(pricing.enterprise)}/month billed yearly
                    </div>
                  )}
                </div>
                <CardDescription className="text-base">For large organizations with complex needs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Unlimited integrations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Unlimited team members</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Advanced security & compliance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Dedicated customer success</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Custom integrations & API</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full hover:scale-105 transition-transform duration-200" variant="outline">
                  Contact Sales
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent">
              Loved by Teams Worldwide
            </h2>
            <p className="text-xl text-gray-600">See what other teams are saying about ProjectBot</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8">
                  <p className="text-gray-600 mb-8 italic text-lg leading-relaxed">"{testimonial.quote}"</p>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{testimonial.avatar}</span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{testimonial.author}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <p className="text-sm font-medium text-blue-600">{testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Redesigned with Unique Layout */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-green-900"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.3),transparent_50%)]"></div>
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Transforming Teams Worldwide
            </h2>
            <p className="text-blue-200 text-lg">Real impact, measurable results</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: "Teams Using ProjectBot", icon: "👥", color: "from-blue-400 to-cyan-400" },
              { number: "500K+", label: "Tasks Managed Daily", icon: "✅", color: "from-green-400 to-emerald-400" },
              { number: "40%", label: "Average Productivity Boost", icon: "📈", color: "from-purple-400 to-pink-400" },
              { number: "24/7", label: "Always Available", icon: "⚡", color: "from-orange-400 to-red-400" }
            ].map((stat, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-white/5 rounded-2xl backdrop-blur-sm"></div>
                <div className="relative p-8 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <span className="text-2xl">{stat.icon}</span>
                  </div>
                  <div className="text-5xl font-bold text-white mb-2 group-hover:scale-105 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-blue-200 leading-tight">
                    {stat.label}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent">
              Ready to Transform Your Team's Workflow?
            </h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Join thousands of teams who've streamlined their project management with ProjectBot. 
              Start your free trial today and see the difference in minutes, not months.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-xl px-12 py-4 rounded-xl hover:scale-105 transition-all duration-200 shadow-2xl hover:shadow-blue-200">
                  Start Your Free Trial Today
                  <span className="ml-2">→</span>
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-xl px-12 py-4 rounded-xl hover:scale-105 transition-all duration-200 border-2">
                Schedule a Demo
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-8">No credit card required • Setup in under 2 minutes • Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">PB</span>
                </div>
                <span className="text-2xl font-bold">ProjectBot</span>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                Transform any WhatsApp group into a powerful project management hub. 
                Supports Jira & Trello, with Slack & more integrations coming soon.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="text-sm">TW</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="text-sm">LI</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="text-sm">GH</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">Product</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">Support</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">System Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ProjectBot. All rights reserved. Made with ❤️ for teams everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
