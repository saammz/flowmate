import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BarChart3, TrendingUp, Users, Clock, CheckCircle, ArrowLeft, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Analytics = () => {
  const kpis = [
    { title: "Tasks Completed", value: "1,234", change: "+18%", period: "This month", color: "text-green-600" },
    { title: "Team Productivity", value: "87%", change: "+5%", period: "vs last month", color: "text-blue-600" },
    { title: "Avg Resolution Time", value: "2.4h", change: "-12%", period: "Improvement", color: "text-green-600" },
    { title: "Command Usage", value: "4,567", change: "+23%", period: "This month", color: "text-purple-600" }
  ];

  const commandUsage = [
    { command: "@bot tasks", usage: "32%", count: "1,456" },
    { command: "@bot status", usage: "24%", count: "1,098" },
    { command: "@bot create", usage: "18%", count: "821" },
    { command: "@bot assign", usage: "12%", count: "548" },
    { command: "@bot complete", usage: "8%", count: "365" },
    { command: "@bot help", usage: "6%", count: "274" }
  ];

  const projectMetrics = [
    { project: "Mobile App Redesign", completion: 85, tasks: 24, overdue: 2 },
    { project: "API Integration", completion: 92, tasks: 18, overdue: 0 },
    { project: "Database Migration", completion: 45, tasks: 31, overdue: 5 },
    { project: "UI Component Library", completion: 78, tasks: 15, overdue: 1 }
  ];

  const teamActivity = [
    { member: "Sarah Chen", tasks: 28, completion: 96, trend: "up" },
    { member: "Mike Rodriguez", tasks: 24, completion: 89, trend: "up" },
    { member: "Emily Park", tasks: 31, completion: 87, trend: "stable" },
    { member: "David Kim", tasks: 19, completion: 91, trend: "up" },
    { member: "Lisa Wang", tasks: 22, completion: 83, trend: "down" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="flex items-center space-x-2">
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Dashboard</span>
              </Link>
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-6 w-6" />
                <h1 className="text-2xl font-bold">Analytics</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Last 30 days
              </Button>
              <Button variant="outline" size="sm">Export Report</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {kpi.title}
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <div className="flex items-center mt-1">
                  <span className={`text-sm font-medium ${kpi.color}`}>
                    {kpi.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">{kpi.period}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Command Usage */}
          <Card>
            <CardHeader>
              <CardTitle>Most Used Commands</CardTitle>
              <CardDescription>Bot command usage breakdown for this month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {commandUsage.map((cmd, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium font-mono bg-gray-100 px-2 py-1 rounded">
                      {cmd.command}
                    </span>
                    <div className="text-right">
                      <span className="text-sm font-medium">{cmd.usage}</span>
                      <span className="text-xs text-gray-500 ml-1">({cmd.count})</span>
                    </div>
                  </div>
                  <Progress value={parseInt(cmd.usage)} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Project Completion */}
          <Card>
            <CardHeader>
              <CardTitle>Project Progress</CardTitle>
              <CardDescription>Current status of active projects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {projectMetrics.map((project, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{project.project}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{project.tasks} tasks</span>
                      {project.overdue > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {project.overdue} overdue
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Progress value={project.completion} className="flex-1 h-2" />
                    <span className="text-sm font-medium text-gray-600">
                      {project.completion}%
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Team Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
            <CardDescription>Individual team member productivity and task completion rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamActivity.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-green-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-blue-700">
                        {member.member.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{member.member}</p>
                      <p className="text-sm text-gray-500">{member.tasks} tasks this month</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{member.completion}% completion</p>
                      <div className="flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full ${
                          member.trend === 'up' ? 'bg-green-500' : 
                          member.trend === 'down' ? 'bg-red-500' : 'bg-gray-400'
                        }`} />
                        <span className="text-xs text-gray-500 capitalize">{member.trend}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Usage Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Usage Trends</CardTitle>
            <CardDescription>Weekly activity patterns and peak usage times</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 mb-6">
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-2">Mon</div>
                <div className="h-20 bg-blue-200 rounded flex items-end justify-center">
                  <div className="w-4 bg-blue-600 rounded-t" style={{height: '60%'}}></div>
                </div>
                <div className="text-xs text-gray-600 mt-1">245</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-2">Tue</div>
                <div className="h-20 bg-blue-200 rounded flex items-end justify-center">
                  <div className="w-4 bg-blue-600 rounded-t" style={{height: '80%'}}></div>
                </div>
                <div className="text-xs text-gray-600 mt-1">312</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-2">Wed</div>
                <div className="h-20 bg-blue-200 rounded flex items-end justify-center">
                  <div className="w-4 bg-blue-600 rounded-t" style={{height: '90%'}}></div>
                </div>
                <div className="text-xs text-gray-600 mt-1">356</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-2">Thu</div>
                <div className="h-20 bg-blue-200 rounded flex items-end justify-center">
                  <div className="w-4 bg-blue-600 rounded-t" style={{height: '75%'}}></div>
                </div>
                <div className="text-xs text-gray-600 mt-1">298</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-2">Fri</div>
                <div className="h-20 bg-blue-200 rounded flex items-end justify-center">
                  <div className="w-4 bg-blue-600 rounded-t" style={{height: '70%'}}></div>
                </div>
                <div className="text-xs text-gray-600 mt-1">278</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-2">Sat</div>
                <div className="h-20 bg-blue-200 rounded flex items-end justify-center">
                  <div className="w-4 bg-blue-600 rounded-t" style={{height: '25%'}}></div>
                </div>
                <div className="text-xs text-gray-600 mt-1">89</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-2">Sun</div>
                <div className="h-20 bg-blue-200 rounded flex items-end justify-center">
                  <div className="w-4 bg-blue-600 rounded-t" style={{height: '15%'}}></div>
                </div>
                <div className="text-xs text-gray-600 mt-1">45</div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">9-11 AM</div>
                <div className="text-sm text-gray-500">Peak Hours</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">2.3s</div>
                <div className="text-sm text-gray-500">Avg Response</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">94%</div>
                <div className="text-sm text-gray-500">Uptime</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
