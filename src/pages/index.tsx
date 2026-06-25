import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className="hero hero--primary" style={{textAlign: 'center', padding: '6rem 0'}}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div style={{marginTop: '2rem'}}>
          <a
            className="button button--secondary button--lg"
            href="/docs/intro"
            style={{marginRight: '1rem'}}>
            Get Started
          </a>
          <a
            className="button button--secondary button--lg"
            href="https://github.com/qutaha/noor">
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}

function Feature({title, description}: {title: string; description: string}) {
  return (
    <div className="col col--4" style={{marginTop: '2rem'}}>
      <div className="card" style={{height: '100%'}}>
        <div className="card__body">
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    title: 'Single File',
    description: 'Everything lives in noor.php — no Composer, no vendor/ directory, no CLI tools. Drop it on any shared host and go.',
  },
  {
    title: 'PHP 7.4+',
    description: 'Runs on standard cPanel/Plesk shared hosting with zero configuration. No exotic extensions required.',
  },
  {
    title: 'Familiar Syntax',
    description: 'Inspired by Laravel. Routing, templating, ORM, auth, and validation patterns you already know.',
  },
  {
    title: 'Template Engine',
    description: 'Blade-style directives: @if, @foreach, @extends, @section, @yield. Layouts with section inheritance.',
  },
  {
    title: 'Query Builder',
    description: 'Thin PDO wrapper with fluent chaining. Supports MySQL, SQLite, and PostgreSQL. No ORM overhead.',
  },
  {
    title: 'Batteries Included',
    description: 'Sessions, auth (bcrypt), CSRF protection, validation, file uploads, .env parsing, error handling — all built in.',
  },
];

export default function Home(): ReactNode {
  return (
    <Layout description="Noor — a single-file PHP framework optimized for shared hosting">
      <HomepageHeader />
      <main>
        <div className="container" style={{padding: '2rem 0 4rem'}}>
          <div className="row">
            {features.map((f, idx) => (
              <Feature key={idx} title={f.title} description={f.description} />
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
