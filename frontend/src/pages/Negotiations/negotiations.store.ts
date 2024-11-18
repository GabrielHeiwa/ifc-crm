import { create } from "zustand";

interface NegotiationsState {
	negotiationSelected: Record<string, any> | undefined;
	setNegotiationSelected: (product: Record<string, any>) => void;

	createNegotiationDialogVisible: boolean;
	setCreateNegotiationDialogVisible: (status: boolean) => void;

	editNegotiationDialogVisible: boolean;
	setEditNegotiationDialogVisible: (status: boolean) => void;

	deleteNegotiationDialogVisible: boolean;
	setDeleteNegotiationDialogVisible: (status: boolean) => void;

	productsAdded: any[];
	addProduct: (product: any) => void;
	removeProduct: (id: string) => void;
}

export const useNegotiationStore = create<NegotiationsState>()((set) => ({
	negotiationSelected: undefined,
	setNegotiationSelected(product) {
		return set({ negotiationSelected: product });
	},

	createNegotiationDialogVisible: false,
	setCreateNegotiationDialogVisible(status) {
		return set({ createNegotiationDialogVisible: status });
	},

	editNegotiationDialogVisible: false,
	setEditNegotiationDialogVisible(status) {
		return set({ editNegotiationDialogVisible: status });
	},

	deleteNegotiationDialogVisible: false,
	setDeleteNegotiationDialogVisible(status) {
		return set({ deleteNegotiationDialogVisible: status });
	},

	productsAdded: [
		{
			id: "1",
			name: "mesa gamer",
			price: 150,
		},
		{
			id: "2",
			name: 'Monitor 27"',
			price: 800,
		},
	],

	addProduct(product: any) {
		return set((state) => ({
			productsAdded: [...state.productsAdded, product],
		}));
	},

	removeProduct(id: string) {
		return set((state) => ({
			productsAdded: state.productsAdded.filter(
				(product) => product.id !== id
			),
		}));
	},
}));
