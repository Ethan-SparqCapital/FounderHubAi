export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface BaseBlock {
  id: string;
  position: Position;
  size: Size;
}

export interface TextBlock extends BaseBlock {
  type: 'text';
  content: string;
  isEditable: boolean;
}

export interface VisualBlock {
  type: 'pie' | 'bar' | 'line' | 'scatter' | 'table';
  data: any;
  config?: any;
}

export interface VisualBlockContainer extends BaseBlock {
  type: 'visual';
  visual: VisualBlock;
}

export type SlideBlock = TextBlock | VisualBlockContainer;

export interface Slide {
  title: string;
  content: string;
  design: string;
  blocks: SlideBlock[];
  visuals?: VisualBlock[];
  imageUrl?: string;
  videoUrl?: string;
  theme?: string;
}

// Add a helper type for the editor component
export interface EditorSlide extends Omit<Slide, 'blocks'> {
  blocks?: SlideBlock[];
} 