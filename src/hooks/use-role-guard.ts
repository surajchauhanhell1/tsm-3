import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Shield } from 'lucide-react';
import React from 'react';

/**
 * useRoleGuard - React hook for role-based route protection.
 * @param requiredRole - string or array of allowed roles (e.g., 'vendor' or ['vendor', 'supplier'])
 * @param userRole - the current user's role
 * @returns null if access is allowed, or an Access Restricted JSX element if not
 */
export default function useRoleGuard(requiredRole: string | string[], userRole: string): React.ReactElement | null {
  const router = useRouter();
  const allowed = Array.isArray(requiredRole)
    ? requiredRole.includes(userRole)
    : userRole === requiredRole;

  useEffect(() => {
    if (!allowed) {
      router.push('/dashboard');
    }
  }, [allowed, router]);

  if (!allowed) {
    return React.createElement('div', { className: 'flex items-center justify-center h-64' },
      React.createElement('div', { className: 'text-center' },
        React.createElement(Shield, { className: 'h-12 w-12 text-muted-foreground mx-auto mb-4' }),
        React.createElement('h3', { className: 'text-lg font-medium mb-2' }, 'Access Restricted'),
        React.createElement('p', { className: 'text-muted-foreground mb-4' }, 'You do not have permission to view this page.'),
        React.createElement('button', {
          className: 'px-4 py-2 bg-primary text-white rounded hover:bg-primary/90',
          onClick: () => router.push('/dashboard')
        }, 'Back to Dashboard')
      )
    );
  }
  return null;
} 