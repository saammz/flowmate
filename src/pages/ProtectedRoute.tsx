import React from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Skeleton className="w-8 h-8 rounded-lg" />
              <Skeleton className="w-32 h-6" />
              <Skeleton className="w-16 h-6" />
            </div>
            <div className="flex items-center space-x-4">
              <Skeleton className="w-24 h-8" />
              <Skeleton className="w-8 h-8" />
              <Skeleton className="w-8 h-8 rounded-full" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Welcome Section Skeleton */}
        <div className="mb-8">
          <Skeleton className="w-80 h-8 mb-2" />
          <Skeleton className="w-96 h-5" />
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                  <Skeleton className="w-24 h-4" />
                  <Skeleton className="w-4 h-4" />
                </div>
                <Skeleton className="w-16 h-8 mb-2" />
                <Skeleton className="w-32 h-3" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Integrations Skeleton */}
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <Skeleton className="w-24 h-6 mb-2" />
              <Skeleton className="w-48 h-4 mb-4" />
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Skeleton className="w-8 h-8" />
                      <div>
                        <Skeleton className="w-16 h-4 mb-1" />
                        <Skeleton className="w-24 h-3" />
                      </div>
                    </div>
                    <Skeleton className="w-16 h-6" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity Skeleton */}
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <Skeleton className="w-32 h-6 mb-2" />
              <Skeleton className="w-48 h-4 mb-4" />
              <div className="space-y-4">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="w-full h-4 mb-1" />
                      <Skeleton className="w-24 h-3" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;