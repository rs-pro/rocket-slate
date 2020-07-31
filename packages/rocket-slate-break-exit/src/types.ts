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

export interface ExitBreakRule {
  hotkey: string;
  defaultType?: string;
  query?: QueryOptions & {
    start?: boolean;
    end?: boolean;
  };
  level?: number;
  before?: boolean;
}

export interface ExitBreakOnKeyDownOptions {
  rules?: ExitBreakRule[];
}

export interface ExitBreakPluginOptions extends ExitBreakOnKeyDownOptions {}
