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

	viewNegotiationDialogVisible: boolean;
	setViewNegotiationDialogVisible: (status: boolean) => void;

	productsAdded: any[];
	addProduct: (product: any) => void;
	removeProduct: (id: string) => void;
	setProducts: (products: any[]) => void;
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

	viewNegotiationDialogVisible: false,
	setViewNegotiationDialogVisible(status) {
		return set({ viewNegotiationDialogVisible: status });
	},

	productsAdded: [],

	setProducts(products: any[]) {
		return set({
			productsAdded: products,
		});
	},

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
