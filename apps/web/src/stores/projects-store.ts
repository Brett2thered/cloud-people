import { create } from 'zustand';

export interface Project {
    id: string;
    name: string;
    categoryId: string;
    lastUpdated: string;
}

interface ProjectsState {
    projects: Project[];
    loading: boolean;
    error: Error | null;
    fetchProjects: () => Promise<void>;
}

export const useProjectsStore = create<ProjectsState>((set) => ({
    projects: [],
    loading: false,
    error: null,
    fetchProjects: async () => {
        set({ loading: true });
        try {
            // TODO: Replace with actual API call
            const mockProjects: Project[] = [
                {
                    id: '1',
                    name: 'Project A',
                    categoryId: 'recent',
                    lastUpdated: '2h ago'
                },
                {
                    id: '2',
                    name: 'Project B',
                    categoryId: 'recent',
                    lastUpdated: '5h ago'
                },
                {
                    id: '3',
                    name: 'Project C',
                    categoryId: 'top',
                    lastUpdated: '1d ago'
                }
            ];
            set({ projects: mockProjects });
        } catch (error) {
            console.error('Error fetching projects:', error);
            set({ error: error instanceof Error ? error : new Error('Failed to fetch projects') });
        } finally {
            set({ loading: false });
        }
    }
}));
