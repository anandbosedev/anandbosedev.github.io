export { default as kebabCase } from 'lodash.kebabcase';

type Language = "bash" | "sh" | "shell" | "css" | "javascript" | "js" | "jsx" | "diff" | "git" | "go" | "graphql" | "handlebars" | "json" | "less" | "markdown" | "mdx" | "python" | "py" | "sass" | "scss" | "tsx" | "typescript" | "ts" | "wasm" | "yaml" | "rust" | "svelte" | "html" | "text" | "java" | "kotlin" | "swift";
type GetLanguageInput = `language-${Language}` | "";
declare const getLanguage: (className?: GetLanguageInput) => Language;
interface IPreProps {
    children: {
        props: {
            children: string;
            className?: GetLanguageInput;
            title?: string;
            highlight?: string;
            withLineNumbers?: boolean;
            [key: string]: any;
        };
    };
}
declare const preToCodeBlock: (preProps: IPreProps) => {
    title?: string;
    highlight?: string;
    withLineNumbers?: boolean;
    codeString: string;
    className: GetLanguageInput;
    language: string;
} | undefined;
declare const calculateLinesToHighlight: (meta: string) => (index: number) => boolean;
declare const mdxResolverPassthrough: (fieldName: string) => (source: any, args: any, context: any, info: any) => Promise<any>;
declare const slugify: (source: {
    slug?: string;
    title: string;
}, basePath: string) => string;

export { type GetLanguageInput, calculateLinesToHighlight, getLanguage, mdxResolverPassthrough, preToCodeBlock, slugify };
