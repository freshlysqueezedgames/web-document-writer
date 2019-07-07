/// <reference types="react" />
import { DOCUMENT_COMPONENT_TYPE, DocumentComponentDefinition } from './store/types';
export declare function LoadDocument(name: string, document: Array<DocumentComponentDefinition>): void;
export declare function RenderDocument(OnSave: (document: Array<DocumentComponentDefinition>) => Promise<void>, OnImageUpload: (data: string) => Promise<string>): JSX.Element;
export { DOCUMENT_COMPONENT_TYPE };
//# sourceMappingURL=index.d.ts.map