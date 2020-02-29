import ReactMarkdown from 'react-markdown';
import { createElement } from 'react';

const basicTextStyle = 'text-justify break-word';

// Heading
const basicHeadingStyle = 'text-gray-800 font-bold';
const fontSizes = {
  2: `mt-8 mb-4 text-xl ${basicHeadingStyle} ${basicTextStyle}`,
  3: `mt-4 text-lg ${basicHeadingStyle} ${basicTextStyle}`,
};

function Heading(props) {
  props = {
    ...props,
    className: fontSizes[props.level],
  };
  return createElement('h'.concat(props.level), props, props.children);
}

// Link
function Link({href, children}: { href: string, children: any }) {
  const target = href.startsWith('/') ? null : '_blank';
  return (
    <a href={href}
       target={target}
       rel="noopener noreferrer"
       className={`border-gray-600 border border-t-0 border-l-0 border-r-0 border-solid border-black text-gray-600 ${basicTextStyle}`}>{children}</a>
  );
}

const paragraphTextStyle = `leading-relaxed text-gray-800 ${basicTextStyle}`;
// Paragraph
const Paragraph = ({children}) => {
  return (
    <p className={`my-4 ${paragraphTextStyle}`}>{children}</p>
  );
};

// Image
const Image = (props) => {
  return (
    <img src={props.src} alt={props.alt} {...{loading: 'lazy'}} className="ml-auto mr-auto"/>
  );
};

// Blockquote
const BlockQuote = ({children}) => {
  return (
    <blockquote className="px-4 border-t-2 border-b-2 border-transparent bg-gray-100">
      {children}
    </blockquote>
  );
};

// ListItem
const ListItem = ({children}) => {
  return (
    <li className={`my-1 ml-5 list-disc ${paragraphTextStyle}`}>{children}</li>
  );
};

export default function Markdown({source}) {
  return (
    <ReactMarkdown source={source}
                   renderers={{
                     heading: Heading,
                     link: Link,
                     paragraph: Paragraph,
                     image: Image,
                     blockquote: BlockQuote,
                     listItem: ListItem,
                   }}
    />
  );
}

