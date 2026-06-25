import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Noor',
  tagline: 'Single-file PHP framework for shared hosting',
  favicon: 'img/favicon.ico',

  url: 'https://noor-framework.vercel.app',
  baseUrl: '/',

  organizationName: 'qutaha',
  projectName: 'noor',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/qutaha/noor/tree/main/docs/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/qutaha/noor/tree/main/docs/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/noor-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Noor',
      logo: {
        alt: 'Noor Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/qutaha/noor',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Getting Started', to: '/docs/intro'},
            {label: 'Routing', to: '/docs/routing'},
            {label: 'Database', to: '/docs/database'},
          ],
        },
        {
          title: 'Community',
          items: [
            {label: 'GitHub Issues', href: 'https://github.com/qutaha/noor/issues'},
            {label: 'GitHub Discussions', href: 'https://github.com/qutaha/noor/discussions'},
          ],
        },
        {
          title: 'More',
          items: [
            {label: 'Blog', to: '/blog'},
            {label: 'GitHub', href: 'https://github.com/qutaha/noor'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Noor Contributors. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['php'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
