import AiPageContent from "@/components/ai/AiPageContent";

type AiPageProps = {
  searchParams?: Promise<{
    q?: string | string[];
  }>;
};

export default async function AiPage({ searchParams }: AiPageProps) {
  const resolvedSearchParams = await searchParams;
  const rawQuestion = resolvedSearchParams?.q;
  const initialQuestion = Array.isArray(rawQuestion)
    ? rawQuestion[0]?.trim() ?? ""
    : rawQuestion?.trim() ?? "";

  return <AiPageContent initialQuestion={initialQuestion} />;
}
