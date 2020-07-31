import { Node, NodeEntry, Path, Point, Range } from 'slate';

export interface QueryOptions {
  filter?: (entry: NodeEntry<Node>) => boolean;
  allow?: string[];
  exclude?: string[];
}

export interface EditorAboveOptions {
  at?: Range | Path | Point;
  match?: (node: Node) => boolean;
  mode?: 'highest' | 'lowest';
  voids?: boolean;
}

export interface SoftBreakRule {
  hotkey: string;
  query?: QueryOptions;
}

export interface SoftBreakOnKeyDownOptions {
  rules?: SoftBreakRule[];
}

export interface SoftBreakPluginOptions extends SoftBreakOnKeyDownOptions {}
