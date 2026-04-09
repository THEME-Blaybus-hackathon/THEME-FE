export interface ObjectPart {
  id: number;
  name: string;
}

export interface ObjectsByCategoryResponse {
  categoryName: string;
  mainImageUrl: string;
  parts: ObjectPart[];
}
