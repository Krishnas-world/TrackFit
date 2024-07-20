import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import Register from './_components/Register';

export default async function Dashboard() {
  const { isAuthenticated } = getKindeServerSession();
  const session = await getKindeServerSession();
  const user = session.isAuthenticated ? await session.getUser() : null;

  if (!(await isAuthenticated())) {
    redirect("/api/auth/login?post_login_redirect_url=/dashboard");
  }

  return (
    <div>
      <Register user={user} />
    </div>
  );
}
