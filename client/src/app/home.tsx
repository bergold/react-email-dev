import { Button, Heading, Text } from "../components";

export function Home() {
  return <div className="max-w-md border border-slate-6 mx-auto mt-56 rounded-md p-8">
    <Heading as="h2" weight="medium">
      Welcome to the React Email preview!
    </Heading>
    <Text as="p" className="mt-2 mb-4">
      To start developing your next email template, you can create a{' '}
      <code>.jsx</code> or <code>.tsx</code> file under the "emails" folder.
    </Text>

    <Button asChild>
      <a rel='noopener noreferrer' target='_blank' href="https://react.email/docs">Check the docs</a>
    </Button>
  </div>
}
