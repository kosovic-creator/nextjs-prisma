import ClientLayout from "../components/ClientLayout";


export default function PostsLayout({ children }: { children: React.ReactNode }) {
  // Set the desired language, e.g., "en"
  const lang = "en";
  return <ClientLayout lang={lang}>{children}</ClientLayout>;
}