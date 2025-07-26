import React from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from '@/context/AuthContext';

interface PublicRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const PublicRouteSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Skeleton */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2">
            <Skeleton className="w-10 h-10 rounded-lg" />
            <Skeleton className="w-32 h-8" />
          </div>
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <Skeleton className="w-48 h-8 mx-auto mb-2" />
              <Skeleton className="w-64 h-5 mx-auto" />
            </div>

            <div className="space-y-4">
              {/* Social buttons skeleton */}
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
              </div>

              {/* Separator */}
              <div className="relative">
                <Skeleton className="w-full h-px" />
                <div className="absolute inset-0 flex justify-center">
                  <Skeleton className="w-32 h-4 bg-white" />
                </div>
              </div>

              {/* Form fields skeleton */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="w-16 h-4" />
                  <Skeleton className="w-full h-10" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="w-20 h-4" />
                  <Skeleton className="w-full h-10" />
                </div>
                <Skeleton className="w-full h-10" />
              </div>

              {/* Footer links */}
              <div className="text-center space-y-2">
                <Skeleton className="w-40 h-4 mx-auto" />
                <Skeleton className="w-48 h-4 mx-auto" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const PublicRoute: React.FC<PublicRouteProps> = ({
  children,
  redirectTo = "/dashboard"
}) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <PublicRouteSkeleton />;
  }

  // If user is authenticated, redirect to dashboard
  if (currentUser) {
    return <Navigate to={redirectTo} replace />;
  }

  // If user is not authenticated, show the public route
  return <>{children}</>;
};

export default PublicRoute;