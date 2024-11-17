import { create } from "zustand";

interface ProductState {
	productSelected: Record<string, any> | undefined;
	setProductSelected: (product: Record<string, any>) => void;

	createProductDialogVisible: boolean;
	setCreateProductDialogVisible: (status: boolean) => void;

	editProductDialogVisible: boolean;
	setEditProductDialogVisible: (status: boolean) => void;

	deleteProductDialogVisible: boolean;
	setDeleteProductDialogVisible: (status: boolean) => void;
}

export const useProductsStore = create<ProductState>()((set) => ({
	productSelected: undefined,
	setProductSelected(product) {
		return set({ productSelected: product });
	},

	createProductDialogVisible: false,
	setCreateProductDialogVisible(status) {
		return set({ createProductDialogVisible: status });
	},

	editProductDialogVisible: false,
	setEditProductDialogVisible(status) {
		return set({ editProductDialogVisible: status });
	},

	deleteProductDialogVisible: false,
	setDeleteProductDialogVisible(status) {
		return set({ deleteProductDialogVisible: status });
	},
}));
