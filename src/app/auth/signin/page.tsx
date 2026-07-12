import SignInPage from "./signin";


interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ searchParams }: PageProps): Promise<JSX.Element> {
  const params = await searchParams;
  const redirectPath = typeof params.redirect === 'string' ? params.redirect : "/";

  return (
    <SignInPage
      redirectTo={redirectPath}
    />
  );
}