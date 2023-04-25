import useSWR from "swr"
import { z } from "zod"
const fetcher = (path: string) => fetch(path).then(res => res.json())

export function useEmails() {
  const { data } = useSWR('/api/emails', fetcher);

  if (!data) {
    return [];
  }

  const emails = z.object({
    emails: z.array(z.string())
  }).parse(data);

  return emails.emails;
}

export function useEmail(slug?: string) {
  const { data } = useSWR(slug ? '/api/email/' + slug : null, fetcher);

  if (!data) {
    return null;
  }

  const email = z.object({
    markup: z.string(),
    plainText: z.string(),
    reactMarkup: z.string(),
  }).parse(data);

  return email
}
