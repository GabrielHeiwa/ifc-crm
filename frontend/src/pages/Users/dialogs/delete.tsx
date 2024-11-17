import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
} from "@/components/ui/dialog";
import React from "react";
import { useUserStore } from "../users.store";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/api";
import { toast } from "sonner";
import { queryClient } from "@/routes";
import { DialogTitle } from "@radix-ui/react-dialog";

type DeleteUserDialogProps = {};

type Props = React.PropsWithChildren<DeleteUserDialogProps>;

export function DeleteUserDialog({}: Props) {
	// Hooks
	const { userSelected, deleteUserDialogVisible, setDeleteUserDialogVisible } =
		useUserStore();

	// Mutations
	const deleteUser = useMutation({
		mutationKey: ["delete-user"],
		mutationFn: () => api.delete("/users/" + userSelected?.id),
	});

	// Functions
	async function handleDelete() {
		try {
			if (!userSelected)
				return toast.error("Usuário não selecionado para excluir.");

			await deleteUser.mutateAsync();

			await queryClient.invalidateQueries({
				queryKey: ["get-users"],
			});

			toast.success("Usuário excluido com sucesso.");
		} catch (e: any) {
			console.error("Users => Dialog => handleDelete", e);
			toast.error("Houve um erro ao deletar o usuário");
		} finally {
			setDeleteUserDialogVisible(false);
		}
	}

	return (
		<Dialog
			open={deleteUserDialogVisible}
			onOpenChange={setDeleteUserDialogVisible}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Excluir usuário</DialogTitle>
					<DialogDescription>
						Esta ação removerá o usuário permanentemente do sistema.
					</DialogDescription>
				</DialogHeader>

				<DialogFooter>
					<Button variant={"ghost"}>Cancelar</Button>
					<Button
						variant={"destructive"}
						onClick={() => handleDelete()}
					>
						Excluir
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
