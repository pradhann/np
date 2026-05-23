import Container from '@/components/Container';
import LinkButton from '@/components/LinkButton';

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-32 text-center sm:py-40">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-4 font-display text-display font-medium text-ink">Not found.</h1>
      <p className="mt-5 max-w-md leading-relaxed text-ink-muted">
        The page you&rsquo;re looking for doesn&rsquo;t exist, or it may have moved.
      </p>
      <div className="mt-8">
        <LinkButton href="/">Back home</LinkButton>
      </div>
    </Container>
  );
}
