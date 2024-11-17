import { create } from "zustand";

interface UserState {
	userSelected: Record<string, any> | undefined;
	setUserSelected: (user: Record<string, any>) => void;

	createUserDialogVisible: boolean;
	setCreateUserDialogVisible: (status: boolean) => void;

	editUserDialogVisible: boolean;
	setEditUserDialogVisible: (status: boolean) => void;

	deleteUserDialogVisible: boolean;
	setDeleteUserDialogVisible: (status: boolean) => void;
}

export const useUserStore = create<UserState>()((set) => ({
	userSelected: undefined,
	setUserSelected(user) {
		return set({ userSelected: user });
	},

	createUserDialogVisible: false,
	setCreateUserDialogVisible(status) {
		return set({ createUserDialogVisible: status });
	},

	editUserDialogVisible: false,
	setEditUserDialogVisible(status) {
		return set({ editUserDialogVisible: status });
	},

	deleteUserDialogVisible: false,
	setDeleteUserDialogVisible(status) {
		return set({ deleteUserDialogVisible: status });
	},
}));
