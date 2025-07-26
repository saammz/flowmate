import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BarChart3, Users, Clock, CheckCircle, Settings, Plus, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [user] = useState({
    name: "Sarah Chen",
    email: "sarah@techflow.com",
    avatar: "",
    plan: "Pro"
  });

  const integrations = [
    { name: "Jira", status: "connected", icon: "🟦", lastSync: "2 minutes ago" },
    { name: "ClickUp", status: "connected", icon: "🟣", lastSync: "5 minutes ago" },
    { name: "Monday.com", status: "disconnected", icon: "🟠", lastSync: "Never" }
  ];

  const stats = [
    { title: "Tasks Completed", value: "234", change: "+12%", icon: <CheckCircle className="h-4 w-4" /> },
    { title: "Commands Used", value: "1,420", change: "+23%", icon: <BarChart3 className="h-4 w-4" /> },
    { title: "Team Members", value: "12", change: "+2", icon: <Users className="h-4 w-4" /> },
    { title: "Avg Response Time", value: "2.3s", change: "-0.5s", icon: <Clock className="h-4 w-4" /> }
  ];

  const recentActivity = [
    { user: "Mike Rodriguez", action: "completed task", task: "Fix login bug", time: "2 minutes ago" },
    { user: "Emily Park", action: "created task", task: "Update API documentation", time: "15 minutes ago" },
    { user: "David Kim", action: "commented on", task: "Mobile app redesign", time: "1 hour ago" },
    { user: "Lisa Wang", action: "moved task", task: "Database optimization", time: "2 hours ago" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">PB</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  ProjectBot
                </span>
              </Link>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {user.plan} Plan
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Integration
              </Button>
              <Link to="/settings">
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </Link>
              <Avatar>
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name.split(' ')[0]}! 👋</h1>
          <p className="text-gray-600">Here's what's happening with your team today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className="text-gray-400">
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Integrations Status */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>Manage your connected project management tools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {integrations.map((integration, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{integration.icon}</span>
                    <div>
                      <p className="font-medium">{integration.name}</p>
                      <p className="text-sm text-gray-500">Last sync: {integration.lastSync}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={integration.status === 'connected' ? 'default' : 'secondary'}
                    className={integration.status === 'connected' ? 'bg-green-100 text-green-800' : ''}
                  >
                    {integration.status}
                  </Badge>
                </div>
              ))}
              <Button className="w-full" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Integration
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Team Activity</CardTitle>
              <CardDescription>Latest updates from your WhatsApp groups</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs bg-blue-100 text-blue-800">
                        {activity.user.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span>{' '}
                        <span className="text-gray-600">{activity.action}</span>{' '}
                        <span className="font-medium">"{activity.task}"</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Usage Chart */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Monthly Usage</CardTitle>
            <CardDescription>Commands executed and tasks managed over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Commands This Month</span>
                <span className="text-sm text-gray-500">1,420 / 2,000 limit</span>
              </div>
              <Progress value={71} className="h-2" />
              
              <div className="flex justify-between items-center pt-4">
                <span className="text-sm font-medium">Team Members</span>
                <span className="text-sm text-gray-500">12 / 25 limit</span>
              </div>
              <Progress value={48} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Quick Setup Guide */}
        <Card className="mt-6 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-900">🚀 Quick Setup Guide</CardTitle>
            <CardDescription className="text-blue-700">
              Get your team up and running with ProjectBot in minutes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm text-blue-900">Create your ProjectBot account</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm text-blue-900">Connect your first integration (Jira, ClickUp, or Monday.com)</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
                3
              </div>
              <span className="text-sm">Add ProjectBot to your WhatsApp group</span>
              <Button size="sm" variant="outline">
                Get Instructions
              </Button>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
                4
              </div>
              <span className="text-sm">Invite your team members</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
