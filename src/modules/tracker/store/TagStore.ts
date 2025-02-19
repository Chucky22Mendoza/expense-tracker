import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ICreateTag, ITag } from "../domain/Tag";

export interface ITagState {
  tags: ITag[];
  setTag: (tag: ICreateTag) => void;
  removeTag: (id: number) => void;
  updateTag: (tag: ITag) => void;
  setTagsList: (tags: ITag[]) => void;
  resetTags: () => void;
}

export const initTags: ITag[] = [{
  id: 0,
  name: 'Others',
  color: '#333',
}];

export const useTagStore = create(persist<ITagState>((set) => ({
  tags: initTags,
  setTag: (tag: ICreateTag) => set((state) => ({
    ...state,
    tags: [
      ...state.tags,
      {
        ...tag,
        id: state.tags[state.tags.length - 1].id + 1,
      },
    ],
  })),
  removeTag: (id: number) => set((state) => ({
    ...state,
    tags: state.tags.filter((tag) => tag.id !== id),
  })),
  updateTag: (tag: ITag) => set((state) => ({
    ...state,
    tags: state.tags.map((t) => (t.id === tag.id ? tag : t)),
  })),
  setTagsList: (tags: ITag[]) => set((state) => ({
    ...state,
    tags: [...state.tags, ...tags],
  })),
  resetTags: () => set((state) => ({
    ...state,
    tags: initTags,
  })),
}), {
  name: 'tags',
}));
